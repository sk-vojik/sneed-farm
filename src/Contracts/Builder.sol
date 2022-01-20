// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.7; 

import "./ISeedToken.sol"; 
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

    /**
     * @dev Contract for game handling.
     * Places buildings on map, stakes $ONE tokens and 
     * mints rewards for farmers. Each player has 81 
     * tiles where they can build. Each tile has a timestamp 
     * making each building independent farming unit.  
     */

contract Builder { 

    address immutable public owner; 
    address immutable public treasury;  
    uint8 private treasuryFee = 3;

    uint8 private baseMltpl = 10; 
    uint256 private maxFarmTime = 24 hours; 

    uint8 private birdBaseMltpl = 5; 
    uint8 private birdFancyNum = 72; 
    
    uint8 private sneedMltpl = 110;   
    uint256 private genesisBlock; 

    mapping(uint => Structure) public structures; 

    mapping(address => Player) public players; 

    ISeedToken immutable public SEED; 

    struct Player {
        bool isStaking;
        bool isSneed; 
        uint8 housesCount; 
        uint8[81] map;  
        uint256 staked; 
        mapping(uint8 => uint256) stakingStart; 
        mapping(uint8 => uint256) lockedUntil;  
    }
    
    /**
     * @dev Saves data about structure's price and farming time. 
     */ 
    struct Structure {
        uint256 price; 
        uint256 time;
        uint256 rate; 
    } 
  
    /** 
     * @dev Sets contract address for {ONE} and {SEED} tokens. 
     * 
     * {structures} is initialized with available structures. 
     */

    constructor(ISeedToken _SEED, 
                address _treasury) {
        owner = msg.sender; 

        SEED = _SEED; 
        treasury = _treasury; 

        genesisBlock = block.number; 

        Structure storage house = structures[1]; 
        house.price = 0.1 ether; 
        house.time = 4 hours; 
        house.rate = 1 ether; 
    }

    /**
     * @dev Places a new structure on the map and sets up farming. 
     * 
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Stake} event.
     *
     * Requirements:
     *
     * - value attached must be equal to `_sid' price. 
     * - `_sId` at `_pos` must be different from current value.
     */

    function placeStructure(uint8 _pos, uint8 _sId) external 
        priced(_sId) unique(_pos, _sId) payable returns (bool) {
        
        Player storage currentPlayer = players[msg.sender];  
        if(currentPlayer.isStaking == false) {
            currentPlayer.isStaking = true; 
        }
        currentPlayer.map[_pos] = _sId; 
        currentPlayer.housesCount++; 
        currentPlayer.staked += structures[_sId].price; 
        currentPlayer.stakingStart[_pos] = block.timestamp; 

        emit Stake(msg.sender, msg.value);
        return true; 
    }

     /**
     * @dev Removes a structure from the map, stops farming, returns
     * staked tokens.  
     * 
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits an {Unstake} event.
     *
     * Requirements:
     *
     * - sender must have tokens staked. 
     */

    function removeStructure(uint8 _pos) external 
        staking notEmpty(_pos) returns (bool) {

        Player storage currentPlayer = players[msg.sender];

        uint8 currentStruct = currentPlayer.map[_pos];  
        withdrawTileYield(_pos, currentStruct); 
        currentPlayer.map[_pos] = 0; 
        payable(msg.sender).transfer(structures[currentStruct].price); 

        currentPlayer.housesCount--; 
        currentPlayer.staked -= structures[currentStruct].price; 
        if(currentPlayer.housesCount == 0) {
            currentPlayer.isStaking = false;     
        }

        emit Unstake(msg.sender, structures[currentStruct].price); 
        return true; 
    }

    /**
     * @dev Withdraw yield of {Seed} from the structure. 
     * 
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {YieldWithdraw} event.
     *
     * Requirements:
     *
     * - sender must have tokens staked. 
     */

    function withdrawTileYield(uint8 _pos, uint8 _sId) public 
        staking notEmpty(_pos) returns (bool) {
        
        Player storage currentPlayer = players[msg.sender];

        uint256 reward = pendingYield(_pos, _sId); 
        currentPlayer.stakingStart[_pos] = 0; 
        SEED.mint(msg.sender, reward); 
        SEED.mint(treasury, reward * 3 / 100); 

        emit YieldWithdraw(msg.sender); 
        return true; 
    }

    function pendingYield(uint8 _pos, uint8 _sId) public   
        staking view returns (uint256) {
        
        uint256 timeStaked = calculateYieldTime(
            players[msg.sender].stakingStart[_pos], 
            structures[_sId].time
        ); 
        
        uint256 reward = calculateReward(
            structures[_sId], 
            timeStaked
        ); 
        return reward; 
    }


    /**
     * @dev Returns time while structure was accumulating tokens. 
     */

    function calculateYieldTime(uint256 start, uint256 bound) internal
        view returns (uint256) {
        uint256 yieldTime = block.timestamp - start; 
        return (yieldTime > bound) ? bound : yieldTime; 
    } 
    /**
     * @dev Returns amount of yield from a structure. 
     */

    function calculateReward(uint256 _stkTime, uint256 _rate) internal 
        pure returns (uint256) {
        uint256 reward =  _stkTime * _rate ;
        return reward; 
    }

    function calculateReward(
        Structure memory _struct, 
        uint256 _stkTime 
        ) internal view returns (uint256) {
        uint256 durMltpl = calculateDurationMltpl(_struct.time);
        uint256 birdMltpl = calculateBirdMltpl();  
        uint256 reward =  (_stkTime * _struct.rate); //* (baseMltpl * durMltpl) / birdMltpl;
        return reward; 
    }

    function calculateDurationMltpl(uint256 time) internal 
        view returns (uint256) {
        //return time / maxFarmTime;
        return 1;   
    }
/*
    function calculateBirdMltpl() internal 
        view returns (uint256) {
            uint256 currentBlock = block.number; 
            uint256 birdCoef = (currentBlock - genesisBlock ) / birdFancyNum;
            return birdCoef < birdBaseMltpl ? birdCoef : birdBaseMltpl; 
    }
*/ 
    function calculateBirdMltpl() internal 
        view returns (uint256) {
            return 1; 
        }

    /**
     * @dev Returns player's gamemap. 
     */

    function getMap() external view returns (uint8[81] memory) { 
        return players[msg.sender].map; 
    }

     /**
     * @dev Returns amount of built houses. 
     */

    function getHouses() external view returns (uint256) {
        return players[msg.sender].housesCount; 
    }    

    /**
     * @dev Returns in-game structure.   
     */

    function getStructure(uint _sId) external view returns (Structure memory) {
        return structures[_sId]; 
    }

    /**
     * @dev Returns isStaking mapping. 
     */

    function getIsStaking() external view returns (bool) {
        return players[msg.sender].isStaking; 
    }

    /**
     * @dev Returns amount of staked tokens. 
     */

    function getStaked() external view returns (uint256) {
        return players[msg.sender].staked; 
    }

    /**
     * @dev Returns time when structure was staked. 
     */

    function getStakedTime(uint8 _pos) external view returns (uint256) {
        return players[msg.sender].stakingStart[_pos]; 
    }  

    /**
     * @dev Returns boolean whether building finished accumulating
     * tokens or not.  
     */

     function isReadyForWithdraw(uint8 _pos, uint8 _sId) external 
        notEmpty(_pos) view returns (bool) {
         return (calculateYieldTime(
            players[msg.sender].stakingStart[_pos], 
            structures[_sId].time
            ) == structures[_sId].time); 
     }

    /**
     * @dev Adds new game structure
     *
     */
     function addStructure(uint8 _sId, uint256 price, 
        uint256 rate, uint256 time) external 
        onlyOwner returns (bool) {

        Structure memory newStruct = Structure(price, rate, time); 
        structures[_sId] = newStruct; 

        return true; 
     }

    /**
     * @dev Requires sender to be owner.  
     */

    modifier onlyOwner {
        require(msg.sender == owner, 
        "Can't call owner function"); 
        _; 
    }

    /**
     * @dev Requires price to be in price mapping. 
     */

    modifier priced(uint8 _sId) {
        require(msg.value == structures[_sId].price, 
        "Different value attached");
        _; 
    }

    /**
     * @dev Requires building to differ from placed one. 
     */

    modifier unique(uint8 _pos, uint8 _sId) {
        require(players[msg.sender].map[_pos] != _sId,
        "You have already built this and here"); 
        _; 
    }

    /**
     * @dev Requires price to be in price mapping. 
     */

    modifier staking() {
        require(players[msg.sender].isStaking == true, 
        "You can't withdraw if you didn't stake"); 
        _; 
    }

    modifier notEmpty(uint8 _pos) {
        require(players[msg.sender].map[_pos] != 0, 
        "Tile cannot be empty");
        _; 
    }

    event Stake(address indexed from, uint256 amount); 
    event Unstake(address indexed from, uint256 amount); 
    event YieldWithdraw(address indexed from); 
}
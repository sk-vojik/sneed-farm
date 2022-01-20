// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.7; 
import "./ISeedToken.sol"; 
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SeedToken is ERC20, Ownable, ISeedToken {

    constructor() ERC20("SeedToken", "NEED") {
        _mint(msg.sender, 3000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) external override {
        _mint(to, amount); 
    }

}
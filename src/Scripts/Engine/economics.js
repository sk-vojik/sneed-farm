import { DATA_PROVIDER } from "./game.js";
import { web3, instance } from "../Blockchain/web3.js"; 

export default class Economics {

    priceDict = {}; 

    constructor(){

        this.priceDict[1] = '0.1'; 
        this.listenForEvents(); 
    }

    listenForEvents() { 
        window.addEventListener('sendBuildingPlaced', this.buildingPlaced.bind(this));
        window.addEventListener('sendBuildingDestroyed', this.buildingDestroyed.bind(this)); 
        window.addEventListener('sendCollectYield', this.collectYield.bind(this));
    }
 
    buildingPlaced(e){
        const _pos = e.detail.tile; 
        const _sId = e.detail.building;
        instance.methods.placeStructure(_pos, _sId)
        .send({
            from: window.userAddress, 
            value: web3.utils.toWei(this.priceDict[_sId]),
            gas: '200000'
        }, function(error, result) {
            if(error){
                console.log(error); 
            } 
            else {
                console.log(result);
            }
            this.dispatchFetchDataEvent(); 
        }.bind(this));
    }

    buildingDestroyed(e) {
        const _pos = e.detail.tile; 
      
        instance.methods.removeStructure(_pos)
        .send({
            from: window.userAddress, 
            gas: '200000'
        }, function(error, result) {
            if(error){
                console.log(error); 
            } 
            else {
                console.log(result);
            }
            this.dispatchFetchDataEvent(); 
        }.bind(this)); 
    }

    collectYield(e) {
        const _pos = e.detail.tile; 
        const _sId = e.detail.building; 

        instance.methods.withdrawTileYield(_pos, _sId)
        .send({
            from: window.userAddress, 
            gas: '200000'
        }, function(error, result) {
            if(error){
                console.log(error); 
            } 
            else {
                console.log(result);
            }
            this.dispatchFetchDataEvent(); 
        }.bind(this));
        console.log("collecting yield", _pos); 
    }

    removeStructure(e) {
        const _pos = e.detail.tile; 

        instance.methods.removeStructure(_pos)
        .send({
            from: window.userAddress, 
            gas: '200000'
        }, function(error, result) {
            if(error){
                console.log(error); 
            } 
            else {
                console.log(result);
            }
            this.dispatchFetchDataEvent(); 
        }.bind(this));
        console.log("Removing structure yield", _pos); 
    }

    dispatchFetchDataEvent() {
        var fetch_data = new CustomEvent('fetch_data');
        window.dispatchEvent(fetch_data);
    }
}
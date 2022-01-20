export default class DataProvider {
    
    SetStaked(staked) {
        this._staked = staked; 
        this.dispatchDataProviderChanged(); 
    }

    GetStaked() {
        return this._staked; 
    }

    SetPendingRewards(pending) {
        this._pending = pending; 
        this.dispatchDataProviderChanged(); 
    }

    GetPending() {
        return this._pending; 
    }

    SetBuildingCount(buildingCount) { 
        this._buildingCount = buildingCount; 
        this.dispatchDataProviderChanged(); 
    }

    GetBuildingCount() {
        return this._buildingCount;
    }

    dispatchDataProviderChanged() {
        var onDataProviderChanged = new CustomEvent('onDataProviderChanged');
        window.dispatchEvent(onDataProviderChanged); 
    }
}


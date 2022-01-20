export default class GameMap {
  currentBuilding = 1;

  constructor(canvas) {
    this._canvas = canvas;

    this._mask = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    this.listenForEvents();
  }

  setMaskValue(row, col, val) {
    this._mask[row][col] = val; 
  }

  getMaskValue(row, col) {
    return this._mask[row][col];
  }

  listenForEvents() {
    window.addEventListener('onUpdateMap', this.updateMap.bind(this));
    window.addEventListener('onBuildingState', this.setCurrentBuilding.bind(this));
    //window.addEventListener('revertChanges', this.setMaskValue.bind(this))

    this._canvas.addEventListener('onMapBuild', this.buildStructure.bind(this));
    this._canvas.addEventListener('onMapDestroy', this.destroyStructure.bind(this));
    this._canvas.addEventListener('onCollectYield', this.collectYield.bind(this));
  }

  updateMap(e) {
    const array = e.detail.array;
    let count = 0;
    for (let i = 0; i < 9; ++i) {
      for (let j = 0; j < 9; ++j) {
        this._mask[i][j] = array[count++];
      }
    }
  }

  setCurrentBuilding(e) {
    const building = e.detail.building;
    if (this.currentBuilding != building) {
      this.currentBuilding = building;
    }
  }

  buildStructure(e) {
    const row = e.detail.tileX;
    const col = e.detail.tileY;
    if(this.checkPosition(row, col) == false) return; 
    if (this._mask[row][col] != 0) return;

    this._mask[row][col] = this.currentBuilding;
    const tileId = this.matrixToArray(row, col);
    this.dispatchSendBuildingPlacedEvent(tileId); 
  }

  destroyStructure(e) {
    const row = e.detail.tileX;
    const col = e.detail.tileY;
    if(this.checkPosition(row, col) == false) return; 
    if (this._mask[row][col] == 0) return; 

    const tileId = this.matrixToArray(row, col);
    this.dispatchSendBuildingDestroyedEvent(tileId); 
  }

  collectYield(e) {
    const row = e.detail.tileX;
    const col = e.detail.tileY;
    if(this.checkPosition(row, col) == false) return; 
    if (this._mask[row][col] == 0) return; 

    const tileId = this.matrixToArray(row, col);
    const selectedBuilding = this._mask[row][col]; 
    this.dispatchSendCollectYieldEvent(tileId, selectedBuilding); 
  }

  checkPosition(row, col) { 
    if (row < 0 || row >= 9 || col < 0 || col >= 9) return false;
    return true; 
  }

  matrixToArray(row, col) {
    return row * 9 + col; 
  }

  dispatchSendBuildingPlacedEvent(tileId) {
    var sendBuildingPlaced = new CustomEvent('sendBuildingPlaced', {
      detail: {
        tile: tileId, 
        building: this.currentBuilding
      },
    });
    window.dispatchEvent(sendBuildingPlaced);
  }

  dispatchSendBuildingDestroyedEvent(tileId) {
    var sendBuildingDestroyed = new CustomEvent('sendBuildingDestroyed', {
      detail: {
        tile: tileId, 
      },
    });
    window.dispatchEvent(sendBuildingDestroyed);
  }

  dispatchSendCollectYieldEvent(tileId, selectedBuilding) {
    var sendCollectYield = new CustomEvent('sendCollectYield', {
      detail: {
        tile: tileId, 
        building: selectedBuilding
      },
    });
    window.dispatchEvent(sendCollectYield);
  }
  
}

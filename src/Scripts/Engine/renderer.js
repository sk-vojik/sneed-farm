import { WIDTH, HEIGHT } from "./game.js";
import { CWIDTH, CHEIGHT } from "./game.js";
import { MAP_SIZE } from "./game.js";
export default class Renderer { 

  isCurrentTileEnabled = true; 

  constructor(ctx, map, loader) {
    this._ctx = ctx;
    this._map = map;

    this._loader = loader; 
  }

  init(game) {
    this._game = game; 

    this.gridAtlas = this._loader.getImage("grid");
    this.tileAtlas = this._loader.getImage("tiles");
    this.currentTile = this._loader.getImage("current");
    this.editedTile = this._loader.getImage("edited");

    var simpleTerrain = { x: 0, y: 0 };

    this.terrainIndexes = [
      simpleTerrain
    ];

    this.listenForEvents(); 
  }

  listenForEvents() {
    window.addEventListener('enableCurrentTile', function() {
      this.isCurrentTileEnabled = true; 
    }.bind(this));
    window.addEventListener('disableCurrentTile', function() {
      this.isCurrentTileEnabled = false; 
    }.bind(this));
  }

  render() {
    this._ctx.clearRect(0, 0, CWIDTH, CHEIGHT);
    this.renderGrid();
    this.renderGround();
    this.drawCurrentTile();
  }

  renderGrid() {
    for (var i = 0; i < 20; ++i) {
      for (var j = 0; j < 20; ++j) {
        this.drawTile(this.gridAtlas, 0, 0, i, j, -5, 4);
      }
    }
  }

  drawCurrentTile() {
    if(this.isCurrentTileEnabled == false) return; 
    this.drawTile(
      this.currentTile,
      0,
      0,
      this._game._currentTile.x,
      this._game._currentTile.y,
      0,
      4
    );
  }

  renderGround() {
    for (var cellY = 0; cellY < MAP_SIZE ; ++cellY) {
      for (var cellX = 0; cellX < MAP_SIZE; ++cellX) {
        var currentDraw = this.terrainIndexes[0];
        this.drawTile(
          this.tileAtlas,
          currentDraw.x,
          currentDraw.y,
          cellY,
          cellX,
          0,
          4
        );

        var maskValue = this._map.getMaskValue(cellY, cellX);
        if (maskValue == 1) {
          this.drawTile(
            this.editedTile,
            0,
            0,
            cellY,
            cellX,
            0,
            4
          );
        }
      }
    }
  }

  renderReady() {

  }

  drawTile(image, tilemapX, tilemapY, cellX, cellY, offsetX, offsetY) {
    this._ctx.drawImage(
      image,
      WIDTH * tilemapX, //tilemap index X
      HEIGHT * tilemapY, //tilemap index Y
      WIDTH, //tile width
      HEIGHT, //tile height
      offsetX * WIDTH + (cellX + cellY) * (WIDTH / 2), //screen X
      offsetY * HEIGHT + (cellX - cellY) * (HEIGHT / 2), //screen Y
      WIDTH, //tile width
      HEIGHT //tile height
    );
  }
}

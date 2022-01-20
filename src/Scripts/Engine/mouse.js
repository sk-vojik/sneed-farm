import { STATE } from "./game.js";
import { WIDTH, HEIGHT } from "./game.js";
export default class Mouse {
    
    constructor(canvas){
        this._canvas = canvas; 

        this.x = 0; 
        this.y = 0; 
        this.tileX = 0; 
        this.tileY = 0; 

        this.mouseDeltaX = 0;
        this.mouseDeltaY = 0; 
        this.prevMouseX = 0; 
        this.prevMouseY = 0;  
    }

    init(game){
        this._game = game; 
        this.listenForEvents(); 
    }

    listenForEvents() {
        this._canvas.addEventListener('mousemove', this.getMousePos.bind(this));
        this._canvas.addEventListener('click', this.handleClick.bind(this)); 
    }

    getMousePos(e) { 
        const rect = this._canvas.getBoundingClientRect();
        this.x = e.clientX - rect.left; 
        this.y = e.clientY - rect.top; 
        this.math(this.x, this.y); 
    }

    handleClick(e) {
        if(window.CURRENT_STATE == STATE.LOCKED){
            return; 
        }
        else if(window.CURRENT_STATE == STATE.DEFAULT) {
            this.dispatchUIClickedEvent(); 
            this.dispatchCollectYieldEvent(); 
        }
        else if (window.CURRENT_STATE == STATE.BUILDING) {
            this.dispatchUIClickedEvent(); 
            this.dispatchMapBuildEvent(); 
        }
        else if(window.CURRENT_STATE == STATE.DESTROYING) {
            this.dispatchUIClickedEvent(); 
            this.dispatchMapDestroyEvent(); 
        }
        else if(window.CURRENT_STATE == STATE.SHOP) {
            this.dispatchUIClickedEvent(); 
        }
      }

      dispatchUIClickedEvent() {
        var  onUIClicked = new CustomEvent('onUIClicked', {
            bubbles: true, 
        });

        this._canvas.dispatchEvent(onUIClicked); 
      }

      dispatchCollectYieldEvent() {
        var  onCollectYield = new CustomEvent('onCollectYield', {
            detail: {
                'tileX': this.tileX, 
                'tileY': this.tileY
            },
        });
        this._canvas.dispatchEvent(onCollectYield); 
      }

      dispatchMapBuildEvent() {
        var onMapChanged = new CustomEvent('onMapBuild', {
            detail: {
                'tileX': this.tileX, 
                'tileY': this.tileY
             },
        });
        this._canvas.dispatchEvent(onMapChanged); 
      }

      dispatchMapDestroyEvent() {
        var onMapChanged = new CustomEvent('onMapDestroy', {
            detail: {
                'tileX': this.tileX, 
                'tileY': this.tileY
             },
        });
        this._canvas.dispatchEvent(onMapChanged); 
      }

     math(mouseAbsX, mouseAbsY){
        const width = WIDTH / 2; 
        const height = HEIGHT / 2; 
        
        var determinant = 1 / (2 * width * height);
        var offGameX = this._game._currentCameraOffset.x; 
        var offGameY = this._game._currentCameraOffset.y; 

        var offX = (0 + offGameX) * width; 
        var offY = (6.5 + offGameY) * height + height;

        var rotA = -(offX * height) - (offY * width); 
        var rotB = (offX * height) - (offY * width); 

        var a = (determinant) * (mouseAbsX * height + mouseAbsY * width + rotA);
        var b = (determinant) * (mouseAbsX * (-height) + mouseAbsY * width + rotB); 
        
        this.tileX = Math.floor(a) - 1;
        this.tileY = -Math.floor(b); 
      }
}
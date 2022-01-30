import Game from "./game"; 
import GameMap from './gamemap';
import Loader from './loader';  
import Renderer from './renderer'; 
import Mouse from './mouse'; 
import { UI } from './ui'; 
import Economics from './economics'; 

window.addEventListener('loadGameEngine', loadGameEngine); 

async function loadGameEngine() {
  window.removeEventListener('loadGameEngine', loadGameEngine); 
  const canvas = document.getElementById("playground");
  const context = canvas.getContext('2d');

  const map = new GameMap(canvas); 
  const loader = new Loader(); 
  await loader.init(); 
  const renderer = new Renderer(context, map, loader); 
  const mouse = new Mouse(canvas); 
  const ui = new UI(canvas, context, loader, mouse); 
  const economics = new Economics(map); 

  const game = new Game(canvas, renderer, ui, map, mouse); 
  game.init(); 
}



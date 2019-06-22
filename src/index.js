import './index.css';
import * as PIXI from 'pixi.js';
import Game from './game/Game';
import Globals from './Globals';

PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

const app = new PIXI.Application({
  width: Globals.WIDTH,
  height: Globals.HEIGHT,
  antialias: false,
  resolution: window.devicePixelRatio || 1,
  backgroundColor: 0,
});
let game = null;

function resizeHandler() {
  // const canvasHolder = document.getElementById('canvasHolder');
  // const offsetH = window.innerHeight - canvasHolder.offsetTop;
  const scaleFactor = Math.min(
    window.innerWidth / Globals.WIDTH,
    window.innerHeight / Globals.HEIGHT,
  );
  const newWidth = Math.ceil(Globals.WIDTH * scaleFactor);
  const newHeight = Math.ceil(Globals.HEIGHT * scaleFactor);

  app.renderer.view.style.width = `${newWidth}px`;
  app.renderer.view.style.height = `${newHeight}px`;

  app.renderer.resize(newWidth, newHeight);
  game.scale.set(scaleFactor);
}

app.loader.add('ia', 'ia.png')
  .add('image', 'image.png')
  .add('goal', 'goal.png')
  .add('gold', 'gold.png')
  .add('silver', 'silver.png')
  .add('bronze', 'bronze.png')
  .load((loader, resources) => {
    Globals.RESOURCES = resources;
    game = new Game();
    app.view.id = 'gameCanvas';
    app.view.style.position = 'absolute';
    app.stage.addChild(game);
    document.getElementById('canvasHolder').appendChild(app.view);
    window.addEventListener('resize', resizeHandler);
    resizeHandler();
  });

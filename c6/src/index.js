const PIXI = window.PIXI;
import * as MainLoop from 'mainloop.js';
import Vec2 from './vec2';

let gravity = new Vec2(0,500);
let velocity = new Vec2(150,0);
let position = new Vec2(100,0);

const gameWidth = 640;
const gameHeight = 360;

const rectWidth = 200;
const rectHeight = 100;
let rectColor = randomColor();
const app = new PIXI.Application({ width: gameWidth, height: gameHeight });
document.getElementById("pixi-root").appendChild(app.view);
const obj = new PIXI.Graphics();
app.stage.addChild(obj);

MainLoop.setUpdate((delta) => {
    const deltaInSecs = delta / 1000;
    velocity = velocity.add(gravity.scale(deltaInSecs));
    position = position.add(velocity.scale(deltaInSecs));
    if(position.x + rectWidth >= gameWidth) {
        let diff = position.x + rectWidth - gameWidth;
        position = new Vec2(position.x - diff, position.y);
        velocity = new Vec2(-velocity.x, velocity.y);
        rectColor = randomColor();
    }
    if(position.x <= 0) {
        let diff = position.x;
        position = new Vec2(position.x + diff, position.y);
        velocity = new Vec2(-velocity.x, velocity.y);
        rectColor = randomColor();
    }
    if(position.y + rectHeight > gameHeight) {
        let diff = position.y + rectHeight - gameHeight;
        position = new Vec2(position.x, gameHeight - rectHeight - diff);
        velocity = new Vec2(velocity.x, -velocity.y);
        rectColor = randomColor();
    }
    obj.clear();
    obj.beginFill(rectColor);
    obj.drawRect(position.x, position.y, rectWidth, rectHeight);
});

MainLoop.start();

function randomColor() {
    let red = Math.floor(Math.random()*256);
    let green = Math.floor(Math.random()*256);
    let blue = Math.floor(Math.random()*256);
    return (red << 16) + (green << 8) + blue;
}
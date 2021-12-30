const PIXI = window.PIXI;
import * as MainLoop from 'mainloop.js';
import Vec2 from './vec2';

let gravity = new Vec2(0, 500);
let velocity = new Vec2(200, 0);
let position = new Vec2(150, 50);

const gameWidth = 640;
const gameHeight = 360;

const radius = 50;

let rectColor = randomColor();
const app = new PIXI.Application({ width: gameWidth, height: gameHeight });
document.getElementById("pixi-root").appendChild(app.view);
const obj = new PIXI.Graphics();
app.stage.addChild(obj);

MainLoop.setUpdate((deltaInMs) => {
    const delta = deltaInMs / 1000;
    velocity = velocity.add(gravity.scale(delta));
    position = position.add(velocity.scale(delta));
    if(position.x + radius >= gameWidth) {
        /*
            If the right side of the body moves past the right side of the game area,
            move it back and reverse its horizontal direction of movement
        */
        let diff = position.x + radius - gameWidth;
        position = new Vec2(position.x - 2 * diff, position.y);
        velocity = new Vec2(-velocity.x, velocity.y);
        rectColor = randomColor();
    }
    if(position.x - radius <= 0) {
        /* 
            If the left side of the body moves past the left side of the game area,
            move it back and reverse its horizontal direction of movement
        */
        let diff = position.x - radius;
        position = new Vec2(position.x - 2 * diff, position.y);
        velocity = new Vec2(-velocity.x, velocity.y);
        rectColor = randomColor();
    }
    if(position.y + radius > gameHeight) {
        /*
            If the bottom side of the body moves below the bottom of the game area,
            move it back and change its vertical direction of movement
        */
        let diff = position.y + radius - gameHeight;
        position = new Vec2(position.x, position.y - 2 * diff);
        velocity = new Vec2(velocity.x, -velocity.y);
        rectColor = randomColor();
    }
    obj.clear();
    obj.beginFill(rectColor);
    obj.drawCircle(position.x, position.y, radius);
});

MainLoop.start();

function randomColor() {
    let red = Math.floor(Math.random()*256);
    let green = Math.floor(Math.random()*256);
    let blue = Math.floor(Math.random()*256);
    return (red << 16) + (green << 8) + blue;
}
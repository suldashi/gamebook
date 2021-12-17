import * as PIXI from 'pixi.js'
import * as MainLoop from 'mainloop.js';

let xVelocity = 2;
let yVelocity = 0;

let xPosition = 60;
let yPosition = 0;

const gameWidth = 640;
const gameHeight = 360;

const rectWidth = 200;
const rectHeight = 100;
let rectColor = randomColor();

const app = new PIXI.Application({ width: gameWidth, height: gameHeight });
document.getElementById("pixi-root").appendChild(app.view);

const obj = new PIXI.Graphics();
const gravity = 0.2;
app.stage.addChild(obj);
MainLoop.setUpdate(() => {
    obj.clear();
    obj.beginFill(rectColor);
    obj.drawRect(xPosition, yPosition, rectWidth, rectHeight);
    yVelocity+=gravity;
    xPosition += xVelocity;
    yPosition += yVelocity;
    if(xPosition + rectWidth >= gameWidth) {
        let diff = xPosition + rectWidth - gameWidth;
        xPosition -= diff;
        xVelocity = -xVelocity;
        rectColor = randomColor();
    }
    if(xPosition <= 0) {
        let diff = xPosition;
        xPosition+=diff;
        xVelocity = -xVelocity;
        rectColor = randomColor();
    }
    if(yPosition + rectHeight > gameHeight) {
        let diff = yPosition + rectHeight - gameHeight;
        yPosition = gameHeight - rectHeight - diff;
        yVelocity = -yVelocity;
        rectColor = randomColor();
    }
});

MainLoop.start();

function randomColor() {
    let red = Math.floor(Math.random()*256);
    let green = Math.floor(Math.random()*256);
    let blue = Math.floor(Math.random()*256);
    return (red << 16) + (green << 8) + blue;
}
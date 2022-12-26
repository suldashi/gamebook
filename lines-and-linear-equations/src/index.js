import * as MainLoop from 'mainloop.js';

let xVelocity = 1;
let yVelocity = 1;

let xPosition = 60;
let yPosition = 120;

const gameWidth = 640;
const gameHeight = 360;

const rectWidth = 200;
const rectHeight = 100;
let rectColor = randomColor();

const app = new PIXI.Application({ width: gameWidth, height: gameHeight });
document.getElementById("pixi-root").appendChild(app.view);

const obj = new PIXI.Graphics();
app.stage.addChild(obj);
MainLoop.setUpdate(() => {
    obj.clear();
    obj.beginFill(rectColor);
    obj.drawRect(xPosition, yPosition, rectWidth, rectHeight);
    xPosition += xVelocity;
    yPosition += yVelocity;
    if(xPosition + rectWidth === gameWidth) {
        xVelocity = -1;
        rectColor = randomColor();
    }
    if(xPosition === 0) {
        xVelocity = 1;
        rectColor = randomColor();
    }
    if(yPosition + rectHeight === gameHeight) {
        yVelocity = -1;
        rectColor = randomColor();
    }
    if(yPosition === 0) {
        yVelocity = 1;
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
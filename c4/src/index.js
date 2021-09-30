import * as MainLoop from 'mainloop.js';

let app = new PIXI.Application({ width: 640, height: 360 });
let pixiRoot = document.getElementById("pixi-root")
pixiRoot.appendChild(app.view);

let xSpeed = 1;
let ySpeed = 1;

let xPosition = 60;
let yPosition = 120;

let squareColor = randomColor();

let obj = new PIXI.Graphics();
app.stage.addChild(obj);
MainLoop.setUpdate(() => {
    obj.clear();
    obj.beginFill(squareColor);
    obj.drawRect(xPosition, yPosition, 200, 100);
    xPosition += xSpeed;
    yPosition += ySpeed;
    if(xPosition + 200 === 640) {
        xSpeed = -1;
        squareColor = randomColor();
    }
    if(xPosition === 0) {
        xSpeed = 1;
        squareColor = randomColor();
    }
    if(yPosition + 100 === 360) {
        ySpeed = -1;
        squareColor = randomColor();
    }
    if(yPosition === 0) {
        ySpeed = 1;
        squareColor = randomColor();
    }
});

MainLoop.start();


function randomColor() {
    let red = Math.floor(Math.random()*256);
    let green = Math.floor(Math.random()*256);
    let blue = Math.floor(Math.random()*256);
    return (red << 16) + (green << 8) + blue;
}
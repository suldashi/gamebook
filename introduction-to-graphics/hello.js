let app = new PIXI.Application({ width: 640, height: 360 });
let pixiRoot = document.getElementById('pixi-root');
pixiRoot.appendChild(app.view);

let obj = new PIXI.Graphics();
obj.beginFill(0x00FF00);
obj.drawRect(60, 120, 200, 100);
app.stage.addChild(obj);
const PIXI = window.PIXI;
//import * as PIXI from "pixi.js";
import System from "../ecs/system";
import BodyGraphicsComponent from "./bodyGraphicsComponent";
import CollisionCellRenderingComponent from "./collisionCellRenderingComponent";
import config from '../config';

const textPool = [];
const poolSize = 32;

for(var i=0;i<poolSize;i++) {
    textPool.push(new PIXI.Text("TEMP",{
        fill: "0xffffff",
        fontSize: 36
    }));
}

export default class GraphicsSystem extends System {
    constructor() {
        super();
        this.parentElement = document.getElementById(config.rootElementId);
        this.width = config.width;
        this.height = config.height;
        this.app = new PIXI.Application({width: this.width, height: this.height});
        this.parentElement.appendChild(this.app.view);
        this.graphics = new PIXI.Graphics();
        this.textContainer = new PIXI.Container();
        this.app.stage.addChild(this.graphics);
        this.app.stage.addChild(this.textContainer);
    }

    update() {
        let cells = {};
        this.graphics.clear();
        this.textContainer.removeChildren();
        for(const component of this.components) {
            if(component instanceof BodyGraphicsComponent) {
                this.graphics.beginFill(component.color);
                this.graphics.drawRect(component.bodyComponent.position.x, component.bodyComponent.position.y, component.bodyComponent.width, component.bodyComponent.height);
            }
            else if(component instanceof CollisionCellRenderingComponent) {
                for(let cell of component.collisionComponent.cells) {
                    if(!cells[cell]) {
                        cells[cell] = 0;
                    }
                    cells[cell]++;
                }
            }
        }
        const cellDimension = 150;
        let poolIndex = 0;
        for(const cellKey of Object.keys(cells)) {
            if(poolIndex < poolSize) {
                const [x,y] = cellKey.split("|").map(val => parseInt(val));
                const text = textPool[poolIndex++];
                text.text = cells[cellKey];
                text.x = x + cellDimension/2;
                text.y = y + cellDimension/2;
                text.anchor.set(0.5);
                this.graphics.beginFill("0xffffff", 0.3);
                this.graphics.drawRect(x, y, cellDimension, cellDimension);
                this.textContainer.addChild(text);
            }
        }
    }

    createGraphicsComponent(bodyComponent) {
        let graphicsComponent = new BodyGraphicsComponent(bodyComponent);
        this.components.push(graphicsComponent);
        return graphicsComponent;
    }

    createCollisionCellRenderingComponent(collisionComponent) {
        let graphicsComponent = new CollisionCellRenderingComponent(collisionComponent);
        this.components.push(graphicsComponent);
        return graphicsComponent;
    }
}

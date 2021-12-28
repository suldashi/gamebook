import System from "../ecs/system";
import BodyGraphicsComponent from "./bodyGraphicsComponent";
const PIXI = window.PIXI;
//import * as PIXI from "pixi.js";

export default class GraphicsSystem extends System {
    constructor() {
        super();
        this.parentElement = document.getElementById("pixi-root");
        this.width = 640;
        this.height = 360;
        this.app = new PIXI.Application({width: this.width, height: this.height});
        this.parentElement.appendChild(this.app.view);
        this.graphics = new PIXI.Graphics();
        this.app.stage.addChild(this.graphics);
    }

    update() {
        this.graphics.clear();
        for(const component of this.components) {
            this.graphics.beginFill(component.color);
            this.graphics.drawCircle(component.bodyComponent.position.x, component.bodyComponent.position.y, component.bodyComponent.radius);
        }
    }

    createGraphicsComponent(bodyComponent) {
        let graphicsComponent = new BodyGraphicsComponent(bodyComponent, randomColor());
        this.components.push(graphicsComponent);
        return graphicsComponent;
    }
}



function randomColor() {
    let red = Math.floor(Math.random()*256);
    let green = Math.floor(Math.random()*256);
    let blue = Math.floor(Math.random()*256);
    return (red << 16) + (green << 8) + blue;
}

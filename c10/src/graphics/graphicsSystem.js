const PIXI = window.PIXI;
//import * as PIXI from "pixi.js";
import System from "../ecs/system";
import BodyGraphicsComponent from "./bodyGraphicsComponent";
import config from '../config';

export default class GraphicsSystem extends System {
    constructor() {
        super();
        this.parentElement = document.getElementById(config.rootElementId);
        this.width = config.width;
        this.height = config.height;
        this.app = new PIXI.Application({width: this.width, height: this.height});
        this.parentElement.appendChild(this.app.view);
        this.graphics = new PIXI.Graphics();
        this.app.stage.addChild(this.graphics);
    }

    update() {
        this.graphics.clear();
        for(const component of this.components) {
            this.graphics.beginFill(component.color);
            this.graphics.drawRect(component.bodyComponent.position.x, component.bodyComponent.position.y, component.bodyComponent.width, component.bodyComponent.height);
        }
    }

    createGraphicsComponent(bodyComponent) {
        let graphicsComponent = new BodyGraphicsComponent(bodyComponent);
        this.components.push(graphicsComponent);
        return graphicsComponent;
    }
}

import System from '../ecs/system';
import ScreenEdgeBounceComponent from './screenEdgeBounceComponent';
import Vec2 from '../vec2';
import config from '../config';

export default class ScreenEdgeBounceSystem extends System {
    constructor() {
        super();
        this.width = config.width;
        this.height = config.height;
    }

    update() {
        for(const component of this.components) {
            const bodyComponent = component.bodyComponent;
            const graphicsComponent = component.graphicsComponent;
            if(bodyComponent.position.x + bodyComponent.radius >= this.width) {
                let diff = bodyComponent.position.x + bodyComponent.radius - this.width;
                bodyComponent.position = new Vec2(bodyComponent.position.x - 2 * diff, bodyComponent.position.y);
                bodyComponent.velocity = new Vec2(-bodyComponent.velocity.x, bodyComponent.velocity.y);
                graphicsComponent.setRandomColor();
            }
            if(bodyComponent.position.x - bodyComponent.radius <= 0) {
                let diff = bodyComponent.position.x - bodyComponent.radius;
                bodyComponent.position = new Vec2(bodyComponent.position.x - 2 * diff, bodyComponent.position.y);
                bodyComponent.velocity = new Vec2(-bodyComponent.velocity.x, bodyComponent.velocity.y);
                graphicsComponent.setRandomColor();
            }
            if(bodyComponent.position.y + bodyComponent.radius > this.height) {
                let diff = bodyComponent.position.y + bodyComponent.radius - this.height;
                bodyComponent.position = new Vec2(bodyComponent.position.x, bodyComponent.position.y - 2 * diff);
                bodyComponent.velocity = new Vec2(bodyComponent.velocity.x, -bodyComponent.velocity.y);
                graphicsComponent.setRandomColor();
            }
        }
    }

    createScreenEdgeBounceComponent(bodyComponent, graphicsComponent) {
        const component = new ScreenEdgeBounceComponent(bodyComponent, graphicsComponent);
        this.components.push(component);
        return component;
    }
}
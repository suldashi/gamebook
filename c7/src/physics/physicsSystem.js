import System from '../ecs/system';
import BodyComponent from './bodyComponent';

export default class PhysicsSystem extends System {
    constructor() {
        super();
    }

    update(delta) {
        for(const component of this.components) {
            component.velocity = component.velocity.add(component.acceleration.scale(delta));
            component.position = component.position.add(component.velocity.scale(delta));
        }
    }

    createBodyComponent(posX, posY) {
        const component = new BodyComponent(posX, posY);
        this.components.push(component);
        return component;
    }
}
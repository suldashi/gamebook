import System from "../ecs/system";
import CollisionComponent from "./collisionComponent";

export default class CollisionSystem extends System {
    constructor() {
        super();
    }

    update() {
        for(let i = 0; i < this.components.length - 1; i++) {
            for(let j = i + 1; j < this.components.length; j++) {
                if(checkOverlap(this.components[i].bodyComponent, this.components[j].bodyComponent)) {
                    if(this.components[i].collisionCallbacks[this.components[j].collisionTag]) {
                        this.components[i].collisionCallbacks[this.components[j].collisionTag]();
                    }
                    if(this.components[j].collisionCallbacks[this.components[i].collisionTag]) {
                        this.components[j].collisionCallbacks[this.components[i].collisionTag]();
                    }
                }
            }
        }
    }

    createCollisionComponent(bodyComponent, collisionTag) {
        let collisionComponent = new CollisionComponent(bodyComponent, collisionTag);
        this.components.push(collisionComponent);
        return collisionComponent;
    }
}

function checkOverlap(b1, b2) {
    return !(b1.position.x + b1.width < b2.position.x ||
        b1.position.x > b2.position.x + b2.width ||
        b1.position.y + b1.height < b2.position.y ||
        b1.position.y > b2.position.y + b2.height);
}
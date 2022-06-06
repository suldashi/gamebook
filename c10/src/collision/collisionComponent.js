import Component from "../ecs/component";

export default class CollisionComponent extends Component {
    constructor(bodyComponent, collisionTag) {
        super();
        this.bodyComponent = bodyComponent;
        this.collisionTag = collisionTag;
        this.collisionCallbacks = {}
    }

    setCollisionCallback(targetCollisionTag, callback) {
        this.collisionCallbacks[targetCollisionTag] = callback;
    }
}
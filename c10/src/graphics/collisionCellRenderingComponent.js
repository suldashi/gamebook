import Component from "../ecs/component";

export default class CollisionCellRenderingComponent extends Component {
    constructor(collisionComponent) {
        super();
        this.collisionComponent = collisionComponent;
    }
}
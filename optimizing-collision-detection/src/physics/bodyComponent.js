import Component from '../ecs/component';
import Vec2 from '../vec2';

export default class BodyComponent extends Component {
    constructor(posX, posY) {
        super();
        this.position = new Vec2(posX, posY);
        this.velocity = new Vec2(0, 0);
        this.acceleration = new Vec2(0, 0);
        this.width = 100;
        this.height = 100;
    }
}
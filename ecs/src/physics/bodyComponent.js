import Component from '../ecs/component';
import Vec2 from '../vec2';

export default class BodyComponent extends Component {
    constructor(posX, posY) {
        super();
        this.position = new Vec2(posX, posY);
        this.velocity = new Vec2(200, 0);
        this.acceleration = new Vec2(0, 500);
        this.radius = 50;
    }
}
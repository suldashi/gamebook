import Component from "../ecs/component";

export default class BodyGraphicsComponent extends Component {
    constructor(bodyComponent, initialColor) {
        super();
        this.bodyComponent = bodyComponent;
        this.color = initialColor;
    }
}
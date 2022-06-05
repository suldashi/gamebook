import Component from '../ecs/component';

export default class KeyboardInputComponent extends Component {
    constructor(bodyComponent) {
        super();
        this.bodyComponent = bodyComponent;
    }
}
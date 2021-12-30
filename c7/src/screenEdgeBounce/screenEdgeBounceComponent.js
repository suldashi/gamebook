import Component from '../ecs/component';

export default class ScreenEdgeBounceComponent extends Component {
    constructor(bodyComponent, graphicsComponent) {
        super();
        this.bodyComponent = bodyComponent;
        this.graphicsComponent = graphicsComponent;
    }
}
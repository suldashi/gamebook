import Component from "../ecs/component";

export default class BodyGraphicsComponent extends Component {
    constructor(bodyComponent) {
        super();
        this.bodyComponent = bodyComponent;
        this.setRandomColor();
    }

    setColor(red, green, blue) {
        this.color = rgb(red, green, blue);
    }

    setRandomColor() {
        this.color = randomColor();
    }
}

function randomColor() {
    let red = Math.floor(Math.random()*256);
    let green = Math.floor(Math.random()*256);
    let blue = Math.floor(Math.random()*256);
    return rgb(red, green, blue);
}

function rgb(red, green, blue) {
    return (red << 16) + (green << 8) + blue;
}
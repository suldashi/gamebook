import System from '../ecs/system';
import Vec2 from '../vec2';
import KeyboardInputComponent from './keyboardInputComponent';

export default class KeyboardInputSystem extends System {
    constructor() {
        super();
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
        window.onkeydown = (event) => {
            if(event.code === "KeyW") {
                this.up = true;
            }
            else if(event.code === "KeyS") {
                this.down = true;
            }
            else if(event.code === "KeyA") {
                this.left = true;
            }
            else if(event.code === "KeyD") {
                this.right = true;
            }
        };
        window.onkeyup = (event) => {
            if(event.code === "KeyW") {
                this.up = false;
            }
            else if(event.code === "KeyS") {
                this.down = false;
            }
            else if(event.code === "KeyA") {
                this.left = false;
            }
            else if(event.code === "KeyD") {
                this.right = false;
            }
        };
    }

    update() {
        for(const component of this.components) {
            let horVelocity = 0;
            let verVelocity = 0;
            let velocityValue = 200;
            if(this.left && !this.right) {
                horVelocity = -velocityValue;
            }
            else if(!this.left && this.right) {
                horVelocity = velocityValue;
            }
            if(this.up && !this.down) {
                verVelocity = -velocityValue;
            }
            else if(!this.up && this.down) {
                verVelocity = velocityValue;
            }
            component.bodyComponent.velocity = new Vec2(horVelocity, verVelocity);
        }
    }

    createKeyboardInputComponent(bodyComponent) {
        const component = new KeyboardInputComponent(bodyComponent);
        this.components.push(component);
        return component;
    }
}
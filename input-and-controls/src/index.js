import * as MainLoop from 'mainloop.js';
import KeyboardInputSystem from './input/keyboardInputSystem';
import PhysicsSystem from './physics/physicsSystem';
import GraphicsSystem from './graphics/graphicsSystem';
import Entity from './ecs/entity';
import config from './config';

let keyboardInputSystem = new KeyboardInputSystem();
let physicsSystem = new PhysicsSystem();
let graphicsSystem = new GraphicsSystem();

createPlayerRectangle(config.width / 2, config.height / 2);

MainLoop.setUpdate((delta) => {
    const deltaInSecs = delta / 1000;
    keyboardInputSystem.update();
    physicsSystem.update(deltaInSecs);

    keyboardInputSystem.deleteStaleComponents();
    physicsSystem.deleteStaleComponents();
}).setDraw(() => {
    graphicsSystem.update();
    
    graphicsSystem.deleteStaleComponents();
});

MainLoop.start();

function createPlayerRectangle(posX, posY) {
    let entity = new Entity();
    let bodyComponent = physicsSystem.createBodyComponent(posX, posY);
    let graphicsComponent = graphicsSystem.createGraphicsComponent(bodyComponent);
    let keyboardInputComponent = keyboardInputSystem.createKeyboardInputComponent(bodyComponent);
    entity.attachComponents(bodyComponent, graphicsComponent, keyboardInputComponent);
}
import * as MainLoop from 'mainloop.js';
import KeyboardInputSystem from './input/keyboardInputSystem';
import PhysicsSystem from './physics/physicsSystem';
import GraphicsSystem from './graphics/graphicsSystem';
import CollisionSystem from './collision/collisionSystem';
import Entity from './ecs/entity';
import config from './config';
import Vec2 from './vec2';


let keyboardInputSystem = new KeyboardInputSystem();
let physicsSystem = new PhysicsSystem();
let graphicsSystem = new GraphicsSystem();
let collisionSystem = new CollisionSystem();

createFoodRectangle(randomInt(0, config.width), randomInt(0, config.height));
createPoisonRectangle(randomInt(0, config.width), randomInt(0, config.height));
createPlayerRectangle(config.width / 2, config.height / 2);


MainLoop.setUpdate((delta) => {
    const deltaInSecs = delta / 1000;
    keyboardInputSystem.update();
    physicsSystem.update(deltaInSecs);
    collisionSystem.update(deltaInSecs);

    keyboardInputSystem.deleteStaleComponents();
    physicsSystem.deleteStaleComponents();
    collisionSystem.deleteStaleComponents();
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
    let collisionComponent = collisionSystem.createCollisionComponent(bodyComponent, "player");
    collisionComponent.setCollisionCallback("food", () => {
        bodyComponent.width += 20;
        bodyComponent.height += 20;
        bodyComponent.position = new Vec2(bodyComponent.position.x - 10, bodyComponent.position.y - 10);
    });
    collisionComponent.setCollisionCallback("poison", () => {
        bodyComponent.width -= 20;
        bodyComponent.height -= 20;
        bodyComponent.position = new Vec2(bodyComponent.position.x + 10, bodyComponent.position.y + 10);
    });
    graphicsComponent.setColor(255, 0, 0);
    entity.attachComponents(bodyComponent, graphicsComponent, keyboardInputComponent, collisionComponent);
}

function createFoodRectangle(posX, posY) {
    let entity = new Entity();
    let bodyComponent = physicsSystem.createBodyComponent(posX, posY);
    bodyComponent.width = 30;
    bodyComponent.height = 30;
    let graphicsComponent = graphicsSystem.createGraphicsComponent(bodyComponent);
    let collisionComponent = collisionSystem.createCollisionComponent(bodyComponent, "food");
    collisionComponent.setCollisionCallback("player", () => {
        bodyComponent.position = new Vec2(randomInt(0,config.width), randomInt(0,config.height));
    });
    graphicsComponent.setColor(0, 255, 0);
    entity.attachComponents(bodyComponent, graphicsComponent, collisionComponent);
}

function createPoisonRectangle(posX, posY) {
    let entity = new Entity();
    let bodyComponent = physicsSystem.createBodyComponent(posX, posY);
    bodyComponent.width = 30;
    bodyComponent.height = 30;
    let graphicsComponent = graphicsSystem.createGraphicsComponent(bodyComponent);
    let collisionComponent = collisionSystem.createCollisionComponent(bodyComponent, "poison");
    collisionComponent.setCollisionCallback("player", () => {
        bodyComponent.position = new Vec2(randomInt(0,config.width), randomInt(0,config.height));
    });
    graphicsComponent.setColor(255, 255, 0);
    entity.attachComponents(bodyComponent, graphicsComponent, collisionComponent);
}

function randomInt(lowerBoundInclusive = 0, upperBoundInclusive = 100) {
    return Math.floor(lowerBoundInclusive + Math.random() * (upperBoundInclusive + 1 - lowerBoundInclusive));
}
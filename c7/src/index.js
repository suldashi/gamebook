import * as MainLoop from 'mainloop.js';
import PhysicsSystem from './physics/physicsSystem';
import GraphicsSystem from './graphics/graphicsSystem';
import Entity from './ecs/entity';

let physicsSystem = new PhysicsSystem();
let graphicsSystem = new GraphicsSystem();

createBouncingBall();


MainLoop.setUpdate((delta) => {
    const deltaInSecs = delta / 1000;
    physicsSystem.update(deltaInSecs);
    graphicsSystem.update();
    physicsSystem.deleteStaleComponents();
    graphicsSystem.deleteStaleComponents();
});

MainLoop.start();

function createBouncingBall() {
    let entity = new Entity();
    let bodyComponent = physicsSystem.createBodyComponent(50,50);
    let graphicsComponent = graphicsSystem.createGraphicsComponent(bodyComponent);
    entity.attachComponents(bodyComponent, graphicsComponent);
    window.foo = entity;
}
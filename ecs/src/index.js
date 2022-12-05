import * as MainLoop from 'mainloop.js';
import PhysicsSystem from './physics/physicsSystem';
import ScreenEdgeBounceSystem from './screenEdgeBounce/screenEdgeBounceSystem';
import GraphicsSystem from './graphics/graphicsSystem';
import Entity from './ecs/entity';

let physicsSystem = new PhysicsSystem();
let screenEdgeBounceSystem = new ScreenEdgeBounceSystem();
let graphicsSystem = new GraphicsSystem();

createBouncingBall(50, 50);
createBouncingBall(200, 70);
createBouncingBall(350, 90);
createBouncingBall(500, 110);

MainLoop.setUpdate((delta) => {
    const deltaInSecs = delta / 1000;
    physicsSystem.update(deltaInSecs);
    screenEdgeBounceSystem.update();
    
    physicsSystem.deleteStaleComponents();
    screenEdgeBounceSystem.deleteStaleComponents();
}).setDraw(() => {
    graphicsSystem.update();
    graphicsSystem.deleteStaleComponents();
});

MainLoop.start();

function createBouncingBall(posX, posY) {
    let entity = new Entity();
    let bodyComponent = physicsSystem.createBodyComponent(posX, posY);
    let graphicsComponent = graphicsSystem.createGraphicsComponent(bodyComponent);
    let screenEdgeBounceComponent = screenEdgeBounceSystem.createScreenEdgeBounceComponent(bodyComponent, graphicsComponent);
    entity.attachComponents(bodyComponent, graphicsComponent, screenEdgeBounceComponent);
}
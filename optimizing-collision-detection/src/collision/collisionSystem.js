import System from "../ecs/system";
import CollisionComponent from "./collisionComponent";

export default class CollisionSystem extends System {
    constructor() {
        super();
    }

    update() {
        const cells = {};
        const checkedPairs = {};
        const collisions = [];

        for(let i = 0; i < this.components.length; i++) {
            this.components[i].clearCells();
            let collisionCells = calculateCells(this.components[i].bodyComponent);
            for(let cellKey of collisionCells) {
                if(!cells[cellKey]) {
                    cells[cellKey] = [];
                }
                cells[cellKey].push(this.components[i]);
                this.components[i].addCell(cellKey);
            }
        }
        
        // iterate over all cells, then check for collisions between each pair within that cell
        for(let cell of Object.values(cells)) {
            for(let i = 0; i < cell.length - 1; i++) {
                for(let j = i + 1; j < cell.length; j++) {
                    // only check if we haven't checked this pair already
                    if(!(checkedPairs[`${cell[i].id}|${cell[j].id}]`])) {
                        if(checkOverlap(cell[i].bodyComponent, cell[j].bodyComponent)) {

                            /*  Add this pair to the checkedPairs array so we don't check it again.
                                Both orientations need to be added to the array so that we don't
                                miss collisions between the same pair of bodies caused by differences
                                in the order of bodies in a cell. */
                            checkedPairs[`${cell[i].id}|${cell[j].id}`] = checkedPairs[`${cell[j].id}|${cell[i].id}`] = true;
    
                            if(cell[i].collisionCallbacks[cell[j].collisionTag]) {
                                collisions.push(cell[i].collisionCallbacks[cell[j].collisionTag]);
                            }
                            if(cell[j].collisionCallbacks[cell[i].collisionTag]) {
                                collisions.push(cell[j].collisionCallbacks[cell[i].collisionTag]);
                            }
                        }
                    }
                }
            }
        }

        for(let collisionInstance of collisions) {
            collisionInstance();
        }
    }

    createCollisionComponent(bodyComponent, collisionTag) {
        let collisionComponent = new CollisionComponent(bodyComponent, collisionTag);
        this.components.push(collisionComponent);
        return collisionComponent;
    }
}

function calculateCells(bodyComponent) {
    const cellSize = 150;
    const xCells = [];
    const yCells = [];
    const calculatedCells = [];

    let maxX = Math.ceil((bodyComponent.position.x + bodyComponent.width)/cellSize)*cellSize;
    let maxY = Math.ceil((bodyComponent.position.y + bodyComponent.height)/cellSize)*cellSize;

    for(let x = bodyComponent.position.x; x <= maxX; x+=cellSize) {
        xCells.push(Math.floor(x/cellSize)*cellSize);
    }

    for(let y = bodyComponent.position.y; y <= maxY; y+=cellSize) {
        yCells.push(Math.floor(y/cellSize)*cellSize);
    }
    
    for(let i = 0;i<xCells.length;i++) {
        for(let j = 0;j<yCells.length;j++) {
            calculatedCells.push(`${xCells[i]}|${yCells[j]}`);
        }
    }

    return calculatedCells;
}

function checkOverlap(b1, b2) {
    if (b1.position.x + b1.width < b2.position.x ||
        b1.position.x > b2.position.x + b2.width ||
        b1.position.y + b1.height < b2.position.y ||
        b1.position.y > b2.position.y + b2.height) {
        return false;
    }
    return true;
}
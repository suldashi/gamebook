export default class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        Object.freeze(this);
    }

    add(otherVec) {
        return new Vec2(this.x + otherVec.x, this.y + otherVec.y);
    }

    subtract(otherVec) {
        return new Vec2(this.x - otherVec.x, this.y - otherVec.y);
    }

    scale(scalar) {
        return new Vec2(scalar * this.x, scalar * this.y);
    }

    magnitude() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
        // return Math.sqrt(this.dot(this));    // equivalent to the line above
    }

    normalize() {
        let magnitude = this.magnitude();
        return new Vec2(this.x / magnitude, this.y / magnitude);
    }

    dot(otherVector) {
        return this.x * otherVector.x + this.y * otherVector.y;
    }

}
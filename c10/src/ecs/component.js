export default class Component {
    constructor() {
        this.id = crypto.randomUUID();
        this.isDeleted = false;
    }

    delete() {
        this.isDeleted = true;
    }
}
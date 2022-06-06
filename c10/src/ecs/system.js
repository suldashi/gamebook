export default class System {
    constructor() {
        this.components = [];
    }

    update() {
        // nothing here for now
    }

    deleteStaleComponents() {
        this.components = this.components.filter(x => !x.isDeleted);
    }
}
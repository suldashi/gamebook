export default class Entity {
    constructor() {
        this.id = crypto.randomUUID();
        this.components = [];
    }

    attachComponents(...components) {
        this.components = [...this.components, ...components];
    }

    deleteComponents() {
        for(const component of this.components) {
            component.delete();
        }
        this.components = [];
    }
}
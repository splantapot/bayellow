class Controller {
    constructor() {
        this.inputs = [];

        window.addEventListener('keydown', (e) => {
            if (!this.inputs.includes(e.key)) {
                this.inputs.push(e.key);
            }
        });

        window.addEventListener('keyup', (e) => {
            this.inputs.splice(this.inputs.indexOf(e.key), 1);
        });
    }

    getInputs() {
        return this.inputs;
    }
}
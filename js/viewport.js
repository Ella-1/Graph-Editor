class Viewport {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.zoom = 1;

        this.#addEventListeners();
    }

    #addEventListeners() {
        this.canvas.addEventListners("mousewheel", this.#handleMouseWheel.bind(this))
    }
    #handleMouseWheel(evt) {
        const dir = Math.sign(evt.deltaY)
        // how  much we want to change in a direction
        const step = 0.1;
        this.zoom += dir * step;
        // zoom interval that keeps it btween 1 and 5
        this.zoom = Math.max(1, Math.min(5, this.zoom))
        // console.log(evt.deltaY)

    }
}
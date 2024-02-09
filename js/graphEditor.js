class GraphEditor {
    constructor(canvas, graph) {
        this.canvas = canvas;
        this.graph = graph;
        // referance to the canvas drawing context
        this.ctx = this.canvas.getContext("2d");
        this.selected = null;
        this.hover = null;
        this.dragging = false;
        this.mouse = null;
        // adding a private method
        this.#addEventListeners();
    }
    #addEventListeners() {
        this.canvas.addEventListener("mousedown", this.#handleMouseMoveDown.bind(this))

        this.canvas.addEventListener("mousemove", this.#handleMouseMove.bind(this));
        // prevent defult behaviour when you right click
        this.canvas.addEventListener("contextmenu", (evt) => evt.preventDefault())
        this.canvas.addEventListener("mouseup", () => this.dragging == true)

    }

    #handleMouseMove(evt) {
        this.mouse = new Point(evt.offsetX, evt.offsetY);
        this.hover = getNearestPoint(this.mouse, this.graph.points, 10)
        if (this.dragging == true) {
            // our selected point will come from our mouse location
            this.selected.x = this.mouse.x;
            this.selected.y = this.mouse.y;
        }

    }

    #handleMouseMoveDown(evt) {
        if (evt.button == 2) { // right click
            if (this.selected) {
                this.selected = null;
            } else if (this.hover) {
                this.#removePoint(this.hover);
            }
        }


        if (evt.button == 0) {//left click
            // const mouse = new Point(evt.offsetX, evt.offsetY); // gets the location of the mouse

            if (this.hover) {
                this.#selected(this.hover);
                this.dragging = true;
                return; // it returns an empty point if not selected
            }

            this.graph.addPoint(this.mouse);
            this.#selected(this.mouse);
            this.hover = this.mouse;
        }
    }
    #removePoint(point) {
        this.graph.removePoints(point);
        this.hover = null;
        // any point selected will be de selected
        if (this.selected == point) {
            this.selected = null;
        }
    }

    #selected(point) {
        if (this.selected) {
            // we add try add segment here to avoid clicking onthe same multiple points
            this.graph.tryAddSegment(new Segment(this.selected, point));
        }
        this.selected = point;
    }
    // #movemousedown(){

    // }
    display() {
        this.graph.draw(this.ctx);
        if (this.hover) {
            this.hover.draw(this.ctx, { fill: true })
        }
        if (this.selected) {
            const intent = this.hover ? this.hover : this.mouse // for selecting point at aintent
            // shows us we are drawing a segment on selecting points
            new Segment(this.selected, intent).draw(ctx, { dash: [3, 3] }) // 3 pixel of lines and 3 pixel of space
            this.selected.draw(this.ctx, { outline: true })
        }
    }
}
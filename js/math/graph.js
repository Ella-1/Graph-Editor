class Graph {
    constructor(points = [], segements = []) {
        this.points = points;
        this.segments = segements
    }

    addSegment(seg) {
        this.segments.push(seg);
    }

    removeSegment(seg) {
        // splice removes an element at agiven index and we are removig only one
        this.segments.splice(this.segments.indexOf(seg), 1);
    }

    containsSegment(seg) {
        return this.segments.find((s) => s.equals(seg));
    }

    tryAddSegment(seg) {
        if (!this.containsSegment(seg) && !seg.p1.equals(seg.p2)) {
            this.addSegment(seg);
            return true;
        }
        return false
    }


    addPoint(point) {
        this.points.push(point)
    }

    removePoints(point) {
        // add functionality to remove not just only points but including segments
        const segs = this.getSegmentWithPoints(point);
        for (const seg of segs) {
            this.removeSegment(seg);
        }
        return this.points.splice(this.points.indexOf(point), 1)
    }

    getSegmentWithPoints(point) {
        const segs = [];
        for (const seg of this.segments) {
            if (seg.includes(point)) {
                segs.push(seg); // push the segment to a point if it exists
            }
        }
        return segs;
    }
    // checks if a point exists
    containsPoint(point) {
        return this.points.find((p) => p.equals(point));
    }

    dispose() {
        this.points.length = 0;
        this.segments.length = 0;
    }
    draw(ctx) {
        for (const seg of this.segments) {
            seg.draw(ctx);
        }

        for (const point of this.points) {
            point.draw(ctx)
        }
    }
}
function getNearestPoint(loc, points, threshold = Number.MAX_SAFE_INTEGER) {
    let minDist = Number.MAX_SAFE_INTEGER; // look for the minimum distance from our locaTION TO ALL THE POINTS
    let nearest = null;
    // looping throught the points 
    for (const point of points) {
        const dist = distance(point, loc); //calculate the distance we have as point and the location we have as a paramater
        if (dist < minDist && dist < threshold) {
            minDist = dist;
            nearest = point;
        }

    }
    return nearest
}

// using pythogrous theorem to return distance
function distance(p1, p2) {
    return Math.hypot(p1.x - p2.x, p1.y - p2.x)
}
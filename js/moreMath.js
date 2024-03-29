function toRad(deg) {
    return deg*Math.PI/180;
}

function toDeg(rad) {
    return rad*180/Math.PI;
}

function rngNum(interval) {
	interval *= Math.random();
	return Math.floor(interval);
}

function distancePoints(x1, y1, x2, y2) {
	const d = (((((x1-x2)**2)+((y1-y2)**2))**0.5))
	return d;
}
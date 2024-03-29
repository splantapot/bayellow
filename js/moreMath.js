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
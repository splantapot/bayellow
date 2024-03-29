class Shot {
	constructor(origin, size, speed, dir) {
		this.screen = origin.screen;
		this.color = origin.color;
		this.size = size;
		this.speed = speed;
		
		this.dir = dir;
		
		this.position = /*{
			x: (origin.position.x)
			y:origin.position.y
		}*/
		
		origin.position
		
	}
	
	update() {
		
	}
	
	draw() {
		this.screen.ctx.beginPath();
		this.screen.ctx.fillStyle = this.isLive? this.color : this.deathColor;
		this.screen.ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
		this.screen.ctx.fill();
		this.screen.ctx.closePath();
	}
}
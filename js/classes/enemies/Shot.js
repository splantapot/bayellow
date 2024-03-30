class Shot {
	constructor(origin) {
		this.screen = origin.screen;
		this.color = origin.color;
		this.size = Math.round(origin.size/2);
		this.speed = {
			x: 0,
			y: 0
		}
		this.position = origin.position;
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
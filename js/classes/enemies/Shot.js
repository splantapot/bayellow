class Shot {
	constructor(origin) {
	
		this.color = origin.color;
		this.screen = origin.screen;
		this.position = origin.position;
		this.size = Math.round(origin.size/2);
		this.maxSpeed = origin.maxSpeed;
		
		const posY = (origin.target.position.y-origin.position.y);
		const posX = (origin.target.position.x-origin.position.x);
		let dir = Math.abs(posX)>Math.abs(posY)? 3*Math.sign(posX) : 2*Math.sign(posY);
		dir = Math.abs(dir)+Math.sign(dir);
		this.speed = {
			x: ((dir+1)%2)*this.maxSpeed,
			y: (dir%2)*this.maxSpeed,
		}
		
	}
	
	update() {
		/*this.position.x += this.speed.x;
		this.position.y += this.speed.y*/
	}
	
	draw() {
		this.screen.ctx.beginPath();
		this.screen.ctx.fillStyle = this.color
		this.screen.ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
		this.screen.ctx.fill();
		this.screen.ctx.closePath();
	}
}
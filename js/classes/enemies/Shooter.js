class Shooter extends Runner {
	constructor(main) {
		super(main);
		//shot: {cooldown:1000, draw:200, time:0, shots:[], max:3, can:true}
		this.shot = main.shot;
		this.shot.originalSpeed = main.maxSpeed;
	}
	
	runShot() {
		if (this.shot.time > this.shot.cooldown+this.shot.draw) {
			console.log('Pow');
			this.shot.time = 0;
			this.maxSpeed = this.shot.originalSpeed;
			this.shot.shots.push(new Shot(this));
		} else {
			this.maxSpeed = 0
			this.direction = 0;
		}
	}
	
	search(time) {
		super.search(time);
		
		//Shot
		this.shot.time += time;
		this.shot.can = (this.shot.time>this.shot.cooldown) && (this.shot.shots.length < this.shot.max);
			
		let pos = 0, posX = 0, posY = 0;
		pos = distancePoints(this.position.x, this.position.y, this.target.position.x, this.target.position.y);
		posY = this.target.position.y-this.position.y;
		posX = this.target.position.x-this.position.x;
			
		if (this.shot.can) {
			this.runShot();
		}
	}
	
	update() {
		super.update();
		
		if (this.shot.shots.length > 0) {
			this.shot.shots.forEach((s) => {
				s.update();
			});
		}
	}
	
	draw() {
		super.draw();
		
		if (this.shot.shots.length > 0) {
			this.shot.shots.forEach((s) => {
				s.draw();
			});
		}
	}
}
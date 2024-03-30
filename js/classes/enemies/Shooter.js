class Shooter extends Runner {
	constructor(main) {
		super(main);
		//shot: {cooldown:1000, draw:200, shots:[], max:3}
		this.shot = main.shot;
		this.shot.originalSpeed = main.maxSpeed;
		this.shot.can = true;
		this.shot.time = 0;
		this.shot.hasStarted = false;
	}
	
	runShot() {
		this.maxSpeed = 0
		this.direction = 0;
		this.shot.hasStarted = true;
		if (this.shot.time > this.shot.cooldown+this.shot.draw) {
			console.log('Pow');
			this.shot.time = 0;
			this.maxSpeed = this.shot.originalSpeed;
			//this.shot.shots[this.shot.shots.length] = new Shot(JSON.parse(JSON.stringify(this)));
			this.shot.hasStarted = false;
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
			
		if (this.shot.can && ((Math.abs(posX) < this.size*2) || (Math.abs(posY) < this.size*2) || this.shot.hasStarted)) {
			this.runShot();
		}
		
		if (this.shot.time > this.shot.cooldown+this.shot.draw) {
			this.shot.time = 0;
		}
	}
	
	update() {
		super.update();
		
		if (this.shot.shots.length > 0) {
			for (const s of this.shot.shots) {
				s.update();
				console.log(s)
			}
		}
	}
	
	draw() {
		super.draw();
		
		if (this.shot.shots.length > 0) {
			for (const s of this.shot.shots) {
				s.draw();
			}
		}
	}
}
class Shooter extends Runner {
	constructor(main) {
		super(main);
		//shot: {cooldown:1000, time:0, shots:[], max:3, can:true}
		this.shot = main.shot;
	}
	
	runShot() {
		//console.log('Pow');
		this.shot.time = 0;
		const posX = this.position.x-this.target.position.x;
		const posY = this.position.y-this.target.position.y;
		this.shot.shots.push(new Shot(this, Math.round(this.size/2), this.maxSpeed.x, toDeg(Math.atan(posY/posX))))
		console.log(this.shot.shots)
		console.log(this.shot.shots.length)
	}
	
	search(time) {
		this.selectTarget();
		if (this.target != undefined && !this.target.isLive) {
			this.allTargets.splice(this.allTargets.indexOf(this.target), 1);
			this.selectTarget();
		}
		
		if (this.target == undefined || !this.isLive) {
			this.target = this;
			this.direction = 0;
			this.kill();
		} else {
			this.step.now += this.step.gain;
		
			this.delay = this.delay <= 1100? this.delay+time:0;
			
			const dX = Math.abs(this.position.x-this.target.position.x);
			const dY = Math.abs(this.position.y-this.target.position.y);

			const doReverse = (distancePoints(this.position.x, this.position.y, this.target.position.x, this.target.position.y)) <= 300
			const isLeft = (this.position.x > this.target.position.x);
			const isUp = (this.position.y > this.target.position.y);
			
			//Move until stay close
			if (dX-dY>this.maxSpeed.x*2 && !doReverse) {
				this.direction = 4-(Number(isLeft)*2);
			} else if (dY-dX>this.maxSpeed.x*2 && !doReverse) {
				this.direction = 3-(Number(isUp)*2);
			} else {
				this.direction = 0;
			}
			
			if (!this.direction) {
				this.step.now = 0;
				this.step.gain = 1;
			}
			
			if (Math.abs(this.step.now) > (this.step.states-1)) {
				this.step.gain *= -1;
			}
			
			this.target.collided(this);
			this.update();
			
			//Shot
			this.shot.time += time;
			this.shot.can = (this.shot.time>this.shot.cooldown) && (this.shot.shots.length < this.shot.max);
			
			if (this.shot.can) {
				this.runShot();
			}
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
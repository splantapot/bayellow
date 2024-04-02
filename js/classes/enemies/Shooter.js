class Shooter extends Runner {
	constructor(main) {
		super(main);
		//shot: {cooldown:1000, draw:200, max:3}
		
		this.shot = main.shot;
		this.shot.originalSpeed = main.maxSpeed;
		this.shot.shots = [];
		this.shot.can = true;
		this.shot.time = main.shot.cooldown;
		this.shot.drawTime = 0;
	}
	
	search(time) {
		super.search(time);
		
		this.runShot(time);	//Shooting
	}
	
	//Shooting
	runShot(time) {
		this.shot.can = (this.shot.shots.length < this.shot.max) && (this.shot.time >= this.shot.cooldown);
			
		let pos = 0, posX = 0, posY = 0;
		pos = distancePoints(this.position.x, this.position.y, this.target.position.x, this.target.position.y);
		posY = Math.abs(this.target.position.y-this.position.y);
		posX = Math.abs(this.target.position.x-this.position.x);
		
		if (this.shot.can && ((Math.abs(posX)<this.size*1.5) || (Math.abs(posY)<this.size*1.5) || this.shot.drawTime>0)) {
			
			if (this.direction != 0) {
				this.shot.dir = this.direction;
			}
			
			if (this.shot.drawTime > this.shot.draw) {
				console.log('Pow');
				this.shot.time = 0;
				this.shot.drawTime = 0;
				this.maxSpeed = this.shot.originalSpeed;
				
				this.shot.shots.push({x:this.position.x, y:this.position.y, speed:this.maxSpeed*2, dir:this.shot.dir, size:this.size/2, max:rngNum(2)+3})
			} else {
				this.maxSpeed = this.direction = 0;
				this.shot.drawTime += time;
			}
		} else {
			this.shot.time += time;
		}
	}
	
	update() {
		super.update();
		
		if (this.shot.shots.length > 0) {
			this.shot.shots.forEach((b) => {
				//Common shot
				/* b.isLive = this.isLive;
				b.x += b.dir%2==0 && b.dir>0? b.dir>3? b.speed: -b.speed: 0;
				b.y += b.dir%2==1? b.dir>2? b.speed: -b.speed: 0;
				
				b.speed += b.speed < this.maxSpeed*5? 0.7 : 0;
				
				this.allTargets.forEach((tg) => {
					tg.collided(b, true);
				});
				
				if (b.x+b.size < 0 || b.x-b.size > this.screen.x || b.y+b.size < 0 || b.y-b.size > this.screen.y) {
					this.shot.shots.splice(this.shot.shots.indexOf(b), 1);
				}*/
				
				let r = (rngNum(10)-rngNum(10))/16
				b.isLive = this.isLive;
				b.x += b.dir%2==0 && b.dir>0? b.dir>3? b.speed: -b.speed: r;
				b.y += b.dir%2==1? b.dir>2? b.speed: -b.speed: r;
				
				b.speed += b.speed < this.maxSpeed*b.max ? 0.65 : 0;
				
				this.allTargets.forEach((tg) => {
					tg.collided(b, true);
				});
				
				if (b.x+b.size < 0 || b.x-b.size > this.screen.x || b.y+b.size < 0 || b.y-b.size > this.screen.y) {
					this.shot.shots.splice(this.shot.shots.indexOf(b), 1);
				}
			});
		}
	}
	
	draw() {
		if (this.shot.shots.length > 0 && this.isLive) {
			this.shot.shots.forEach((b) => {
				this.screen.ctx.beginPath();		
				this.screen.ctx.fillStyle = this.color;
				this.screen.ctx.arc(b.x, b.y, b.size, 0, Math.PI*2);
				this.screen.ctx.fill();
				this.screen.ctx.closePath();
			});
		}
		
		super.draw();
	}
}
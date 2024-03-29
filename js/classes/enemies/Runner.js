class Runner extends Player {
	constructor(main) {
		super(main);
		delete this.controls;
		this.allTargets = main.target;
		this.target = this.allTargets[rngNum(this.allTargets.length)]
		this.delay = 0;
	}
	
	search(time) {
		this.target = this.allTargets[rngNum(this.allTargets.length)]
		if (this.target != undefined && this.target.isCollided) {
			this.allTargets.splice(this.allTargets.indexOf(this.target), 1);
			this.target = this.allTargets[rngNum(this.allTargets.length)]
		}
		
		if (this.target == undefined) {
			this.target = this;
			this.direction = 0;
		} else {
			this.step.now += this.step.gain;
		
			this.delay = this.delay <= 1100? this.delay+time:0;
			const canChangeDir = this.delay >= 800;
			
			const dX = Math.abs(this.position.x-this.target.position.x);
			const dY = Math.abs(this.position.y-this.target.position.y);

			const isLeft = (this.position.x > this.target.position.x);
			const isUp = (this.position.y > this.target.position.y);
			
			if (canChangeDir) {
				if (dX > dY) {
					this.direction = 4-(Number(isLeft)*2);
				} else if (dY < dX) {
					this.direction = 3-(Number(isUp)*2);
				} else {
					this.direction = rngNum(2)? 4-(Number(isLeft)*2) : 3-(Number(isUp)*2);
				}
			}
			
			if (!this.direction) {
				this.step.now = 0;
				this.step.gain = 1;
			}
			
			if (Math.abs(this.step.now) > (this.step.states-1)) {
				this.step.gain *= -1;
			}
		}
		
		this.collided(this.target);
		this.update();
	}
	
	targetLine(deving) {
		if (deving) {
			let pos = 0;
			this.screen.ctx.font = "15px Arial";
			this.screen.ctx.textAlign = "center";
			//Em linha reta
			this.screen.ctx.beginPath();
			this.screen.ctx.moveTo(this.position.x, this.position.y);
			this.screen.ctx.strokeStyle = this.screen.ctx.fillStyle = 'rgb(255,100,255)';
			this.screen.ctx.lineTo(this.target.position.x, this.target.position.y);
			this.screen.ctx.stroke();
			this.screen.ctx.closePath();
			pos = (((((this.position.x-this.target.position.x)**2)+((this.position.y-this.target.position.y)**2))**0.5));
			pos = Math.round(pos)*Math.sign(pos);
			this.screen.ctx.fillText(
				`${(pos)}`, 
				this.position.x-(this.size*Math.sign(this.position.x-this.size-this.target.position.x-this.target.size)),
				this.position.y-((this.size+15)*Math.sign(this.position.y-this.size-this.target.position.y-this.target.size))
			);
			//Para y
			this.screen.ctx.beginPath();
			this.screen.ctx.strokeStyle = this.screen.ctx.fillStyle = 'rgb(255,0,0)';
			this.screen.ctx.moveTo(this.target.position.x, this.target.position.y);
			this.screen.ctx.lineTo(this.target.position.x, this.position.y);
			this.screen.ctx.stroke();
			this.screen.ctx.closePath();
			pos = this.position.y-this.target.position.y;
			this.screen.ctx.fillText(`${Math.abs(pos)}`, this.target.position.x-this.size, this.position.y-(this.size*Math.sign(pos)));
			//Para x
			this.screen.ctx.beginPath();
			this.screen.ctx.strokeStyle = this.screen.ctx.fillStyle = 'rgb(0,150,255)';
			this.screen.ctx.moveTo(this.target.position.x, this.position.y);
			this.screen.ctx.lineTo(this.position.x, this.position.y);
			this.screen.ctx.stroke();
			this.screen.ctx.closePath();
			pos = this.position.x-this.target.position.x;
			this.screen.ctx.fillText(`${Math.abs(pos)}`, this.position.x-((this.size+10)*Math.sign(pos)), this.position.y+this.size)
		}
	}
}
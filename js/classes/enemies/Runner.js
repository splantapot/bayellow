class Runner extends Player {
	constructor(main) {
		super(main);
		delete this.controls;
		this.allTargets = main.target;
		this.target = this.allTargets[rngNum(this.allTargets.length)]
		this.delay = 0;
	}
	
	selectTarget() {
		let distance = Infinity;
		let nID = 0;
		this.allTargets.forEach((tg, tgIx) => {
			const nD = distancePoints(this.position.x, this.position.y, tg.position.x, tg.position.y)
			if (distance >= nD) {
				distance = nD;
				nID = tgIx;
			}
		});
		this.target = this.allTargets[nID];
	}
	
	kill() {
		this.isLive = false;
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
			
			this.target.collided(this);
			this.update();
		}
	}
	
	targetLine(deving) {
		if (deving && this.isLive) {
			let pos = 0, posX = 0, posY = 0, ang = 0;
			this.screen.ctx.font = "15px Arial";
			this.screen.ctx.textAlign = "center";
			//Em linha reta
			this.screen.ctx.beginPath();
			this.screen.ctx.moveTo(this.position.x, this.position.y);
			this.screen.ctx.strokeStyle = this.screen.ctx.fillStyle = 'rgb(255,100,255)';
			this.screen.ctx.lineTo(this.target.position.x, this.target.position.y);
			this.screen.ctx.stroke();
			this.screen.ctx.closePath();
			pos = distancePoints(this.position.x, this.position.y, this.target.position.x, this.target.position.y);
			pos = Math.round(pos);
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
			posY = this.position.y-this.target.position.y;
			this.screen.ctx.fillText(`${Math.abs(posY)}`, this.target.position.x-this.size, this.position.y-(this.size*Math.sign(posY)));
			//Para x
			this.screen.ctx.beginPath();
			this.screen.ctx.strokeStyle = this.screen.ctx.fillStyle = 'rgb(0,150,255)';
			this.screen.ctx.moveTo(this.target.position.x, this.position.y);
			this.screen.ctx.lineTo(this.position.x, this.position.y);
			this.screen.ctx.stroke();
			this.screen.ctx.closePath();
			posX = this.position.x-this.target.position.x;
			this.screen.ctx.fillText(`${Math.abs(posX)}`, this.position.x-((this.size+10)*Math.sign(posX)), this.position.y+this.size);
			//Para ang
			this.screen.ctx.beginPath();
			this.screen.ctx.strokeStyle = this.screen.ctx.fillStyle = 'rgb(0,250,0)'
			ang = Math.atan(posY/posX);
			this.screen.ctx.arc(this.position.x, this.position.y, (Number(this.size<Math.abs(posX))*this.size)+15,
				(Math.sign(posX)*Math.PI*0.5)+(Math.PI*0.5),
				(Math.sign(posX)*Math.PI*0.5)+(Math.PI*0.5)+ang,
				(ang>0? false: true)
			);
			this.screen.ctx.stroke();
			this.screen.ctx.closePath();
			this.screen.ctx.fillText(`${Math.round(toDeg(ang))}`, this.position.x-((this.size*3)*Math.sign(posX)), this.position.y-(this.size*Math.sign(posY)))
		}
	}
}
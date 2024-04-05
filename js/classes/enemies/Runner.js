class Runner extends Player {
	constructor(main) {
		super(main);
		delete this.controls;
		//target
		//delay:{now:0,max:0}
		this.allTargets = main.target;
		this.target = this.allTargets[rngNum(this.allTargets.length)]
		this.delay = main.delay;
		this.delay.now = Infinity;
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
	
	search(time) {
		//Select target
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
			//Movement
			this.delay.now += time;
			this.step.now += this.step.gain;
			
			let pos = 0, posX = 0, posY = 0;
			pos = distancePoints(this.position.x, this.position.y, this.target.position.x, this.target.position.y);
			posY = this.target.position.y-this.position.y;
			posX = this.target.position.x-this.position.x;
			
			if (this.delay.now > this.delay.max*0.026*this.maxSpeed) {
				if (Math.abs(posX) > Math.abs(posY)) {
					this.direction = posX<0? 2 : 4;
				} else if (Math.abs(posY) > Math.abs(posX)) {
					this.direction = posY<0? 1 : 3;
				} else {
					const toAdd = [posX<0? 2: 4, posY<0? 1: 3]
					this.direction = toAdd[rngNum(2)];
				}
				this.delay.now = 0;
			}
			
			
			if (!this.direction) {
				this.step.now = 0;
				this.step.gain = 1;
			}
			
			if (Math.abs(this.step.now) > (this.step.states-1)) {
				this.step.gain *= -1;
			}
			
			//Player Check collision
			
			this.allTargets.forEach((tgt) => {
				tgt.collided(this)
			});
			super.update();
		}
	}
	
	draw(devMode) {
		super.draw();
		
		this.targetLine(devMode);
	}
	
	targetLine(deving) {
		if (this.isLive) {
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
				this.target.position.x-this.target.size-15,
				this.target.position.y+this.target.size
			);
			//Para y
			this.screen.ctx.beginPath();
			this.screen.ctx.strokeStyle = this.screen.ctx.fillStyle = 'rgb(255,0,0)';
			this.screen.ctx.moveTo(this.target.position.x, this.target.position.y);
			this.screen.ctx.lineTo(this.target.position.x, this.position.y);
			this.screen.ctx.stroke();
			this.screen.ctx.closePath();
			posY = /*Math.abs*/(this.position.y-this.target.position.y);
			this.screen.ctx.fillText(`${(posY)}`, this.target.position.x-this.size, this.position.y-this.size);
			//Para x
			this.screen.ctx.beginPath();
			this.screen.ctx.strokeStyle = this.screen.ctx.fillStyle = 'rgb(0,150,255)';
			this.screen.ctx.moveTo(this.target.position.x, this.position.y);
			this.screen.ctx.lineTo(this.position.x, this.position.y);
			this.screen.ctx.stroke();
			this.screen.ctx.closePath();
			posX = /*Math.abs*/(this.position.x-this.target.position.x);
			this.screen.ctx.fillText(`${(posX)}`, this.target.position.x, this.position.y+this.size);
		}
	}
}
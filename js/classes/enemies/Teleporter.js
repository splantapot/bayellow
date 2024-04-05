class Teleporter extends Runner {
	constructor(main) {
		super(main);
		delete this.maxSpeed;
		//teleport: {range: 16 /*how many times multiply SIZE*/, timeToTp:500 ,cooldown:1000 /*time in ms*/}
		
		this.teleport = main.teleport;
		this.teleport.cooldownTime = main.teleport.cooldown;
		this.teleport.time = 0;
		this.teleport.actualTarget = false;
		this.teleport.newPos = {};
	}
	
	//Teleportar para algum alvo dentro dos alvos do localName
	//Só pode teleportar se o tempo for maior q o cooldown
	//Teleporta para a posição detectada do jogador
	//Animação de teleporte
	
	//Animação
	// vF - tF
	// v0 - t0
	// vF = tF*v0/t0
	runTeleport(time){
		if (this.isLive) {
			if (!this.teleport.actualTarget) {
				let newTargetArray = [], newTarget = false;
				this.allTargets.forEach((tgt) => {
					if (tgt.collided({position: this.position, size: this.size*this.teleport.range}, false, false)) {
						newTargetArray.push(tgt)
					}
				});
				if (newTargetArray.length >= 1) {
					//Está no range, set alvo
					newTarget = newTargetArray[rngNum(newTargetArray.length)];
					this.teleport.actualTarget = newTarget;
				}
			}
			
			if (this.teleport.actualTarget && !this.teleport.actualTarget.collided({position: this.position, size: this.size*this.teleport.range}, false, false)) {
				//unset alvo, pq saiu
				this.teleport.actualTarget = false;
				this.teleport.time = 0;
			} else if ((this.teleport.actualTarget || this.teleport.time>this.teleport.timeToTp*0.7) && this.teleport.cooldownTime>this.teleport.cooldown) {
				this.teleport.time += time;
				if(this.teleport.time > this.teleport.timeToTp) {
					//console.log('Time to tp')
					this.teleport.actualTarget = false;
					this.teleport.time = 0;
					this.position = this.teleport.newPos;
					this.teleport.cooldownTime = 1;
				} else if(this.teleport.time > this.teleport.timeToTp*0.7) {
					//console.log('Fix position');
					const nX = this.teleport.actualTarget.position.x;
					const nY = this.teleport.actualTarget.position.y;
					this.teleport.newPos = {
						x: nX,
						y: nY
					};
				}
			}
			
		}
		this.teleport.cooldownTime+=time;
	}
	
	search(time) {
		this.runTeleport(time);
		
		if (this.teleport.cooldownTime > this.teleport.cooldown**0.9 && this.isLive) {
			this.allTargets.forEach((tgt) => {
				tgt.collided(this);
			});
		}
	}
	
	update() {
		
	}
	
	draw(devMode) {
		super.draw();
		
		if (this.isLive) {
			let alpha = (this.teleport.cooldown<=this.teleport.cooldownTime)? 0 : 1;
			alpha *= (this.teleport.cooldownTime/this.teleport.cooldown)/2
			alpha = (this.teleport.cooldown>this.teleport.cooldownTime)? (alpha > 0.5)? 0.5 : 0.5-alpha : alpha;
			
			this.screen.ctx.fillStyle = `rgb(255,255,255,${(alpha)})`;
			this.screen.ctx.beginPath();		
			this.screen.ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
			this.screen.ctx.fill();
			this.screen.ctx.closePath();
		}
		
		if (this.isLive) {
			this.screen.ctx.strokeStyle = this.screen.ctx.fillStyle = this.color;
			this.screen.ctx.beginPath();
			this.screen.ctx.arc(this.position.x, this.position.y, this.teleport.range*this.size, 0, Math.PI*2);
			this.screen.ctx.stroke();
			this.screen.ctx.fillText(`${this.teleport.time}`, this.position.x, this.position.y-this.size-15)
			this.screen.ctx.closePath()
		}
	}
}

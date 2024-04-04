class Teleporter extends Runner {
	constructor(main) {
		super(main);
		delete this.maxSpeed;
		//teleport: {range: 16, cooldown:5000}
		
		this.teleport = main.teleport;
		this.teleport.time = 0;
		this.teleport.actualTarget = false;
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
			} else if (this.teleport.actualTarget) {
				this.teleport.time += time;
				
			}
		}
		
	}
	
	search(time) {
		this.runTeleport(time);
	}
	
	update() {
		
	}
	
	draw() {
		
		if (this.isLive) {
			this.screen.ctx.font = "15px Arial";
			this.screen.ctx.textAlign = "center";
			this.screen.ctx.fillStyle = this.color;
            this.screen.ctx.fillStyle = this.screen.ctx.fillStyle+'aa';
            this.screen.ctx.strokeStyle = this.screen.ctx.fillStyle;
			this.screen.ctx.beginPath();		
			this.screen.ctx.arc(this.position.x, this.position.y, this.teleport.range*this.size, 0, Math.PI*2);
			this.screen.ctx.stroke();
			this.screen.ctx.closePath();
			
			this.screen.ctx.fillText(`${this.teleport.time}`, this.position.x,this.position.y-this.size-18)
		}
		
		super.draw();
	}
}

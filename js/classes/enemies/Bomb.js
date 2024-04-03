class Bomb extends Runner {
    constructor(main) {
        super(main);
        //explosion: {range:5, flash:800, end: 5000}

        this.explosion = main.explosion;
        this.explosion.time = 0;
		this.explosion.inicialFlash = main.explosion.flash;
		this.explosion.originalSpeed = main.maxSpeed;
		this.explosion.originalDelay = main.delay.max;
		this.explosion.boostRange = 1;
    }

	runBomb(time) {
		if (this.isLive) {
			let newTargetArray = [], newTarget = false;
			this.explosion.boostRange = this.explosion.time>0? this.explosion.range/2.8 : 1;
			this.allTargets.forEach((tgt) => {
				if (tgt.collided({position: this.position, size: this.size*this.explosion.range*this.explosion.boostRange}, false, false)) {
					newTargetArray.push(tgt)
				}
			});
			if (newTargetArray.length >= 1) {
				newTarget = newTargetArray[rngNum(newTargetArray.length)];
			}
			if (newTarget != false) {
				this.explosion.time += time;
				this.explosion.flash -= time*312/this.explosion.end;
				
				this.maxSpeed = Math.round(
					this.explosion.originalSpeed * (
					distancePoints(newTarget.position.x, newTarget.position.y, this.position.x, this.position.y)
					/this.size/this.explosion.range/2.3)
				);
				
				this.delay.max = this.explosion.originalDelay * this.explosion.originalSpeed / this.maxSpeed;
				//delayInicial (dI) - veloInicial (vI)
				//delayFinal (dF) - veloFinal (vF)
				//dF = dI * vI / vF
				
				if (this.explosion.time >= this.explosion.end) {
					
					this.allTargets.forEach((tgt) => {
						tgt.collided({position: this.position, size: this.size*this.explosion.range});
					});
					this.kill();
				}
				newTarget.collided(this)
			} else if (this.explosion.time > 0) {
				this.explosion.time = 0;
				this.explosion.flash = this.explosion.inicialFlash;
				this.maxSpeed = this.explosion.originalSpeed;
				this.delay.max = this.explosion.originalDelay;
			}
		}
	}

    search(time) {
		this.runBomb(time);
        super.search(time, !this.target);
    }

    update() {
        super.update();
    }

    draw() {
		
		if (this.isLive && (this.explosion.time > 0 && this.explosion.time%this.explosion.flash<100)) {
			this.screen.ctx.fillStyle = this.color;
			this.screen.ctx.fillStyle = `rgba(255,0,0,${this.explosion.time/this.explosion.end/5})`;
			this.screen.ctx.strokeStyle = this.screen.ctx.fillStyle;
			this.screen.ctx.beginPath();		
			this.screen.ctx.arc(this.position.x, this.position.y, this.explosion.range*this.size, 0, Math.PI*2);
			this.screen.ctx.fill();
			this.screen.ctx.closePath();
		}
		
        super.draw();

        if (this.isLive) {
			if (this.explosion.time > 0 && this.explosion.time%this.explosion.flash<100) {
                this.screen.ctx.fillStyle = 'rgba(255,255,255,0.3 )';
                this.screen.ctx.beginPath();		
                this.screen.ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
                this.screen.ctx.fill();
                this.screen.ctx.closePath();
				
				this.rightArm.draw(this.screen.ctx.fillStyle);
				this.leftArm.draw(this.screen.ctx.fillStyle);
            }
			
			
			
			//this.screen.ctx.fillStyle = this.color;
            //this.screen.ctx.fillStyle = this.screen.ctx.fillStyle+'aa';
            //this.screen.ctx.strokeStyle = this.screen.ctx.fillStyle;
			//this.screen.ctx.beginPath();		
			//this.screen.ctx.arc(this.position.x, this.position.y, this.explosion.range*this.size*this.explosion.boostRange, 0, Math.PI*2);
			//this.screen.ctx.stroke();
			//this.screen.ctx.closePath();
		}
    }
}
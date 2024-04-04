class Teleporter extends Runner {
	constructor(main) {
		super(main);
		delete this.maxSpeed;
		//teleport: {range: 16, cooldown:5000}
		
		this.teleport = main.teleport;
	}
	
	runTeleport(time){
		//Teleportar para algum alvo dentro dos alvos do localName
		//Só pode teleportar se o tempo for maior q o cooldown
		//Teleporta para a posição detectada do jogador
		//Animação de teleporte
	}
	
	search(time) {
		this.runTeleport();
	}
	
	update() {
		
	}
	
	draw() {
		
		if (this.isLive) {
			this.screen.ctx.fillStyle = this.color;
            this.screen.ctx.fillStyle = this.screen.ctx.fillStyle+'aa';
            this.screen.ctx.strokeStyle = this.screen.ctx.fillStyle;
			this.screen.ctx.beginPath();		
			this.screen.ctx.arc(this.position.x, this.position.y, this.teleport.range*this.size, 0, Math.PI*2);
			this.screen.ctx.stroke();
			this.screen.ctx.closePath();
		}
		
		super.draw();
	}
}

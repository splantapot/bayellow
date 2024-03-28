class Runner extends Player {
	constructor(main) {
		super(main);
		delete this.controls;
		this.target = main.target;
		console.log(this);
	}
	
	targetLine() {
		this.screen.ctx.beginPath();
		this.screen.ctx.strokeStyle = 'rgb(100,255,100)';
		this.screen.ctx.moveTo(this.position.x, this.position.y);
		this.screen.ctx.lineTo(this.target.position.x, this.target.position.y);
		this.screen.ctx.stroke();
		this.screen.ctx.closePath();
		
	}
}
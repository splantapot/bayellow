class Bomb extends Runner {
    constructor(main) {
        super(main);
        //explosion: {range:5, flash:100, end: 2000}

        this.explosion = main.explosion;
        this.explosion.time = 0;
    }

    search() {
        super.search();
    }

    update() {
        super.update();
    }

    draw() {
        super.draw();

        if (this.isLive) {
            this.screen.ctx.fillStyle = this.color;
            this.screen.ctx.fillStyle = this.screen.ctx.fillStyle+'aa';
            this.screen.ctx.strokeStyle = this.screen.ctx.fillStyle;
			this.screen.ctx.beginPath();		
			this.screen.ctx.arc(this.position.x, this.position.y, this.explosion.range*this.size, 0, Math.PI*2);
			this.screen.ctx.stroke();
			this.screen.ctx.closePath();

            if (this.explosion.time > 0) {
                this.screen.ctx.fillStyle = 'rgba(255,255,255,0.3 )';
                this.screen.ctx.beginPath();		
                this.screen.ctx.arc(this.position.x, this.position.y, this.explosion.range*this.size, 0, Math.PI*2);
                this.screen.ctx.fill();
                this.screen.ctx.closePath();
            }

		}
    }
}
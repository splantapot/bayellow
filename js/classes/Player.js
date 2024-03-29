class Player {
    constructor(origin = {
			color:'gold',
			deathColor:'goldenrod',
			size:20,
			position:{x:0,y:0}, 
            speed:{x:0, y:0},
			maxSpeed:{x:5, y:5},
            direction:0, //Stop 0, up 1, left 2, down 3, right 4
            controls:[], //Up, Left, Down, Right, Dash
            screen:{x:0, y:0, ctx: esc}
		}){
			
		this.screen = origin.screen;
		
        this.color = origin.color;
		this.deathColor = origin.deathColor;
        this.size = origin.size;
        this.position = origin.position;
        this.speed = origin.speed;
		this.maxSpeed = origin.maxSpeed;
        this.direction = origin.direction;
        this.controls = origin.controls;

        this.rightArm = new Arm(this.color, this.size*0.3, 1, this.screen);
        this.leftArm = new Arm(this.color, this.size*0.3, -1, this.screen);

        this.step = {
            states: 8,
            gain: 1,
            now: 0
        }

        this.isCollided = false;
        this.offScreen = false;
    }
	
	collided(tgt) {
		const distance = (((((this.position.x-tgt.position.x)**2)+((this.position.y-tgt.position.y)**2))**0.5));
		const check = this.isCollided = (distance < this.size+tgt.size);
		tgt.isCollided = check || (tgt.isCollided);
		return check;
	}

    control(playerIn = []) {
        this.step.now += this.step.gain;
		if (!this.isCollided) {
			if (playerIn.includes(this.controls[0])) {
				//Up
				this.direction = 1;
			} else if (playerIn.includes(this.controls[1])) {
				//Left
				this.direction = 2;
			} else if (playerIn.includes(this.controls[2])) {
				//Down
				this.direction = 3;
			} else if (playerIn.includes(this.controls[3])) {
				//Right
				this.direction = 4;
			} else {
				//Stopped
				this.direction = 0;
				this.step.now = 0;
				this.step.gain = 1;
			}
		} else {
			//Stopped
			this.direction = 0;
			this.step.now = 0;
			this.step.gain = 1;
		}
        

        if (Math.abs(this.step.now) > (this.step.states-1)) {
            this.step.gain *= -1;
        }

		this.update();
		
		if (this.isCollided) {
			this.color = this.deathColor;
		}
    }

    update() {
        this.speed.x = 0;
        this.speed.x = this.direction%2==0 && this.direction>0? this.direction>3? this.maxSpeed.x: -this.maxSpeed.x: 0;

        this.speed.y = 0;
        this.speed.y = this.direction%2==1? this.direction>2? this.maxSpeed.y: -this.maxSpeed.y: 0;

        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        this.position.x += this.position.x<0||this.position.x>this.screen.x? this.screen.x*Math.sign((this.position.x%this.screen.x))*-1: 0;
        this.position.y += this.position.y<0||this.position.y>this.screen.y? this.screen.y*Math.sign((this.position.y%this.screen.y))*-1: 0;

        this.offScreen = (((this.position.x-this.size<0) || (this.position.x+this.size>this.screen.x)) ||
                          ((this.position.y-this.size<0) || (this.position.y+this.size>this.screen.y)))? 
        true : false;
    }
	
	draw() {
        this.screen.ctx.beginPath();
        this.screen.ctx.fillStyle = this.isCollidedd? "white" : this.color;
        this.screen.ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2);
        this.screen.ctx.fill();
        this.screen.ctx.closePath();

        if (this.direction > 0) {
            let animX = this.direction%2==0? this.step.now*1.3:0;
            let animY = this.direction%2==1? this.step.now*1.3:0;

            //Right arm
            this.rightArm.update(this.position, this.direction, animX, animY);
            this.rightArm.draw();
    
            //Left arm
            this.leftArm.update(this.position, this.direction, animX, animY);
            this.leftArm.draw();
        }
    }
}

class Arm {
    constructor(color, size, side, screen) {
        this.color = color;
        this.size = size;
        this.side = side;
        this.distance = (size**2)/1.2;
        this.position = {x:0, y:0};
        this.direction = 0;
        this.anim = {x:0, y:0};

        this.offScreen = 0;
        this.screen = screen;
    }

    update(pos, dir, animX, animY) {
        const distance = this.distance;
        this.position = {
            x:pos.x+((distance)*(dir%2)*this.side)+(this.anim.x*this.side),
            y:pos.y+((distance)*((dir+1)%2)*this.side)+(this.anim.y*this.side),
        }
        this.anim = {
            x: animX,
            y: animY
        }
        this.offScreen = (((this.position.x-this.size<0) || (this.position.x+this.size>this.screen.x)) ||
                          ((this.position.y-this.size<0) || (this.position.y+this.size>this.screen.y)))? 
        true:false;
    }

    draw() {
        this.screen.ctx.beginPath();
        this.screen.ctx.fillStyle = this.color;
        this.screen.ctx.arc(this.position.x,this.position.y,this.size, 0, Math.PI*2);
        this.screen.ctx.fill();
        this.screen.ctx.closePath();
    }
}
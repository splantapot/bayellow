//Screen setup
const canvasbox = document.getElementById("canvasBox");
const canvas = document.getElementById("canvas");
const esc = canvas.getContext("2d");
const pixelSize = 10;
const widthScreen = canvas.width = canvasbox.clientWidth-(canvasbox.clientWidth%50);
const heightScreen = canvas.height = canvasbox.clientHeight-(canvasbox.clientHeight%50);

//Devmode?
const devMode = true;

//Controller
const controller = new Controller();
let inputs;

//Player 1
const p1 = new Player({
    color:'rgb(255,255,50)',
	deathColor:'rgb(150,150,50)',
    size:20,
    position:{x:300, y:300},
    speed:{x:0, y:0},
	maxSpeed:{x:5, y:5},
    direction:0,
    controls:["w", "a", "s", "d"],
    screen:{x:widthScreen, y:heightScreen, ctx: esc}
});

//Enemies
const r1 = new Runner({
    color:'rgb(0,250,0)',
    size:20,
    position:{x:800, y:400},
    speed:{x:0, y:0},
	maxSpeed:{x:7, y:7},
    direction:0,
    screen:{x:widthScreen, y:heightScreen, ctx: esc},
	target: [p1]
});
const r2 = new Runner({
    color:'rgb(250,0,0)',
    size:20,
    position:{x:800, y:400},
    speed:{x:0, y:0},
	maxSpeed:{x:2, y:2},
    direction:0,
    screen:{x:widthScreen, y:heightScreen, ctx: esc},
	target: [p1]
});
const r3 = new Runner({
    color:'rgb(0,0,250)',
    size:20,
    position:{x:800, y:400},
    speed:{x:0, y:0},
	maxSpeed:{x:4, y:4},
    direction:0,
    screen:{x:widthScreen, y:heightScreen, ctx: esc},
	target: [p1]
});

const t = {
	s0: new Date().getTime(),
	s1: 0,
	sD: 0
}

requestAnimationFrame(fps);
function fps() {
	//Update timer
	t.s1 = new Date().getTime();
	t.sD = t.s1 - t.s0;
	t.s0 = t.s1;
	
	//ClearScreen and update inputs
    clearScreen();
    inputs = controller.getInputs();
    requestAnimationFrame(fps);
	
	//Update runner
	r1.search(t.sD);
	r1.targetLine(devMode);
	r1.draw();
	
	r2.search(t.sD);
	r2.targetLine(devMode);
	r2.draw();
	
	r3.search(t.sD);
	r3.targetLine(devMode);
	r3.draw();
	
	//Update Player
    p1.control(inputs);
    p1.draw(esc);
	
    document.getElementById('body').innerHTML = `BD:${p1.offScreen}`;
}

function clearScreen(color = "black") {
    esc.fillStyle = color;
    esc.fillRect(0, 0, widthScreen, heightScreen);

    if(devMode) {
        for(let y = 0; y*pixelSize < heightScreen; y++) {
            for(let x = 0; x*pixelSize < widthScreen; x++) {
                esc.fillStyle = (x+y)%2==0? color:'rgb(30,30,30)';
                esc.fillRect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
            }
        }
    }
}
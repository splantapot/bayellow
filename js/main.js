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

//Timer
const t = {
	sInicial: new Date().getTime(),
	sFinal: 0,
	sDif: 0,
	start: new Date().getTime(),
	now: 0
}

//Player 1
const p1 = new Player({
    color:'rgb(255,255,50)',
	deathColor:'rgb(150,150,50)',
    size:20,
    position:{x:300, y:350},
	maxSpeed:5,
    controls:["w", "a", "s", "d"],
    screen:{x:widthScreen, y:heightScreen, ctx: esc, tag:'player'}
});
const p2 = new Player({
    color:'rgb(0,255,50)',
	deathColor:'rgb(150,150,50)',
    size:20,
    position:{x:300, y:450},
	maxSpeed:5,
    controls:["8", "4", "2", "6"],
    screen:{x:widthScreen, y:heightScreen, ctx: esc, tag:'player'}
});

//Enemies
const r1 = new Runner({
    color:'rgb(0,250,0)',
    size:20,
    position:{x:900, y:400},
	maxSpeed:7,
    screen:{x:widthScreen, y:heightScreen, ctx: esc, tag:'enemy'},
	delay:{now:0,max:1000},
	target: [p1]
});
//r1.kill();
//--Shooter
const s1 = new Shooter({
    color:'rgb(0,200,200)',
    size:20,
    position:{x:900, y:400},
	maxSpeed:4,
    screen:{x:widthScreen, y:heightScreen, ctx: esc, tag:'enemy'},
	delay:{now:0,max:1000},
	target: [p1],
	shot: {cooldown:200, draw:50, max:10}
});
s1.kill();
//--Bomb
const b1 = new Bomb({
    color:'rgb(0,100,200)',
    size:20,
    position:{x:900, y:400},
	maxSpeed:5,
    screen:{x:widthScreen, y:heightScreen, ctx: esc, tag:'enemy'},
	delay:{now:0,max:1000},
	target: [p1],
	explosion: {range:5 /*how many times multiply SIZE*/, flash:500, end: 3000}
});
b1.kill();
//--Teleporter
const t1 = new Teleporter({
    color:'rgb(105,10,255)',
    size:20,
    position:{x:900, y:400},
	maxSpeed:5,
    screen:{x:widthScreen, y:heightScreen, ctx: esc, tag:'enemy'},
	delay:{now:0,max:1000},
	target: [p1],
	teleport: {range: 16 /*how many times multiply SIZE*/, cooldown:5000 /*time in ms*/}
});
//t1.kill();

requestAnimationFrame(fps);
function fps() {
	//Update timer
	t.sFinal = new Date().getTime();
	t.sDif = t.sFinal - t.sInicial;
	t.sInicial = t.sFinal;
	t.now = t.sFinal-t.start;
	
	//ClearScreen and update inputs
    clearScreen();
    inputs = controller.getInputs();
    requestAnimationFrame(fps);
	
	//Update enemies 
	r1.search(t.sDif);
	r1.targetLine(devMode);
	r1.draw();
	
	s1.search(t.sDif);
	s1.targetLine(devMode);
	s1.draw();

    b1.search(t.sDif);
	b1.targetLine(devMode);
	b1.draw();
	
	t1.search(t.sDif);
	t1.targetLine(devMode);
	t1.draw();
	
	
	//Update Player
    p1.control(inputs);
    p1.draw(esc);
	
    document.getElementById('body').innerHTML = `BD:${Math.round(s1.shot.time/100)} || ${p1.isLive}`;
    document.getElementById('timer').innerHTML = `Timer:${Math.round((t.now)/100)}`;
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
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
    color:'red',
    size:20,
    position:{x:300, y:300},
    speed:{x:0, y:0},
    direction:0,
    controls:["w", "a", "s", "d"],
    screen:{x:widthScreen, y:heightScreen, ctx: esc}
});

//Enemies
const runner = new Runner({
    color:'white',
    size:20,
    position:{x:800, y:400},
    speed:{x:0, y:0},
    direction:0,
    screen:{x:widthScreen, y:heightScreen, ctx: esc},
	target: p1
});

requestAnimationFrame(fps);
function fps() {
	//ClearScreen and update inputs
    clearScreen();
    inputs = controller.getInputs();
    requestAnimationFrame(fps);
	
	//Update runner
	runner.targetLine();
	runner.draw();
	
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
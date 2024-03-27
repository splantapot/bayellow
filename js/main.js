const canvasbox = document.getElementById("canvasBox");
const canvas = document.getElementById("canvas");
const esc = canvas.getContext("2d");

const pixelSize = 10;
const widthScreen = canvas.width = canvasbox.clientWidth-(canvasbox.clientWidth%50);
const heightScreen = canvas.height = canvasbox.clientHeight-(canvasbox.clientHeight%50);

const devMode = true;

const controller = new Controller();
let inputs;

let p1 = new Player(
    'red',
    20,
    {x:300, y:300},
    {x:0, y:0},
    0,
    ["w", "a", "s", "d"],
    {x:widthScreen, y:heightScreen}
)

function clearScreen(color = "black") {
    esc.fillStyle = color;
    esc.fillRect(0, 0, widthScreen, heightScreen);

    if(devMode) {
        for(let y = 0; y*pixelSize < heightScreen; y++) {
            for(let x = 0; x*pixelSize < widthScreen; x++) {
                esc.fillStyle = (x+y)%2==0? 'rgb(0,0,0)':'rgb(30,30,30)';
                esc.fillRect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
            }
        }
    }
}

requestAnimationFrame(fps);
function fps() {
    clearScreen(true);
    inputs = controller.getInputs();
    requestAnimationFrame(fps);
    
    p1.control(inputs);
    p1.update(widthScreen, heightScreen);
    p1.draw(esc);

    document.getElementById('leftArm').innerHTML = `L:${p1.offScreen}`;
    document.getElementById('body').innerHTML = `BD:${p1.offScreen}`;
    document.getElementById('rightArm').innerHTML = `R:${p1.offScreen}`;
}

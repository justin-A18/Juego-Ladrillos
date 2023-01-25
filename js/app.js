let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

//comienzo de la Bola
let x = canvas.width/2; //240
let y = canvas.height-30; //290

//Control de movimiento
let dx = 2;
let dy = -2;

//Radio de la Bola
let ballRadius = 10;

//pala
let paddleHeight = 10; //alto
let paddleWidth = 75; //ancho
let paddleX = (canvas.width - paddleWidth)/2; //posicionamiento

//Contador

let score = 0;

function drawScore(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`Score ${score}`, 8, 20);
}

//vidas

let lives = 3;

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}


//Ladrillos
let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

let bricks = [];

for(c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];

    for(r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1};
    }
}

function drawBricks() {
    for(c = 0; c < brickColumnCount; c++) {
        for(r = 0; r < brickRowCount; r++) {

            if(bricks[c][r].status == 1) {
                let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;

                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;

                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }

        }
    }
}

function collisionDetection() {
    for(c = 0; c < brickColumnCount; c++) {
        for(r = 0; r < brickRowCount; r++) {

            let b = bricks[c][r];

            if(b.status === 1){

                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
    
                    b.status = 0;
    
                    score++;
    
                    if(score == brickRowCount*brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                    }
                }
            }

        }
    }
}

//Interaccion con el usuario
let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e){

    if(e.keyCode === 39){
        rightPressed = true;
    }

    else if(e.keyCode === 37){
        leftPressed = true;
    }

}

function keyUpHandler(e){
    if(e.keyCode === 39){
        rightPressed = false;
    }

    else if(e.keyCode === 37){
        leftPressed = false;
    }
}

//movimiento del mouse

document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;

    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

//tactil

document.addEventListener("touchstart",touchMoveHandler,false);

function touchMoveHandler(e){
    let relativeX = e.clientX - canvas.offsetLeft;

    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

//dibujo de la bola
function drawBall() {

    ctx.beginPath();
    ctx.arc(x, y,ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

}

//dibujo PISO
function drawPale(){
    ctx.beginPath();
    ctx.rect(paddleX,canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

//Funcionalidad
function draw(){

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPale();
    drawBall();
    drawBricks();
    collisionDetection();
    drawScore();
    drawLives();


    //Control de la bola

    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius){
        dx = -dx;
    }

    if(y + dy < ballRadius){
        dy = -dy    
    }

    else if(y + dy > canvas.height - ballRadius){

        if(x > paddleX && x < paddleX + paddleWidth){
            dy = -dy
        }

        else{

            lives--;
            if(!lives) {
                alert("GAME OVER");
                document.location.reload();
            }

            else {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width-paddleWidth)/2;
            }

        }
    }

    //Usuario

    if(rightPressed && paddleX < canvas.width - paddleWidth){
        paddleX += 7;
    }

    else if(leftPressed && paddleX > 0){
        paddleX -= 7;
    }

    x += dx;
    y += dy;

}

setInterval(draw,10)


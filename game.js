const canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

canvas.style.border = "1px solid yellow";
canvas.lineWidth = 3;

const gameover = document.getElementById("game-over"),
    youlose = document.getElementById("youlose");

let GAME_OVER = false;

function gameOver() {
    if (life <= 0) {
        showYouLose();
    }
}

function showYouLose() {
    context.drawImage(YOU_LOSE, 50, 0, 800, 570);
    startBall = false;
    drawBall();
    drawPaddle();
}



function loop() {

    draw();

    update();

    requestAnimationFrame(loop);

}
loop();

function draw() {

    context.drawImage(BG_IMG, 0, 0);

    drawPaddle();

    drawBall();

    drawBrick();

}

function update() {

    movePaddle();

    moveBall();

    //gameOver();

    ballWallCollision();

    ballPaddleCollision();

    ballBrickCollision();

}
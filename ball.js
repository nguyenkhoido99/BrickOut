let startBall = false;

function drawBall() {
    context.drawImage(BREAK_OUT, BALL.sx, BALL.sy, BALL.swidth, BALL.sheight, BALL.x, BALL.y, BALL.width, BALL.height);
}

document.addEventListener("keydown", function(evt) {
    if (evt.keyCode == 32) {
        startBall = true;
    }
});

function moveBall() {
    if (startBall) {
        BALL.x -= BALL.ax;
        BALL.y += BALL.ay;
    }
}

function ballWallCollision() {
    if (BALL.x + BALL.height / 2 <= 0 || BALL.x + BALL.width > 900) {
        BALL.ax = -BALL.ax;
    }

    if (BALL.y < 0) {
        BALL.ay = -BALL.ay;
    }

    if (BALL.y + BALL.height > 600) {
        resetBall();
    }
}

function resetBall() {
    BALL.x = (PADDLE.x + PADDLE.width / 2) - BALL.width / 2;
    BALL.y = 520;
    startBall = false;
}

function ballPaddleCollision() {
    if (BALL.y + BALL.height >= PADDLE.y && BALL.x >= PADDLE.x && BALL.x + BALL.width <= PADDLE.x + PADDLE.width) {

        let collidePoint = BALL.x - (PADDLE.x + PADDLE.width / 2);

        collidePoint = collidePoint / (PADDLE.width / 2);

        let angle = collidePoint * Math.PI / 3;

        BALL.ax = -BALL.speed * Math.sin(angle);
        BALL.ay = -BALL.speed * Math.cos(angle);
    }
}
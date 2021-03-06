let leftArrow = false,
    rightArrow = false;

function drawPaddle() {
    context.drawImage(BREAK_OUT, PADDLE.sx, PADDLE.sy, PADDLE.swidth, PADDLE.sheight, PADDLE.x, PADDLE.y, PADDLE.width, PADDLE.height);
}

document.addEventListener("keydown", function(evt) {
    if (evt.keyCode == 37) {
        leftArrow = true;
    } else if (evt.keyCode == 39) {
        rightArrow = true;
    }
});

document.addEventListener("keyup", function(evt) {
    if (evt.keyCode == 37) {
        leftArrow = false;
    } else if (evt.keyCode == 39) {
        rightArrow = false;
    }
});

function movePaddle() {
    if (leftArrow && PADDLE.x > 0) {
        PADDLE.x -= PADDLE.ax;
        if (startBall == false) {
            BALL.x -= PADDLE.ax;
        }
    } else if (rightArrow && PADDLE.x + PADDLE.width < 900) {
        PADDLE.x += PADDLE.ax;
        if (startBall == false) {
            BALL.x += PADDLE.ax;
        }
    }
}
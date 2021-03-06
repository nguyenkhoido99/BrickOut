let bricks = [];

function createBricks() {
    for (let row = 0; row < 6; row++) {
        bricks[row] = [];
        let xBrick = 100,
            yBrick = 55;
        for (let col = 0; col < BRICK[row].column; col++) {
            bricks[row][col] = {
                x: col * (BRICK[row].width) + xBrick,
                y: row * (BRICK[row].height) + yBrick,
                status: true
            }
        }
    }
}
createBricks();

function drawBrick() {
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < BRICK[row].column; col++) {
            let b = bricks[row][col];
            if (b.status) {
                context.drawImage(BREAK_OUT, BRICK[row].sx, BRICK[row].sy, BRICK[row].swidth, BRICK[row].sheight, b.x, b.y, BRICK[row].width, BRICK[row].height);
            }
        }
    }
}

function ballBrickCollision() {
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < BRICK[row].column; col++) {
            let b = bricks[row][col];
            if (b.status) {
                if (BALL.x + BALL.width > b.x && BALL.x < b.x + BRICK[row].width && BALL.y + BALL.height > b.y && BALL.y < b.y + BRICK[row].height) {
                    b.status = false;
                    BALL.ay = -BALL.ay;
                }
            }
        }
    }
}
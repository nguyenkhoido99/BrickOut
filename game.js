const canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

canvas.style.border = "3px solid orangered";

const PADDEL_WIDTH = 170,
    PADDLE_HEIGHT = 30,
    PADDLE_MARGIN_BOTTOM = 10;
const MAX_LEVEL = 7;

let LIFE = 3;
let SCORE = 0;
let SCORE_UNIT = 10;
let LEVEL = 1;
let GAME_OVER = false;
let leftArrow = false;
let rightArrow = false;
let startBall = false;

const score = document.getElementById('score');
const level = document.getElementById('level');
const life = document.getElementById('life');

//GAME START
function startGame() {
    if (startBall == false) {
        context.font = "40px Arialss";
        context.fillStyle = "Red";
        context.fillText('Space to Start Ball', canvas.width / 2 - 150, canvas.height / 2, 300);
    }
}

//CREATE OBJECT PADDLE
const paddle = {
    sx: 2,
    sy: 53,
    sw: 104,
    sh: 24,
    x: canvas.width / 2 - PADDEL_WIDTH / 2,
    y: canvas.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT,
    width: PADDEL_WIDTH,
    height: PADDLE_HEIGHT,
    dx: 8
};

function drawPaddle() {
    context.drawImage(BREAK_OUT, paddle.sx, paddle.sy, paddle.sw, paddle.sh, paddle.x, paddle.y, paddle.width, paddle.height);
}

document.addEventListener('keydown', (evt) => {
    if (evt.keyCode == 37)
        leftArrow = true;
    if (evt.keyCode == 39)
        rightArrow = true;
});

document.addEventListener('keyup', (evt) => {
    if (evt.keyCode == 37)
        leftArrow = false;
    if (evt.keyCode == 39)
        rightArrow = false;
});

function movePaddle() {
    if (leftArrow && paddle.x > 0) {
        paddle.x -= paddle.dx;
        if (startBall == false)
            ball.x -= paddle.dx;
    }
    if (rightArrow && paddle.x + paddle.width < canvas.width) {
        paddle.x += paddle.dx;
        if (startBall == false)
            ball.x += paddle.dx;
    }
}
//COMPLETE THE PADDLE OBJECT HANDLING

//CREATE OBJECT BALL
const ball = {
    sx: 452,
    sy: 2,
    sw: 22,
    sh: 22,
    x: canvas.width / 2 - 16,
    y: paddle.y - 33,
    width: 30,
    height: 30,
    speed: 7,
    dx: 6 * (Math.random() * 2 - 1),
    dy: -6
};

function drawBall() {
    context.drawImage(BREAK_OUT, ball.sx, ball.sy, ball.sw, ball.sh, ball.x, ball.y, ball.width, ball.height);
}

document.addEventListener('keydown', (evt) => {
    if (evt.keyCode == 32) {
        startBall = true;
        if (GAME_OVER == true)
            location.reload(); //RELOAD THE PAGE
    }
});

function moveBall() {
    if (startBall) {
        ball.x -= ball.dx;
        ball.y += ball.dy;
    }
}

function ballWallCollition() {
    if (ball.x < 0 || ball.x + ball.width > canvas.width) {
        ball.dx = -ball.dx
        WALL.play();
    }
    if (ball.y < 0) {
        ball.dy = -ball.dy;
        WALL.play();
    }
    if (ball.y + ball.height > canvas.height) {
        LIFE--;
        life.innerHTML = `LIFE: ${LIFE}`;
        LOST_OFF_LIFE.play();
        setAgainBallPaddle();
    }
}

function setAgainBallPaddle() {
    ball.dy = -ball.dy;
    startBall = false;
    paddle.x = canvas.width / 2 - PADDEL_WIDTH / 2;
    paddle.y = canvas.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT;
    ball.x = canvas.width / 2 - 16;
    ball.y = paddle.y - 33;
}


function ballPaddlecollision() {
    if (ball.x >= paddle.x && ball.x + ball.width <= paddle.x + paddle.width && ball.y + ball.height >= paddle.y && ball.y >= paddle.y - paddle.height) {

        let collisionPoin = (ball.x + ball.width / 2) - (paddle.x + paddle.width / 2);

        collisionPoin = collisionPoin / (paddle.width / 2);

        ball.dx = -ball.speed * Math.sin(collisionPoin);
        ball.dy = -ball.speed * Math.cos(collisionPoin);
        BALL_PADDLE.play();
    }
}

//COMPLETE THE BALL OBJECT HANDLING

//CREATE OBJECT BRICK
const brick = [
    blue = {
        sx: 386,
        sy: 2,
        sw: 64,
        sh: 32,
        width: 90,
        height: 30
    },
    green = {
        sx: 2,
        sy: 79,
        sw: 64,
        sh: 32,
        width: 90,
        height: 30
    },
    purple = {
        sx: 240,
        sy: 53,
        sw: 64,
        sh: 32,
        width: 90,
        height: 30
    },
    red = {
        sx: 372,
        sy: 62,
        sw: 64,
        sh: 32,
        width: 90,
        height: 30
    },
    silver = {
        sx: 90,
        sy: 87,
        sw: 64,
        sh: 32,
        width: 90,
        height: 30
    },
    yellow = {
        sx: 222,
        sy: 87,
        sw: 64,
        sh: 32,
        width: 90,
        height: 30
    },
];

let bricks = [];
let row = 1;
let marginLeft = (canvas.width - brick[0].width * 10) / 2;
let marginTop = 60;

function createBricks() {
    for (let r = 0; r < row; r++) {
        bricks[r] = [];
        for (let c = 0; c < 10; c++) {
            bricks[r][c] = {
                x: marginLeft + (c * brick[r].width),
                y: marginTop + (r * brick[r].height),
                status: true
            };
        }
    }
}
createBricks();

function drawBricks() {
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < 10; c++) {
            let b = bricks[r][c];
            if (b.status)
                context.drawImage(BREAK_OUT, brick[r].sx, brick[r].sy, brick[r].sw, brick[r].sh, b.x, b.y, brick[r].width, brick[r].height);
        }
    }
}

function ballBrickCollision() {
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < 10; c++) {
            let b = bricks[r][c];
            if (b.status) {
                if (ball.x + ball.width >= b.x && ball.x <= b.x + brick[r].width && ball.y + ball.height >= b.y && ball.y <= b.y + brick[r].height) {
                    ball.dy = -ball.dy;
                    b.status = false;
                    score.innerHTML = `SCORE: ${SCORE+=SCORE_UNIT}`;
                    BALL_BRICKS.play();
                }
            }
        }
    }
}

//COMPLETE THE BRICK OBJECT HANDLING

//LEVEL UP
function levelUp() {
    let isLeveDone = true;

    for (let r = 0; r < row; r++) {
        for (let c = 0; c < 10; c++) {
            isLeveDone = isLeveDone && !bricks[r][c].status;
        }
    }

    if (isLeveDone) {
        if (LEVEL >= MAX_LEVEL) {
            showGameWin();
            GAME_OVER = true;
            WIN.play();
            return;
        }
        row++;
        createBricks();
        ball.speed += 0.5;
        paddle.dx += 0.25;
        setAgainBallPaddle();
        LEVEL++;
        LEVEL_UP.play();
        level.innerHTML = `LEVEL: ${LEVEL}`;
    }
}

//WIN GAME 
function showGameWin() {
    context.drawImage(GAME_WIN, canvas.width / 2 - 385, canvas.height / 2 - 171);
    context.font = "40px Arial";
    context.fillStyle = "red";
    context.fillText('Space To Reload GAME', canvas.width / 2 - 200, canvas.height / 1.2, 400);
}

//GAME OVER
function gameOver() {
    if (LIFE <= 0) {
        showGameLose();
        GAME_OVER = true;
        LOSE.play();
    }
}

function showGameLose() {
    context.drawImage(GAME_LOSE, 240, 100);
    context.font = "40px Arial";
    context.fillStyle = "red";
    context.fillText('Space To Restart GAME', canvas.width / 2 - 200, canvas.height / 1.6, 400);
}

//GAME LOOP
function loop() {

    context.drawImage(BG_IMG, 0, 0);

    draw();

    update();

    if (GAME_OVER == false) {
        requestAnimationFrame(loop);
    }
}
loop();

function draw() {
    startGame();

    drawPaddle();

    drawBall();

    drawBricks();
}

function update() {
    movePaddle();

    moveBall();

    ballWallCollition();

    ballPaddlecollision();

    ballBrickCollision();

    gameOver();

    levelUp();

}
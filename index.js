const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

const GRAVITY = 0.1;
const BOUNCE_DAMPING = 0.95;
const FRICTION = 0.98;
const MAX_SPEED = 5;


allBalls = [];

for (let i = 0; i < 1; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.min(Math.random() * canvas.height, 100);
    const velX = Math.random() * MAX_SPEED - MAX_SPEED / 2;
    const velY = Math.random() * MAX_SPEED - MAX_SPEED / 2;
    allBalls.push(new Ball(x, y, velX, velY, "red", 10, 30));
}

allObstacles = [];

for (let i = 0; i < 12; i++) {
    const x = 60 * i + 20;
    const y = Math.random() * canvas.height;
    const size = 10;
    allObstacles.push(new Obstacle(x, 250, size));
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    allBalls.forEach(b => {
        b.applyGravity();
        b.move();
        b.checkBounds();
        b.checkObstacleCollision(allObstacles);
        b.draw();
        b.drawShadow();
    });

    allObstacles.forEach(o => {
        o.draw()
    });


    requestAnimationFrame(loop);
}

loop();
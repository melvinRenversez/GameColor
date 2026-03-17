const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

const GRAVITY = 0.1;
const BOUNCE_DAMPING = 0.8;
const FRICTION = 0.95;
const MAX_SPEED = 5;


allBalls = [];
allObstacles = [];

// Balls
for (let i = 0; i < 10; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.min(Math.random() * canvas.height, 100);
    const velX = Math.random() * MAX_SPEED - MAX_SPEED / 2;
    const velY = Math.random() * MAX_SPEED - MAX_SPEED / 2;
    allBalls.push(new Ball(x, y, velX, velY, "red", 10, 10));
}


// Obstacles
for (let i = 0; i < 12; i++) {
    const x = 60 * i + 20;
    const y = Math.random() * canvas.height;
    const size = 10;
    allObstacles.push(new Obstacle(x, 250, size));
}

allZones = [];

allZones.push(new Zone(0, canvas.height-30, 150, 30, "rgba(15, 238, 101, 0.77)", 4));
allZones.push(new Zone(canvas.width - 150, canvas.height-30, 150, 30, "rgba(15, 238, 101, 0.77)", 4));

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    allBalls.forEach(b => {
        b.applyGravity();
        b.move();
        b.checkBounds();
        b.checkObstacleCollision(allObstacles);
        b.checkZoneEnter(allZones);
        b.draw();
        b.drawShadow();
        b.drawValue();
    });

    allObstacles.forEach(o => {
        o.draw()
    });

    allZones.forEach(z => {
        z.draw();
    });

    setTimeout(() => {loop()}, 100);
    // requestAnimationFrame(loop);
}

loop();
class Ball {
    constructor(x, y, velX, velY, color, size, maxShadows = 10) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
        this.last = 0;
        this.shadows = []
        this.maxShadows = maxShadows
        this.value = 32
    }

    applyGravity() {
        this.velY += GRAVITY
    }

    checkBounds() {
        // Floor bounce
        if (this.y + this.size >= canvas.height) {
            this.y = canvas.height - this.size;
            this.velY *= -BOUNCE_DAMPING;
            this.velX *= FRICTION;
        }

        // Ceiling
        if (this.y - this.size <= 0) {
            this.y = this.size;
            this.velY *= -BOUNCE_DAMPING;
        }

        // Left/right walls
        if (this.x + this.size >= canvas.width) {
            this.x = canvas.width - this.size;
            this.velX *= -BOUNCE_DAMPING;
        }
        if (this.x - this.size <= 0) {
            this.x = this.size;
            this.velX *= -BOUNCE_DAMPING;
        }
    }

    checkObstacleCollision(obstacles) {
        obstacles.forEach(obstacle => {
            const dx = obstacle.x - this.x;
            const dy = obstacle.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance <= obstacle.size + this.size) {

                const nx = dx / distance;
                const ny = dy / distance;

                const dot = this.velX * nx + this.velY * ny;

                this.velX -= 2 * nx * dot;
                this.velY -= 2 * ny * dot;
            }
        });
    }

    checkZoneEnter(zones) {
        zones.forEach(zone => {

            if (this.x < zone.x + zone.width && this.x > zone.x) {
                if (this.y < zone.y + zone.height && this.y > zone.y) {
                    console.log("enter");

                    this.x = zone.getNewPose().x;
                    this.y = zone.getNewPose().y;

                    this.velX = 0;
                    this.velY = 0;

                    this.value *= zone.multiplicator
                }
            }

        })
    }

    move() {
        this.x += this.velX;
        this.y += this.velY;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();

        if (this.shadows.length > 10) {
            this.shadows = this.shadows.slice(-10);
        }
        this.shadows.push({ x: this.x, y: this.y })
    }

    drawValue() {
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText(this.value, this.x, this.y);
    }

    drawShadow() {

        for (let i = 0; i < this.shadows.length; i++) {
            const shadow = this.shadows[i];
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(shadow.x, shadow.y, Math.max(i, 1), 0, 2 * Math.PI);
            ctx.fill();

        }
    }
}
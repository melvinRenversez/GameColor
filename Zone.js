class Zone {
    constructor(x, y, width, height, color, multiplicator) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.multiplicator = multiplicator;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();

        this.drawMultiplicator()
    }

    drawMultiplicator() {
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText(this.multiplicator, this.x + this.width / 2, this.y + this.height / 2);
    }

    getNewPose() {
        const x = Math.random() * canvas.width;
        const y = Math.min(Math.random() * canvas.height, 100);
        return { x, y };
    }
}
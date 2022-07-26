const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 900;
const CANVAS_HEIGHT = canvas.height = 800;
let gameSpeed = 15;

const backgroundLayer1 = new Image();
backgroundLayer1.src = `./resources/11_background.png`;
const backgroundLayer2 = new Image();
backgroundLayer2.src = `./resources/01_ground.png`;
const backgroundLayer3 = new Image();
backgroundLayer3.src = `/resources/02_trees and bushes.png`;
const backgroundLayer4 = new Image();
backgroundLayer4.src = `./resources/03_distant_trees.png`;
const backgroundLayer5 = new Image();
backgroundLayer5.src = `./resources/04_bushes.png`;

class Layer {
    constructor(image, speedModifier) {
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
        this.x2 = this.width;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }
    update() {
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.width) {
            this.x = this.width + this.x2 - this.speed;
        }
        if (this.x2 <= -this.width) {
            this.x2 = this.width + this.x - this.speed;
        }
        this.x = Math.floor(this.x - this.speed);
        this.x2 = Math.floor(this.x2 - this.speed);
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
}

const layer4 = new Layer(backgroundLayer4, 0.5);

function  animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    layer4.update();
    layer4.draw();
    requestAnimationFrame(animate);
};
animate();
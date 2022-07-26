const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 1024;
const CANVAS_HEIGHT = canvas.height = 800;
let gameSpeed = 1;
const gravity = 0.5;
//let gameFrame = 0;

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
const backgroundLayer6 = new Image();
backgroundLayer6.src = `./resources/08_clouds.png`;
const backgroundLayer7 = new Image();
backgroundLayer7.src = `./resources/09_distant_clouds1.png`;
const backgroundLayer8 = new Image();
backgroundLayer8.src = `./resources/10_distant_clouds.png`;

window.addEventListener(`load`, function() {

const slider = document.getElementById(`slider`);
slider.value = gameSpeed;
const showGameSpeed = document.getElementById(`showGameSpeed`);
showGameSpeed.innerHTML = gameSpeed;
slider.addEventListener(`change`, function (e) {
    //console.log(e.target.value);
    gameSpeed = e.target.value;
    showGameSpeed.innerHTML = gameSpeed;
});

canvas.width = window.innerWidth;

class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 1
        }
        this.width = 100
        this.height = 100
    }
    draw() {
        ctx.fillStyle = `red`
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity;
        else  this.velocity.y = 0;
    }
}


class Layer {
    constructor(image, speedModifier) {
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 800;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }
    update() {
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.width) {
            this.x = 0;
        }
        this.x = this.x - this.speed;
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

const layer1 = new Layer(backgroundLayer5, 0.2);
const layer2 = new Layer(backgroundLayer1, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.6);
const layer4 = new Layer(backgroundLayer4, 0.8);
const layer5 = new Layer(backgroundLayer2, 1);
const layer6 = new Layer(backgroundLayer6, 0.5);
const layer7 = new Layer(backgroundLayer7, 0.7);
const layer8 = new Layer(backgroundLayer8,0.9);

class Obstacle {
    constructor() {
        this.position = {
            x: 900,
            y: 750
        }
        this.width = 100
        this.height = 50
    }
    draw() {
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const player = new Player();
const obstacles = [new Obstacle()]
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

const gameObjects = [layer1, layer2, layer3, layer4, layer5, layer6, layer7, layer8]

function  animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameObjects.forEach(object => {
        object.update();
        object.draw();
        player.update()
        obstacles.forEach((obstacle) => {
            obstacles.draw();
        })


        if (keys.right.pressed && player.position.x < 300) {
            player.velocity.x = 1
        } else if (keys.left.pressed && player.position.x > 100) {
            player.velocity.x = -1
        } else {
            player.velocity.x = 0;

            if(keys.right.pressed) {
                obstacles.forEach((obstacle) => {
                    obstacles.position.x -= 1
                })
            } else if (keys.left.pressed) {
                obstacles.forEach((obstacle) => {
                    obstacles.position.x += 1
                })
            }
        }

        //obstacles collision detection
        /*obstacles.forEach((obstacle) => {
            if (
                player.position.y + player.height
                <= obstacle.position.y &&
                player.position.y + player.height
                +player.velocity.y >=
                obstacle.position.y &&
                player.position.x + player.width
                >= obstacle.position.x &&
                player.position.x <= obstacle.position.x + obstacle.width
            )
        })*/

    })
    requestAnimationFrame(animate);
};
animate();

addEventListener(`keydown`, ({keyCode}) => {
    //console.log(keyCode);
    switch (keyCode) {
        case 65:
            console.log('left')
            keys.left.pressed = true
            break;
        case 83:
            console.log('down')
            break;
        case 68:
            console.log('right')
            keys.right.pressed = true
            break;
        case 87:
            console.log('up')
            player.velocity.y -= 20;
            break;
    }
    //console.log(keys.right.pressed)
})

    addEventListener(`keyup`, ({keyCode}) => {
        //console.log(keyCode);
        switch (keyCode) {
            case 65:
                console.log('left')
                keys.left.pressed = false
                break;
            case 83:
                console.log('down')
                break;
            case 68:
                console.log('right')
                keys.right.pressed = false
                break;
            case 87:
                console.log('up')
                player.velocity.y -= 0;
                break;
        }
        //console.log(keys.right.pressed)
    })

})
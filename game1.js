const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Player's ship
const ship = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 50,
    width: 50,
    height: 30,
    dx: 6,
};

// Player's bullets
const bullets = [];
const bullet = {
    width: 5,
    height: 10, 
    dy: 5,
};

// Alien's bullets 
const alienBullets = [];
const alienBullet = {
    width: 5,
    height: 10,
    dy: 3,
};

const aliens = [];

let isShipVisible = true;

// Alien image 
const alienImage = new Image();
alienImage.src = 'https://www.pngall.com/wp-content/uploads/13/Space-Invaders-Alien-Transparent.png';   

function aliensShootBullet() {
    if (aliens.length === 0) return; 
    const shooterAlien = aliens[Math.floor(Math.random() * aliens.length)];

    const newBullet = {
        x: shooterAlien.x + shooterAlien.width / 2 - alienBullet.width / 2,
        y: shooterAlien.y + shooterAlien.height,
        width: alienBullet.width,
        height: alienBullet.height,
        dy: alienBullet.dy,
    };

    alienBullets.push(newBullet);
}

function drawAlienBullets() {
    ctx.fillStyle = 'red'; 
    alienBullets.forEach(b => {
        ctx.fillRect(b.x, b.y, b.width, b.height);
    });
}

function moveAlienBullets() {
    for (let i = 0; i < alienBullets.length; i++) {
        alienBullets[i].y += alienBullets[i].dy;

        if (alienBullets[i].y > canvas.height) {
            alienBullets.splice(i, 1);
            i--; 
        }
    }
}

function showGameOverModal() {
    const modal = document.getElementById('gameOverModal');
    modal.style.display = 'flex';

    const restartBtn = document.getElementById('restartButton');
    restartBtn.addEventListener('click', function() {
        
        modal.style.display = 'none';
        location.reload(); 
    });
}
 
function checkAlienBulletShipCollision() {
    for (let i = alienBullets.length - 1; i >= 0; i--) {
        if (isColliding(alienBullets[i], ship)) {
            alienBullets.splice(i, 1);
            isShipVisible = false; 
            showGameOverModal();
            break;
        }
    }
}

function initializeAliens() {
    const numAliens = 10;
    const numRows = 5;
    const spacing = 20;
    const scaledWidth = 40;
    const scaledHeight = 30;
    let startX = 50;
    let startY = 50;

    for(let row = 0; row < numRows; row++) {
        for(let i = 0; i < numAliens; i++) {
            aliens.push({
                x: startX + i * (scaledWidth + spacing),
                y: startY + row * (scaledHeight + spacing),
                width: scaledWidth,
                height: scaledHeight,
            });
        }
    }
}  


let alienDirection = 1;  // 1 for right, -1 for left
const alienSpeed = 2;
const alienDrop = 20;  // how much aliens will move down when changing direction

function moveAliens() {
    let edgeReached = false;

    for (const alien of aliens) {
        alien.x += alienDirection * alienSpeed;
        if (alien.x <= 0 || alien.x + alien.width >= canvas.width) {
            edgeReached = true;
        }
    }

    if (edgeReached) {
        alienDirection = -alienDirection;
        for (const alien of aliens) {
            alien.y += alienDrop;
        }
    }
}

function isColliding(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

let aliensKilled = 0;

function checkBulletAlienCollisions() {
    for (let i = bullets.length - 1; i >= 0; i--) {
        for (let j = aliens.length - 1; j >= 0; j--) {
            if (isColliding(bullets[i], aliens[j])) {
                bullets.splice(i, 1);
                aliens.splice(j, 1);
                aliensKilled++;
                break;
            }
        }
    }
}

function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Aliens Killed: " + aliensKilled, 10, 30);
}

function drawAliens() {

        for (const alien of aliens) {
            ctx.drawImage(alienImage, alien.x, alien.y, alien.width, alien.height);
        }
    }  

function drawShip() {
    if (isShipVisible) {
        ctx.fillStyle = 'white';
        ctx.fillRect(ship.x, ship.y, ship.width, ship.height);
    }
}

// Main game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    
    drawBullets();
    moveBullets();
    drawAlienBullets();
    moveAlienBullets();
    drawShip(); 
    moveAliens();
    checkBulletAlienCollisions();
    checkAlienBulletShipCollision();
    drawAliens(); 
    drawScore();

    if (Math.random() < 0.02) { // Adjust this value to control shooting frequency
        aliensShootBullet();
    }

    requestAnimationFrame(gameLoop); 
}
document.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
        case 37:  // Left arrow key
            if (ship.x - ship.dx >= 0) { // Check left boundary
                ship.x -= ship.dx;
            } else {
                ship.x = 0; // Ensure the ship stays completely on the canvas
            }
            break;
        case 39:  // Right arrow key
            if (ship.x + ship.width + ship.dx <= canvas.width) { // Check right boundary
                ship.x += ship.dx;
            } else {
                ship.x = canvas.width - ship.width; // Ensure the ship stays completely on the canvas
            }
            break;
        case 32:  // Space key
            shootBullet();
            break;
    }
});

// Bullet mechanics start here 
function drawBullets() {
    ctx.fillStyle = 'blue';
    bullets.forEach(b => {
        ctx.fillRect(b.x, b.y, b.width, b.height);
    });
}

function moveBullets() {
    for(let i = 0; i < bullets.length; i++) {
        bullets[i].y -= bullets[i].dy;

        if (bullets[i].y + bullets[i].height < 0 ) {
            bullets.splice(i, 1);
        }
    }
}

function shootBullet() {
    console.log("Shooting Bullet")
    const newBullet = {
        x: ship.x + ship.width / 2 - bullet.width / 2,
        y: ship.y - bullet.height,  // Spawn the bullet just above the ship
        width: bullet.width, 
        height: bullet.height,
        dy: bullet.dy,
    };
    bullets.push(newBullet); 
}

initializeAliens();
gameLoop();
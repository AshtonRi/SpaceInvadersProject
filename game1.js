const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Player's ship
const ship = {
    x: canvas.width / 2 - 25,  // Centered horizontally
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

function drawShip() {
    ctx.fillStyle = 'white';
    ctx.fillRect(ship.x, ship.y, ship.width, ship.height);
}

// Main game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    drawBullets();
    moveBullets();
    drawShip(); 

    requestAnimationFrame(gameLoop);  // Calls the gameLoop function
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

gameLoop();

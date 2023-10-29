const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Player's ship
const ship = {
    x: canvas.width - 50,
    y: canvas.height - 50,
    width: 50,
    height: 30,
    dx: 6,
};

function drawShip() {
    ctx.fillStyle = 'white';
    ctx.fillRect(ship.x, ship.y, ship.width, ship.height);
}

// Main game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    drawShip();

    requestAnimationFrame(gameLoop);  // Calls the gameLoop function
}

gameLoop();
document.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
        case 37:  // Left arrow key
            ship.x -= ship.dx;
            break;
        case 39:  // Right arrow key
            ship.x += ship.dx;
            break;
    }
});

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
    }
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
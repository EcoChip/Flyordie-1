// Configuración inicial del juego
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;

// Jugador
const player = {
    x: 50,
    y: 300,
    width: 30,
    height: 50,
    speed: 5,
    dx: 0,
    dy: 0
};

// Enemigos (bots)
const enemies = [
    { x: 600, y: 300, width: 30, height: 50, dx: -3 }
];

// Dibuja el jugador
function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Dibuja los enemigos
function drawEnemies() {
    ctx.fillStyle = 'red';
    enemies.forEach(enemy => {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });
}

// Mueve al jugador
function movePlayer() {
    player.x += player.dx;
    player.y += player.dy;

    // Evitar que el jugador se salga del canvas
    if (player.x < 0) player.x = 0;
    if (player.x > canvas.width - player.width) player.x = canvas.width - player.width;
    if (player.y < 0) player.y = 0;
    if (player.y > canvas.height - player.height) player.y = canvas.height - player.height;
}

// Mueve los enemigos
function moveEnemies() {
    enemies.forEach(enemy => {
        enemy.x += enemy.dx;

        // Si el enemigo se sale del canvas, lo volvemos a poner al principio
        if (enemy.x < 0) enemy.x = canvas.width;
    });
}

// Actualiza el juego
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawEnemies();
    movePlayer();
    moveEnemies();
    requestAnimationFrame(update);
}

// Control del teclado
function keyDown(e) {
    if (e.key === 'ArrowUp') player.dy = -player.speed;
    if (e.key === 'ArrowDown') player.dy = player.speed;
    if (e.key === 'ArrowLeft') player.dx = -player.speed;
    if (e.key === 'ArrowRight') player.dx = player.speed;
}

function keyUp(e) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') player.dy = 0;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') player.dx = 0;
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// Control táctil para móvil
let touchStartX = 0;
let touchStartY = 0;
let touchMoveX = 0;
let touchMoveY = 0;

document.getElementById('up').addEventListener('touchstart', () => player.dy = -player.speed);
document.getElementById('down').addEventListener('touchstart', () => player.dy = player.speed);
document.getElementById('left').addEventListener('touchstart', () => player.dx = -player.speed);
document.getElementById('right').addEventListener('touchstart', () => player.dx = player.speed);

document.getElementById('up').addEventListener('touchend', () => player.dy = 0);
document.getElementById('down').addEventListener('touchend', () => player.dy = 0);
document.getElementById('left').addEventListener('touchend', () => player.dx = 0);
document.getElementById('right').addEventListener('touchend', () => player.dx = 0);

// Inicia el juego
update();

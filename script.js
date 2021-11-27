let canvas = document.getElementById("snake"); //criar elemento que irá rodar o jogo
let context = canvas.getContext("2d"); //....

let direction = "right";
let box = 32;
let snake = []; //criar cobrinha como lista, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos

let pontos = 0;
let nome = ''

snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let food = { //Gerando valores aleatorios...
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box); //desenha o retângulo usando x e y e a largura e altura setadas
}

function criarCobrinha() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

//quando um evento acontece, detecta e chama uma função
document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && direction != 'right') direction = 'left';
    if (event.keyCode == 38 && direction != 'down') direction = 'up';
    if (event.keyCode == 39 && direction != 'left') direction = 'right';
    if (event.keyCode == 40 && direction != 'up') direction = 'down';
}

function gameOver() {
    alert('Game Over :(');
    clearInterval(jogo);
    document.location.reload(true);
}

function iniciarJogo() {
    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snake[0].x > 15 * box) gameOver();
    if (snake[0].x < 0) gameOver();
    if (snake[0].y > 15 * box) gameOver();
    if (snake[0].y < 0) gameOver();

    for (i = 1; i < snake.length; i++) {
        if ((snake[0].x == snake[i].x && snake[0].y == snake[i].y)) gameOver();
    }

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop(); //pop tira o último elemento da lista
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        pontos += 1;
        let valor = document.getElementById('pontos');
        valor.innerHTML = nome + ': ' + pontos + ' pontos';
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); //método unshift adiciona como primeiro quadradinho da cobrinha
}

let jogo;
let velocidade = 0;
var button = document.querySelector("button");

button.onclick = function() {
    input1 = document.querySelector("#input1");
    velocidade = input1.value;

    inputNome = document.querySelector("#inputNome");
    nome = inputNome.value;

    if (velocidade == 0 || nome == '') {
        alert('Defina um jogador e velocidade');
    } else {
        jogo = setInterval(iniciarJogo, velocidade);
    }

}
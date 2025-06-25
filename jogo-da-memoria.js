const timer = document.querySelector('.timer');
const gameTimer = document.getElementById('game-timer');

// Variáveis do jogo
const images = [
    'gameimagens/card-memory1.png',
    'gameimagens/card-memory2.png',
    'gameimagens/card-memory3.png',
    'gameimagens/card-memory4.png',
    'gameimagens/card-memory5.png',
    'gameimagens/card-memory6.png',
    'gameimagens/card-memory7.png',
    'gameimagens/card-memory8.png',
];
const cards = [...images, ...images];
let flippedCards = [];
let matchedCards = [];

// Timer
let timerInterval;
let seconds = 0;

// Função para iniciar o cronômetro
function startTimer() {
    gameTimer.classList.remove('d-none');
    gameTimer.classList.add('visible');

    timerInterval = setInterval(() => {
        seconds++;
        const formattedTime = seconds < 10 ? `0${seconds}` : seconds;
        timer.textContent = formattedTime;
    }, 1000);
}

// Função para parar o cronômetro
function stopTimer() {
    clearInterval(timerInterval);
    gameTimer.classList.remove('visible');
    gameTimer.classList.add('d-none');
}

// Função para embaralhar cartas
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Função para criar o tabuleiro
function createBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    shuffle(cards).forEach((image) => {
        const card = document.createElement('div');
        card.classList.add('game-card');
        card.dataset.image = image;

        const imgElement = document.createElement('img');
        imgElement.src = image;
        imgElement.alt = 'Carta do jogo';
        imgElement.classList.add('hidden');
        card.appendChild(imgElement);

        gameBoard.appendChild(card);
        card.addEventListener('click', flipCard);
    });
}

// Função para virar a carta
function flipCard() {
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(this)) return;

    this.classList.add('flipped');
    const img = this.querySelector('img');
    img.classList.remove('hidden');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

// Função para checar combinação
function checkMatch() {
    const [card1, card2] = flippedCards;
    const isMatch = card1.dataset.image === card2.dataset.image;

    if (isMatch) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
        checkGameOver();
    } else {
        setTimeout(() => {
            card1.querySelector('img').classList.add('hidden');
            card2.querySelector('img').classList.add('hidden');
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }, 1000);
    }
    flippedCards = [];
}

// Função para verificar fim do jogo
function checkGameOver() {
    if (matchedCards.length === cards.length) {
        stopTimer();
        document.getElementById('game-board').style.display = 'none';
        document.getElementById('game-controls').style.display = 'none';
        document.getElementById('end-screen').style.display = 'block';
        displayFinalTime();
    }
}

// Função para mostrar o tempo final
function displayFinalTime() {
    const finalTimeElement = document.createElement('p');
    finalTimeElement.textContent = `Você completou o jogo em ${seconds < 10 ? `0${seconds}` : seconds} segundos!`;
    finalTimeElement.classList.add('final-time');
    const endScreen = document.getElementById('end-screen');
    const oldTime = endScreen.querySelector('.final-time');
    if (oldTime) oldTime.remove();
    endScreen.appendChild(finalTimeElement);
}

// Função para iniciar o jogo
function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-board').style.display = 'grid';
    document.getElementById('game-controls').style.display = 'block';

    flippedCards = [];
    matchedCards = [];
    seconds = 0;
    timer.textContent = '00';

    createBoard();
    startTimer();
    document.body.classList.add('jogo-ativo');
}

// Função para reiniciar o jogo
function restartGame() {
    flippedCards = [];
    matchedCards = [];
    seconds = 0;
    timer.textContent = '00';
    stopTimer();

    shuffle(cards);
    createBoard();

    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('end-screen').style.display = 'none';
    document.getElementById('game-board').style.display = 'grid';
    document.getElementById('game-controls').style.display = 'block';

    startTimer();
    document.body.classList.add('jogo-ativo');
}

// Função para voltar à tela inicial
function goToStartScreen() {
    stopTimer();
    seconds = 0;
    timer.textContent = '00';

    document.getElementById('start-screen').style.display = 'block';
    document.getElementById('game-board').style.display = 'none';
    document.getElementById('game-controls').style.display = 'none';
    document.getElementById('end-screen').style.display = 'none';

    document.body.classList.remove('jogo-ativo');
}

// Eventos dos botões
document.getElementById('start-game-button').addEventListener('click', startGame);
document.getElementById('play-again-button').addEventListener('click', restartGame);
document.getElementById('restart-button').addEventListener('click', restartGame);
document.getElementById('home-button').addEventListener('click', goToStartScreen);
document.getElementById('home-button-end').addEventListener('click', goToStartScreen);
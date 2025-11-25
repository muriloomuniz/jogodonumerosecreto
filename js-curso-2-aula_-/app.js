let listaDeNumerosSorteados = [];
let numeroLimite = 10; 
let numberSecret = generateRandomNumber();
let attempts = 1;

function showTextOnScreem(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto; 
    responsiveVoice.speak(texto, 'US English Female', {rate:1.2});
}

function showInitialMessage(){ 
    showTextOnScreem('h1', 'WELCOME TO THE SECRET NUMBER GAME!');
    showTextOnScreem('p', 'Choose a number between 1 to 10:');
}

showInitialMessage();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numberSecret) {
        showTextOnScreem('h1','YOU ROCK!');
        let wordAttempts = attempts > 1 ? 'attempts' : 'attempt';
        let attemptsMessage = `You discovered the secret number with ${attempts} ${wordAttempts}`;
        showTextOnScreem('p', attemptsMessage);
        document.getElementById('restart').removeAttribute('disabled');
    } else {
        if (chute > numberSecret) {
            showTextOnScreem('p','The secret number is lower, try again');
        } else {
            showTextOnScreem('p','The secret number is higher, try again');
        }
        attempts++;
        cleanCamp();
    }
}

function generateRandomNumber() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return generateRandomNumber();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function cleanCamp() {
    chute = document.querySelector(`input`);
    chute.value = '';
}

function restartGame() {
    numberSecret = generateRandomNumber();
    cleanCamp();
    attempts = 1;
    showInitialMessage();
    document.getElementById('restart').setAttribute('disabled', true);
}



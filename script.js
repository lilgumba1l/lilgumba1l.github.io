const outputElement = document.getElementById('output');
const progressElement = document.getElementById('progress');
const largeTextElement = document.getElementById('large-text');
const consoleElement = document.getElementById('console');

const lines = [
    'Initializing...',
    'Loading modules...',
    'Connecting to server...',
    'Fetching data...',
    'Loading data...',
];

const largeText = `
▄████▄   ▄▄▄     ▄▄▄█████▓    ▄▄▄▄    ██▓ ▒█████    ██████ 
▒██▀ ▀█  ▒████▄   ▓  ██▒ ▓▒   ▓█████▄ ▓██▒▒██▒  ██▒▒██    ▒ 
▒▓█    ▄ ▒██  ▀█▄ ▒ ▓██░ ▒░   ▒██▒ ▄██▒██▒▒██░  ██▒░ ▓██▄   
▒▓▓▄ ▄██▒░██▄▄▄▄██░ ▓██▓ ░    ▒██░█▀  ░██░▒██   ██░  ▒   ██▒
▒ ▓███▀ ░ ▓█   ▓██▒ ▒██▒ ░    ░▓█  ▀█▓░██░░ ████▓▒░▒██████▒▒
░ ░▒ ▒  ░ ▒▒   ▓▒█░ ▒ ░░      ░▒▓███▀▒░▓  ░ ▒░▒░▒░ ▒ ▒▓▒ ▒ ░
  ░  ▒     ▒   ▒▒ ░   ░       ▒░▒   ░  ▒ ░  ░ ▒ ▒░ ░ ░▒  ░ ░
░          ░   ▒    ░          ░    ░  ▒ ░░ ░ ░ ▒  ░  ░  ░  
░ ░            ░  ░            ░       ░      ░ ░        ░  
░                                   ░                       
`;

let lineIndex = 0;
let progressBar = '';
const progressBarLength = 20;

function displayNextLine() {
    if (lineIndex < lines.length) {
        outputElement.innerHTML += lines[lineIndex] + '\n';
        if (lineIndex === 4) { // Начать отображение прогресс-бара на пятой строке
            updateProgressBar();
        } else {
            lineIndex++;
            setTimeout(displayNextLine, 1000); // Пауза в 1 секунду между строками
        }
    } else {
        setTimeout(clearConsoleAndShowText, 1000); // Очистить консоль и показать большой текст
    }
}

function updateProgressBar() {
    let progress = 0;
    progressElement.innerHTML = 'Processing data...\n';
    let interval = setInterval(() => {
        progress++;
        let filledLength = Math.floor((progress / 100) * progressBarLength);
        progressBar = '█'.repeat(filledLength) + ' '.repeat(progressBarLength - filledLength);
        progressElement.innerHTML = `Processing data...\n[${progressBar}] ${progress}%`;

        if (progress >= 100) {
            clearInterval(interval);
            progressElement.innerHTML += '\nAlmost there...\n';
            setTimeout(() => {
                progressElement.innerHTML += 'Done! Redirecting...\n';
                lineIndex++;
                setTimeout(displayNextLine, 1000); // Пауза в 1 секунду после завершения прогресса
            }, 500);
        }
    }, 50); // Обновление прогресс-бара каждые 50 миллисекунд
}

function clearConsoleAndShowText() {
    outputElement.innerHTML = '';
    progressElement.innerHTML = '';
    largeTextElement.classList.remove('hidden');
    consoleElement.classList.add('hide-cursor');
    largeTextElement.innerHTML = largeText;
    setTimeout(() => {
        window.location.href = 'main.html'; // Перенаправление на основной сайт
    }, 5000); // Задержка перед перенаправлением
}

document.addEventListener('DOMContentLoaded', displayNextLine);

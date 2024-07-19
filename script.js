const outputElement = document.getElementById('output');
const progressElement = document.getElementById('progress');
const lampContainer = document.getElementById('lamp-container');

const lines = [
    'Initializing...',
    'Loading modules...',
    'Connecting to server...',
    'Fetching data...',
    'Loading data...',
];

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
        setTimeout(() => {
            document.getElementById('console').style.opacity = 0; // Скрыть консоль
            lampContainer.style.opacity = 1; // Показать лампочку
            setTimeout(() => {
                window.location.href = 'main.html'; // Перенаправление на основной сайт
            }, 3000); // Подождать 3 секунды перед перенаправлением
        }, 1000);
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

document.addEventListener('DOMContentLoaded', displayNextLine);

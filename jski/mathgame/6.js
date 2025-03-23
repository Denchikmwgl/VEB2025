// Математическая игра с поддержкой браузера и Node.js

// Проверка среды выполнения
const isNode = typeof process !== 'undefined' && process.release.name === 'node';
let readline;
let userInput = '';

if (isNode) {
    readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
}

function askQuestion(question) {
    return new Promise((resolve) => {
        if (isNode) {
            readline.question(question, answer => {
                resolve(answer);
            });
        } else {
            resolve(prompt(question));
        }
    });
}

// Генерация случайного числа
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Генерация случайного оператора
function getRandomOperator(level) {
    const operators = level === 'начальный' ? ['+', '-', '*'] : ['+', '-', '*', '/', '>', '<', '==', '!='];
    return operators[getRandomNumber(0, operators.length - 1)];
}

// Генерация вопроса
function generateQuestion(level) {
    const num1 = getRandomNumber(1, 20);
    const num2 = getRandomNumber(1, 20);
    const operator = getRandomOperator(level);
    const question = `${num1} ${operator} ${num2}`;

    if (operator === '/') {
        return { question, answer: (num1 / num2).toFixed(2) };
    }

    const answer = eval(question).toString();
    return { question, answer };
}

// Основной процесс игры
async function playGame() {
    const levels = ['начальный', 'средний', 'продвинутый'];
    let levelIndex = 0;
    let correctAnswers = 0;
    let totalQuestions = 0;

    while (levelIndex < levels.length) {
        const level = levels[levelIndex];
        console.log(`\nУровень: ${level.toUpperCase()}`);

        for (let i = 0; i < 10; i++) {
            const { question, answer } = generateQuestion(level);
            const userAnswer = await askQuestion(`Вопрос ${i + 1}: ${question} = `);

            if (userAnswer === answer) {
                console.log('Правильно!');
                correctAnswers++;
            } else {
                console.log(`Неправильно. Правильный ответ: ${answer}`);
            }
            totalQuestions++;
        }

        if (correctAnswers / totalQuestions >= 0.8) {
            console.log('Поздравляем! Вы переходите на следующий уровень.');
            levelIndex++;
        } else {
            console.log('К сожалению, вы не набрали достаточно очков для перехода на следующий уровень.');
            break;
        }
    }

    console.log(`\nИгра окончена. Правильных ответов: ${correctAnswers} из ${totalQuestions}.`);
    if (isNode) readline.close();
}

playGame();
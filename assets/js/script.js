/**
 * Global constants
 */
let seconds, asked, correct, answer, interval;
let streak = Number(localStorage.getItem('streak')) || 0;
const timeEl = document.querySelector('.time');
const timerEl = document.querySelector('.timer');
const startEl = document.querySelector('.start');
const playFieldEl = document.querySelector('.play-field');
const optionsEl = document.querySelector('.options');
const highscoresEl = document.querySelector('.highscores');
const scoresEl = document.querySelector('.scores');
const saveEl = document.querySelector('.save');
const nameEl = document.querySelector('#name');

/**
 * Kick off the timer and fire up the question generator
 */
const newGame = () => {
    seconds = 60;
    asked = [];
    correct = 0;
    timerEl.style.opacity = 1;
    timer();
    startEl.style = 'display:none';
    playFieldEl.children[1].style  = 'display:none';
    optionsEl.style = 'display:block;';
    showQuestion();
}

/**
 * Check input choice and send back to question generator
 */
const checkIt = (e) => {
    e.stopPropagation();
    const choice = Number(e.target.getAttribute('data-choice'));
    if (choice === answer) {
        correct++;
    }
    else {
        seconds-=10;
    }
    showQuestion();
}

/**
 * Show a random question or end the game
 */
const showQuestion = () => {
    if (gameData.length) {
        const random = getRandom();
        playFieldEl.children[0].textContent = gameData[random].question;
        optionsEl.children[0].textContent = gameData[random].options[0];
        optionsEl.children[0].setAttribute('data-choice', 1);
        optionsEl.children[1].textContent = gameData[random].options[1];
        optionsEl.children[1].setAttribute('data-choice', 2);
        optionsEl.children[2].textContent = gameData[random].options[2];
        optionsEl.children[2].setAttribute('data-choice', 3);
        optionsEl.children[3].textContent = gameData[random].options[3];
        optionsEl.children[3].setAttribute('data-choice', 4);
        answer = gameData[random].correct;
        asked.push(random);
        gameData.splice(random, 1);
    }
    else {
        endGame('That\'s it!');
    }
}

/**
 * Return a random question number
 */
const getRandom = () => {
    return Math.floor(Math.random() * gameData.length);
}

/**
 * Dislplay and store results
 */
const endGame = (headline) => {
    clearInterval(interval);
    timerEl.style.opacity = 0;
    optionsEl.style = 'display:none;';
    playFieldEl.children[0].textContent = headline;
    playFieldEl.children[0].style = 'display:block';
    playFieldEl.children[1].textContent = `You correctly answered ${correct} out of ${asked.length}!`;
    playFieldEl.children[1].style = 'display:block;text-align:center';
    optionsEl.removeEventListener('click', newGame);
    highscoresEl.style = 'display:block';
}

/**
 * Save score
 */
const save = () => {
    highscoresEl.style = 'display:none';
    scoresEl.style = 'display:block';
    const name = nameEl.value;
    let scores = localStorage.getItem('scores');
    scores = scores ? JSON.parse(scores) : [];
    if (name.length) {
        scores.unshift({"name": name, "score": correct});
    }
    for (let i = 0; i < scores.length; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = `${scores[i].name} scored ${scores[i].score}`;
        scoresEl.appendChild(listItem);
    }
    localStorage.setItem('scores', JSON.stringify(scores));
}

/**
 * Countdown to endGame
 */
const timer = () => {
    interval = setInterval(function() {
        timeEl.textContent = seconds;
        seconds--;
        if (seconds < 0) {
            endGame('Time\'s up!');
        }
    }, 1000);
}

/**
 *  Add listeners
 */
startEl.addEventListener('click', newGame);
optionsEl.addEventListener('click', checkIt);
saveEl.addEventListener('click', save);

/**
 * Data
 */
const gameData = [
    {
        question: 'Which of these common data types is not considered a primative?',
        options: ['String', 'Number', 'Boolean', 'Object'],
        correct: 4
    },
    {
        question: 'Which of the following is an invalid JavaScript object?',
        options: ['var obj = {};', 'var obj = { name: "Jon"};', 'var obj = { name = "Jon"};', 'var obj = new Object();'],
        correct: 3
    },
    {
        question: 'The conditional of an if/else statement is enclosed within which of these?',
        options: ['Quotes', 'Curly Braces', 'Parentheses', 'Square Brackets'],
        correct: 3
    },
    {
        question: 'Which of the following is a properly formed javascript array?',
        options: ['[a, b, c]', '[a = 1, b = 2, c = 3]', '[a: 1, b: 2, c: 3]', '[1: a, 2: b 3: c]'],
        correct: 1
    },
    {
        question: 'Which of these is not falsey?',
        options: ['""', '{}', '0', 'undefined'],
        correct: 2
    }
];

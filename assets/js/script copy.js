/**
 * Global constants
 */
let seconds, asked, correct, interval;
let streak = Number(localStorage.getItem('streak')) || 0;
const timeEl = document.querySelector('.time');
const timerEl = document.querySelector('.timer');
const startEl = document.querySelector('.start');
const playFieldEl = document.querySelector('.play-field');
const optionsEl = document.querySelector('.options');

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
}

const showQuestion = () => {
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
        optionsEl.addEventListener('click', (e) => {
            const choice = Number(e.target.getAttribute('data-choice'));console.log('clicked',choice);
            if (choice === gameData[random].correct) {
                correct++;
                // seconds+=10;
            }
            else {
                // seconds-=10;
            }

        });
    // if (gameData.length) {
    //     asked.push(random);
    //     gameData.splice(random, 1);
    //     showQuestion();
    // }
    // else {
    //     endGame('That\'s it!');
    // }
}

const getRandom = () => {
    return random = Math.floor(Math.random() * gameData.length);
}

/**
 * Dislplay and store results
 */
const endGame = (headline) => {
    clearInterval(interval);
    timerEl.style.opacity = 0;
    optionsEl.style = 'display:none;';
    playFieldEl.children[0].textContent  = headline;
    playFieldEl.children[0].style = 'display:block';
    playFieldEl.children[1].textContent = `You correctly answered ${correct} out of ${asked.length}!`;
    playFieldEl.children[1].style = 'display:block';
    startEl.textContent = 'Play Again';
    startEl.style = 'display:block';

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
        options: ['[a, b, c]', '[a = 1, b = 2, c = 3', '[a: 1, b: 2, c: 3]', '[1: a, 2: b 3: c]'],
        correct: 1
    },
    {
        question: 'Which of these are not falsey?',
        options: ['""', '{}', '0', 'undefined'],
        correct: 2
    }
];

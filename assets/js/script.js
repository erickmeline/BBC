/**
 * Global constants
 */
let seconds = 60;
const timeEl = document.querySelector('.time');
const timerEl = document.querySelector('.timer');
const startEl = document.querySelector('.start');

/**
 * Kick off the timer and fire up the question generator
 */
const newGame = () => {
    console.log('game start');
    timer();
    timerEl.style.opacity = 1;
}

/**
 * Dislplay and store results
 */
const endGame = () => {
    console.log('game end');

}

/**
 * Countdown to endGame
 */
const timer = () => {
    const interval = setInterval(function() {
        timeEl.textContent = seconds;
        seconds--;
        if (seconds < 0) {
            clearInterval(interval);
            endGame();
        }
    }, 1000);
}

/**
 *  Add listeners
 */
startEl.addEventListener('click', newGame);

/**
 * Global constants
 */
let timeSlots;
const currentDayEl = document.querySelector('#currentDay');
const input0El = document.querySelector('#input0');
const input1El = document.querySelector('#input1');
const input2El = document.querySelector('#input2');
const input3El = document.querySelector('#input3');
const input4El = document.querySelector('#input4');
const input5El = document.querySelector('#input5');
const input6El = document.querySelector('#input6');
const input7El = document.querySelector('#input7');
const input8El = document.querySelector('#input8');

/**
 *  Retrieve data from store, add data
 */
const initTime = () => {
    currentDayEl.textContent = moment().format('dddd, MMMM Do');
    timeSlots = localStorage.getItem('timeSlots');
    timeSlots = timeSlots ? JSON.parse(timeSlots) : [];
    if (timeSlots.length) {
        for (let i = 0; i < 9; i++) {
            $('input[name='+[i]+']').val(timeSlots[i]);
        }
    }
    calcTimes();
}

/**
 *  Set time styles
 */
const calcTimes = () => {const currentHour = 13;
    // const currentHour = moment().format('HH');console.log(currentHour);
    for (let i = 0; i < 9; i++) {
        if (i + 9 < currentHour) {
            $('input[name='+[i]+']').parent().addClass('past');
        }
        else if (i + 9 === currentHour) {
            $('input[name='+[i]+']').parent().addClass('present');
        }
        else {
            $('input[name='+[i]+']').parent().addClass('future');
        }
    }
}

/**
 *  Save to local store
 */
const save = (e) => {
    inputText = e.target.value;
    timeSlot = e.target.getAttribute('name');
    timeSlots[timeSlot] = inputText;
    localStorage.setItem('timeSlots', JSON.stringify(timeSlots));
}

/**
 *  Add listeners
 */
input0El.addEventListener('blur', save);
input1El.addEventListener('blur', save);
input2El.addEventListener('blur', save);
input3El.addEventListener('blur', save);
input4El.addEventListener('blur', save);
input5El.addEventListener('blur', save);
input6El.addEventListener('blur', save);
input7El.addEventListener('blur', save);
input8El.addEventListener('blur', save);

initTime();

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

let timeSlots;

const currentDate = moment(new Date());//moment().format('dddd, MMMM Do');
currentDayEl.textContent = currentDate;

/**
 *  Retrieve data from store, add data, add time style
 */
const initTimeBlocks = () => {
    timeSlots = localStorage.getItem('timeSlots');
    timeSlots = timeSlots ? JSON.parse(timeSlots) : [];
    if (timeSlots.length) {
        for (let i = 0; i < 9; i++) {
            const element = `input${i}El`;
            element[i].textContent = timeSlots[i] || '';
        }
    }
// do time cals here
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

initTimeBlocks();

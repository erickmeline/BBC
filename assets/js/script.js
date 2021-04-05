/**
 * Global constants
 */
const url_current = 'https://api.openweathermap.org/data/2.5/weather';
const url_uvIndex = 'http://api.openweathermap.org/data/2.5/uvi';
const url_forcast = 'https://api.openweathermap.org/data/2.5/forecast';
const api_kei = '7875554f2197f6cdb5c5b47cbfb1c260';
const searchEl = document.querySelector('button');
const currentEl = document.querySelector('.current');
const forcastEl = document.querySelector('.forcast');
const historyEl = document.querySelector('.history');
let history = localStorage.getItem('history');
history = history ? JSON.parse(history) : [];

/**
 * Fetch request
 */
const fetchData = (url) => {
    return fetch(url).then((response) => {
        if (response.ok) {
            return response.json();
        }
        else {
            console.error('Error:', response.statusText);
        }
    }).catch((error) => {
        console.error('Error: no response');
    });
}

/**
 *  Kick off a current weather request
 */
const displayCurrent = () => {
    let location = document.querySelector('[type="search"').value;
    if (location) {
        const currentUrl = `${url_current}?q=${location}&units=imperial&appid=${api_kei}`;
        fetchData(currentUrl).then((data) => {
            currentEl.innerHTML = '';
            const headline = document.createElement('h2');
            headline.textContent = `${data.name} ${moment().format('dddd, MMMM Do')}`;
            currentEl.appendChild(headline);
            const dataP1 = document.createElement('p');
            dataP1.textContent = `Temperature: ${data.main.temp} °F`;
            currentEl.appendChild(dataP1);
            const dataP2 = document.createElement('p');
            dataP2.textContent = `Humidity: ${data.main.humidity}%`;
            currentEl.appendChild(dataP2);
            const dataP3 = document.createElement('p');
            dataP3.textContent = `Wind Speed: ${data.wind.speed} MPH`;
            currentEl.appendChild(dataP3);
            const uvUrl = `${url_uvIndex}?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${api_kei}`;
            fetchData(uvUrl).then((data) => {
                const dataP4 = document.createElement('p');
                dataP4.innerHTML = `UV Index: <span>${data.value}</span>`;
                currentEl.appendChild(dataP4);
            });
            const newLi = document.createElement('li');
            newLi.textContent = data.name;
            historyEl.prepend(newLi);
            historyEl.style = 'display:block';
            history.unshift(data.name);
            localStorage.setItem('history', JSON.stringify(history));
        });
    }
}

/**
 *  Get current location ...maybe
 */
const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log('position',position);
            return position;
        });
    } else {
        alert('Error: Unable access current location');
    }
}





/**
 *  Add listeners
 */
searchEl.addEventListener('click', displayCurrent);

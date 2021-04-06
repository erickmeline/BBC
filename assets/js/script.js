/**
 * Global constants
 */
const url_current = 'https://api.openweathermap.org/data/2.5/weather';
const url_uvIndex = 'http://api.openweathermap.org/data/2.5/uvi';
const url_forcast = 'https://api.openweathermap.org/data/2.5/forecast';
const api_kei = '7875554f2197f6cdb5c5b47cbfb1c260';
const searchInputEl = document.querySelector('[type="search"');
const searchEl = document.querySelector('button');
const currentEl = document.querySelector('.current');
const forcastEl = document.querySelector('.forcast');
const forcastListEl = document.querySelector('.forcast-list');
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
const getCurrentWeather = () => {
    let location = searchInputEl.value;
    if (location) {
        const currentUrl = `${url_current}?q=${location}&units=imperial&appid=${api_kei}`;
        fetchData(currentUrl).then((data) => {
            currentEl.innerHTML = '';
            const headline = document.createElement('h2');
            headline.innerHTML = `${data.name} ${moment().format('dddd, MMMM Do')}`;
            currentEl.appendChild(headline);
            const dataImg = document.createElement('img');
            dataImg.setAttribute('src',`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
            currentEl.appendChild(dataImg);
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
        searchInputEl.value = '';
        getForcastWeather(location);
    }
}

const getForcastWeather = (location) => {
    const forcastUrl = `${url_forcast}?q=${location}&units=imperial&appid=${api_kei}`;
    fetchData(forcastUrl).then((data) => {
        forcastEl.innerHTML = '';
        const headline = document.createElement('h2');
        headline.innerHTML = '5-Day Forcast:';
        forcastEl.appendChild(headline);
        const forcastListEl = document.createElement('ul');
        forcastListEl.setAttribute('class', 'forcast-list');
        forcastEl.appendChild(forcastListEl);
        const today = moment().format('YYYY-MM-DD');
        const list = data.list || [];console.log(list);
        for (let i = 0; i < list.length; i++) {
            console.log(today, !list[i].dt_txt.includes(today));
            if (!list[i].dt_txt.includes(today)) {
                if (list[i].dt_txt.includes('15:00:00')) {
                    const newLi = document.createElement('li');
                    const newH4 = document.createElement('h4');
                    const newImg = document.createElement('img');
                    const newP1 = document.createElement('p');
                    const newP2 = document.createElement('p');
                    newH4.textContent = moment(list[i].dt).format('YYYY/MM/DD');
                    newImg.setAttribute('src',`http://openweathermap.org/img/wn/${list[i].weather[0].icon}.png`);
                    newP1.textContent = `Temp: ${list[i].main.temp} °F`;
                    newP2.textContent = `Humidity: ${list[i].main.humidity}%`;
                    newLi.appendChild(newH4);
                    newLi.appendChild(newImg);
                    newLi.appendChild(newP1);
                    newLi.appendChild(newP2);
                    forcastListEl.appendChild(newLi);
                }
            }
            else {
                console.log(list[i].dt_txt,!list[i].dt_txt.includes(today));
            }
        }
    });
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
searchEl.addEventListener('click', getCurrentWeather);

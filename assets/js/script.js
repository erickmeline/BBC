/**
 * Global constants
 */
const url_current = 'https://api.openweathermap.org/data/2.5/weather';
const url_forcast = 'https://api.openweathermap.org/data/2.5/forecast';
const api_kei = '7875554f2197f6cdb5c5b47cbfb1c260';
const search = document.querySelector('button');

/**
 * Fetch request
 */
const fetchData = (url) => {
    fetch(url).then((response) => {
        if (response.ok) {
            response.json().then((data) => {
                console.log('data:',data);
                return data;
            })
        }
        else {
            console.error('Error:', response.statusText);
        }
    }).catch((error) => {
        console.error('Error: no response');
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
 *  Save to local store
 */
const handleSearch = () => {
    let location = document.querySelector('[type="search"').value;
    if (location) {
        const url = `${url_current}?q=${location}&appid=${api_kei}`;
        const data = fetchData(url).then((data) => {console.log(data)});
        // console.log(data);
        // localStorage.setItem('locations', JSON.stringify(locations));

    }
}



/**
 *  Add listeners
 */
search.addEventListener('click', handleSearch);

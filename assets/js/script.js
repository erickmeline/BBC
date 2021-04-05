// globals
const url_current = 'api.openweathermap.org/data/2.5/weather';
const url_forcast = 'api.openweathermap.org/data/2.5/forecast';
const api_kei = '7875554f2197f6cdb5c5b47cbfb1c260';

// fetch data
const fetchData = (url) => {
    fetch(url).then((response) => {
        if ( response.ok ) {
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

const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            return position;
        });
    } else {
        alert('Error: Unable access current location');
    }
}

console.log('position',getLocation());

function formatTimeUnit(unit) {
    return unit < 10 ? '0' + unit : unit;
}

function updateClock() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();

    var day = formatTimeUnit(currentTime.getDate());
    var month = formatTimeUnit(currentTime.getMonth() + 1); // JavaScript counts months from 0 to 11. January is 0, December is 11.
    var year = currentTime.getFullYear().toString().slice(-2); // Extract last two digits of the year

    var formattedTime = formatTimeUnit(hours) + ':' + formatTimeUnit(minutes) + ':' + formatTimeUnit(seconds);
    var formattedDate =  day + '.' + month + '.' + year;

    document.getElementById('clock').textContent = formattedTime;
    document.getElementById('date').textContent = formattedDate;
}

// Update the clock every second
setInterval(updateClock, 1000);

function fetchWeatherData() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.openweathermap.org/data/3.0/onecall?lat=59.22&lon=17.94&exclude=hourly,daily,minutely,alerts&xxx', true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            console.log(data)
            var weatherDescription = data.current;
            var temperature = (data.current.temp - 273.15).toFixed(1); // Convert from Kelvin to Celsius

            var weatherString = `Current Weather: ${weatherDescription}<br>Temperature: ${temperature}°C`;
            var weatherString = `${temperature}`;
            var weatherUv = `${data.current.uvi}`;

            document.getElementById('weather').innerHTML = weatherString;
            document.getElementById('uv').innerHTML = weatherUv;
        } else {
            console.log('Error fetching weather data:', xhr.statusText);
            document.getElementById('weather').textContent = 'Error fetching weather data';
        }
    };

    xhr.onerror = function() {
        console.log('Request error');
        document.getElementById('weather').textContent = 'Error fetching weather data';
    };

    xhr.send();
}

// Fetch weather data initially
fetchWeatherData();

setInterval(fetchWeatherData, 120000);

setInterval(userCounter, 10000);
setInterval(visitCounter, 10000);

function changeTextColor() {
    var elements = document.querySelectorAll("#container");
    var elements = document.querySelectorAll(".bg");
    var colors = ["gray", "#e45858", "#6246ea"]; // Add more colors if needed

    var randomColor = colors[Math.floor(Math.random() * colors.length)];

    document.getElementById('container').style.color = randomColor;

    // Convert NodeList to Array before calling forEach
    Array.prototype.slice.call(elements).forEach(function(element) {
        // element.style.color = randomColor;
        //element.style.color = 'yellow';
    });
}


// Change text color initially
changeTextColor();

// Change text color every 3 hours (10,800,000 milliseconds)
setInterval(changeTextColor, 10000);


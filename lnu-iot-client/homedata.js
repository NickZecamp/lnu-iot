function homeData() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:5014/api/homedata/data', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            document.getElementById('tempIn').innerHTML = data.temperature;
            document.getElementById('humidityIn').innerHTML = data.humidity;
            document.getElementById('light').innerHTML = data.light;
        } else {
            console.log('Error fetching data:', xhr.statusText);
            document.getElementById('goals').textContent = 'Error fetching data';
        }
    };

    xhr.onerror = function(event) {
        console.log('Request error');
        document.getElementById('goals').textContent = 'Request error';
    };

    xhr.send();
}
homeData()
setInterval(homeData, 10000);

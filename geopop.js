const APIKey = "c1233691e202fdcc0abd46da374f3df0";
let resultAPI;

const temperature = document.querySelector('.temperature');
const localization = document.querySelector('.localization');
const futurlogo = document.querySelector('.futurlogo');
const time = document.querySelector('.time');
const country = document.querySelector('.country');
const weatherlogo = document.querySelector('.weatherlogo');


if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {

        let longitude = position.coords.longitude;
        let latitude = position.coords.latitude;
        APICall(longitude, latitude);

    })
}

function APICall(longitude, latitude) {

    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=fr&appid=${APIKey}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        
        console.log(data);
        resultAPI = data;

        time.innerText = data ['weather'][0]['description'];
        temperature.innerText = Math.trunc(data['main']['temp']) + '°C';
        localization.innerText = data ['name'];
        

        weatherlogo.src = `http://openweathermap.org/img/wn/${resultAPI.weather[0].icon}@2x.png`

        
    })
}



let actualHour = new Date().getHours();
if (actualHour >=6 && actualHour < 21) {
    document.getElementById('bodybg').style.background="url(daybackground.png) no-repeat";
    document.getElementById("temp").style.color = '#2c3e50';
    document.getElementById("loc").style.color = '#2c3e50';
    document.getElementById("time").style.color = '#2c3e50';
} else {
    document.getElementById('bodybg').style.background="url(nightbackground.png) no-repeat";
    document.getElementById("temp").style.color = '#dfe4ea';
    document.getElementById("loc").style.color = '#a4b0be';
    document.getElementById("time").style.color = '#dfe4ea';
}



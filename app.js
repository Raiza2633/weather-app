let loc = document.getElementById("location");
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let iconfile;
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");


searchButton.addEventListener('click', (e) => {

    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value = '';


});


const getWeather = async (city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=21ebd1093214bb2e0ea7c63089aeba68`,
           {mode: 'cors'}
        );

        const weatherData = await response.json();
        console.log(weatherData);
        const { name } = weatherData;
        const { feels_like } = weatherData.main;
        const { id, main } = weatherData.weather[0];
        loc.textContent = name;
        climate.textContent = main;
        tempvalue.textContent = Math.round(feels_like - 273);

        if (id < 300 && id > 200) {
            tempicon.src = "./icons/thunderstrom.png"
        } else
            if (id < 400 && id > 300) {
                tempicon.src = "./icons/clouds.png"
            }
            else if (id < 600 && id > 500) {
                tempicon.src = "./icons/rain.png"
            }
            else if (id < 700 && id > 600) {
                tempicon.src = "./icons/snowman.png"
            }
            else if (id < 800 && id > 700) {
                tempicon.src = "./icons/cloud.png"
            }
            else if (id == 800) {
                tempicon.src = "./icons/sun.png"
            }
    }
catch(error)
{
    alert('city not found');
}

};














window.addEventListener("load", () => {
    let long;
    let lat;
    console.log('first time')

    if (navigator.geolocation) {
        console.log('second time')
        navigator.geolocation.getCurrentPosition((position) => {
            console.log('third time')
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";
            console.log("im running")

            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=21ebd1093214bb2e0ea7c63089aeba68`

            fetch(api).then((response) => {
                return response.json();
            }).then(data => {
                const { name } = data;
                const { feels_like } = data.main;
                const { id, main } = data.weather[0];

                loc.textContent = name;
                climate.textContent = main;
                tempvalue.textContent = Math.round(feels_like - 273);
                if (id < 300 && id > 200) {
                    tempicon.src = "./icons/thunderstrom.png"
                } else
                    if (id < 400 && id > 300) {
                        tempicon.src = "./icons/clouds.png"
                    }
                    else if (id < 600 && id > 500) {
                        tempicon.src = "./icons/rain.png"
                    }
                    else if (id < 700 && id > 600) {
                        tempicon.src = "./icons/snowman.png"
                    }
                    else if (id < 800 && id > 700) {
                        tempicon.src = "./icons/cloud.png"
                    }
                    else if (id == 800) {
                        tempicon.src = "./icons/sun.png"
                    }


                console.log(data);
            })



        })

    }
})
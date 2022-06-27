const express = require('express');
const app = express();
const axios = require('axios').default;
// Use body parser
app.use(express.urlencoded({ extended: true }));
// Get Home Page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})
// Post Request
app.post('/', (req, res) => {
    const { city } = req.body;
    // API Request
    async function getWeatherData(city) {
        const apiKey = "41b599203e72b1b2dc27fcbe5b8ea63b";
        const unit = "imperial"
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`);
            const { data } = response;
            const { name, weather, main } = data;
            const icon = weather[0].icon;
            const image = `http://openweathermap.org/img/wn/${icon}@2x.png`
            res.write(`<p>Here is the weather for <b>${name}</b></p>`);
            res.write(`<h2>${main.temp}</h2>`)
            res.write(`<h3>${weather[0].description}</h3>`)
            res.write(`<img src=${image}>`);
            res.send();
        } catch (error) {
            res.send(error)
        }
    }
    getWeatherData(city);
})






















// App Listen
app.listen(3000, function () {
    console.log(`LISTENING ON PORT 3000`)
})
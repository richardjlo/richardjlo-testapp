const rp = require('request-promise');
const openWeatherApiKey = process.env.OPEN_WEATHER_API_KEY;

module.exports.getWeather = (city, res, next) => {
  let url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city +
    '&units=imperial&appid=' + openWeatherApiKey;
  rp(url, (error, response, body) => {
    let result = JSON.parse(body);
    let temp = result.main.temp;
    let weatherStr = 'It\'s currently '+ temp + '℉ in ' + city;
    res.send(weatherStr);
  })
  .then((body) => {
    // console.log('All done');
  })
  .catch(function(error) {
    next(error);
  });
};

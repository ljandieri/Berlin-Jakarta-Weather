const axios = require('axios')

async function getWeatherData(azure_key,BerlinLoc,JakartaLoc,USE_API){

    forecastDataBerlin = null
    forecastDataJakarta = null
    if (USE_API) {   
      const url = `https://atlas.microsoft.com/weather/forecast/daily/json?api-version=1.1&query=${BerlinLoc}&duration=15&subscription-key=${azure_key}`
      const response = await axios.get(url)
      forecastDataBerlin = response.data['forecasts']
  
      const url2 = `https://atlas.microsoft.com/weather/forecast/daily/json?api-version=1.1&query=${JakartaLoc}&duration=15&subscription-key=${azure_key}`
      const responseJakarta = await axios.get(url2)
      forecastDataJakarta = responseJakarta.data['forecasts']

    } else {
      var data = require('./test.json'); //(with path)
      forecastDataBerlin = data['forecasts'];
      forecastDataJakarta = forecastDataBerlin
    }
    return {'Berlin':forecastDataBerlin,
            'Jakarta':forecastDataJakarta
            }
}

module.exports = getWeatherData
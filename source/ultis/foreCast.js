const request = require('request')


const forecast = ( latitude, longtitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=53560e40448b138e94d54fd6fd477b74&query=' + latitude + ','+ longtitude + '&&units=m'


                                // cai nay la callback function
  request({url, json: true}, (error, {body}) => {

      if(error)
        {
            callback('Weather is not available', undefined)
        }else if (body.error)
        {
            callback("Can't find location", undefined)
        }
        else{
            callback(undefined,
                {
                        Location: body.location.name,
                        Weather: body.current.weather_descriptions[0] ,
                        Temperature: body.current.temperature,
                        Feelslike: body.current.feelslike 
                }
                )
        }
    })

}


    
module.exports = forecast

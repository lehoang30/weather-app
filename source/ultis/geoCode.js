const request = require('request')




const geoCode = (address, callback) =>{
    const url  = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibGVob2FuZ2ciLCJhIjoiY2w1cnpnc3l1MDU0MjNsbWkzZHlic3BhayJ9.EN6i_vamGrkVDYUBAKaSEQ&limit=1'
    request({url, json: true}, (error, {body}) => {

        if(error)
        {
            callback('Weather is not available!', undefined)
        }else if(body.features.length === 0){
            callback("unable to search", undefined)
        }
        else{
            callback(undefined,{ 
            
             place:   body.features[0].place_name ,
             longtitude: body.features[0].center[0] ,
             latitude: body.features[0].center[1] 
        
        }
        )

        }
            
        
    })
}
module.exports = geoCode
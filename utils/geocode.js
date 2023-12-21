const request = require('request')

const geoCode = (address, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidmlnaG5lc2gyOTE5OTkiLCJhIjoiY2xxMjk3czc0MDFwNTJyb2ZjNGJ4bnRodiJ9.nuhgSxgAAoFww0VrZis9Ag&limit=1`

    // const url =' https://api.mapbox.com/geocoding/v5/mapbox.places/$%7Baddress%7D.json?access_token=pk.eyJ1IjoidmlnaG5lc2gyOTE5OTkiLCJhIjoiY2xxMjk3czc0MDFwNTJyb2ZjNGJ4bnRodiJ9.nuhgSxgAAoFww0VrZis9Ag&limit=1'
    request({ url, json: true }, (error,{body} ) => {
        if (error) {
            callback('unable to find loaction', undefined)
        } else if (body.length == 0) {
            callback('Please provide valid  address', undefined)
        } else {
            callback(undefined, {
                lattitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                placename: body.features[0].place_name,
            })
        }
    })
}





module.exports = geoCode
const url = (city) => `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${city}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`

function searchCity(city) {
  return fetch(url(city))
    .then(res => res.json())
    .then(json => {
      if (!json || json.query.count === 0)
        throw new Error('City not found!')
      else
        return json
    })
}

module.exports = { searchCity }

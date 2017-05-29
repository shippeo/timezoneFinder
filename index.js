console.time('load timezone');
var geoTz = require('geo-tz')
console.timeEnd('load timezone');

var countryCodes = require('./countryCodes.js');
countryCodes = countryCodes.countryCodes;
console.log('Country Codes quantity : ' + Object.keys(countryCodes).length);

var express = require('express');
var app = express();

// Set content type GLOBALLY for any response.
app.use(function (req, res, next) {
  res.contentType('application/json');
  next();
});

app.get('/', function (req, res) {
  var tz = {};
  tz['lat'] = parseFloat(req.query['lat'].replace(',', '.'))
  tz['lon'] = parseFloat(req.query['lon'].replace(',', '.'))

  if( !tz['lat'] || !tz['lon'] ||
      tz['lat'] > 90 || tz['lat'] < -90 ||
      tz['lon'] > 180 || tz['lon'] < -180 ){
    res.status(400).send('Bad request ');
    return;
  }

  tz['timezone'] = geoTz.tz(tz['lat'], tz['lon']);
  tz['countryCodeIsoA2'] = countryCodes[tz['timezone'].toLowerCase()];

  res.send(JSON.stringify(tz));
  console.log("Lat: " + tz['lat'] + ' / ' + "Lon: " + tz['lon'] + ' => ' + tz['timezone']);
});

app.listen(8080, function () {
  console.log('timezoneFinder  app listening on port 8080!');
});


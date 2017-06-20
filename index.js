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
  if(req.query['lat']){
    tz['lat'] = parseFloat(req.query['lat'].replace(',', '.'))
  }
  if(req.query['lng']){
    tz['lng'] = parseFloat(req.query['lng'].replace(',', '.'))
  }
  //TEMP FIX to remove
  if(req.query['lon']){
    tz['lng'] = parseFloat(req.query['lon'].replace(',', '.'))
  }

  if( !tz['lat'] || !tz['lng'] ||
      tz['lat'] > 90 || tz['lat'] < -90 ||
      tz['lng'] > 180 || tz['lng'] < -180 ){
    res.status(400).send('Bad request ');
    return;
  }

  tz['timezone'] = geoTz.tz(tz['lat'], tz['lng']);
  if(tz['timezone']){
    tz['countryCodeIsoA2'] = countryCodes[tz['timezone'].toLowerCase()];
  }else{
    console.log("Lat: " + tz['lat'] + ' / ' + "Lng: " + tz['lng'] + ' => ' + 'No Timezone');
  }

  res.send(JSON.stringify(tz));
  console.log("Lat: " + tz['lat'] + ' / ' + "Lng: " + tz['lng'] + ' => ' + tz['timezone']);
});

app.listen(8080, function () {
  console.log('timezoneFinder  app listening on port 8080!');
});


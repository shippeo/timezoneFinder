# timezoneFinder

## How to run it

```bash
git clone https://github.com/shippeo/timezoneFinder.git && cd timezoneFinder
npm i
npm start
```

## Request format

* Only two mandatory parameters : `lat` and `lon`
* Decimal separator : comma or dot

examples :

* `http://(host):8080/?lat=3,2343&lon=22,22`
* `http://(host):8080/?lat=3.2343&lon=22.22`

## Response format

```javascript
{
  "lat": 3.2343,
  "lon": 22.22,
  "timezone": "Africa/Kinshasa"
}
```

* Return `"timezone": "null"` if no timezone can be determine at coordinates
* Return HTTP error 400 for invalid input

## coordinates examples

### France
[Europe/Paris](https://goo.gl/maps/PLFRdwktTSz)  => http://(host):8080/?lat=50.286&lon=4.165

### Belgium
[Europe/Brussels](https://goo.gl/maps/HtnkDeehogD2) => http://(host):8080/?lat=50.286&lon=4.171

## Dependencies

timezoneFinder is based on :
* [geo-tz node module](https://github.com/evansiroky/node-geo-tz)
* [expressjs](http://expressjs.com/)



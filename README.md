# timezoneFinder

## Request

`http://(host):8080/?lat=3,2343&lon=22,22`

`http://(host):8080/?lat=3.2343&lon=22.22`

## Response

```javascript
{
  "lat": 3.2343,
  "lon": 22.22,
  "timezone": "Africa/Kinshasa"
}
```

Return `null`if no timezone can be determine at coordinates

Return HTTP error 400 for invalid input

## coordinates examples

### France
[France](https://goo.gl/maps/PLFRdwktTSz)  => http://tz.shippeo.com/?lat=50.286&lon=4.165

### Belgium
[Belgium](https://goo.gl/maps/HtnkDeehogD2) => http://tz.shippeo.com/?lat=50.286&lon=4.171


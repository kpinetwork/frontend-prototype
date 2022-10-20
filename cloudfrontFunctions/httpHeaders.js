/* eslint-disable */

function handler(event) {
  var response = event.response;
  var headers = response.headers;

  headers['access-control-allow-origin'] = { value: '*' }
  headers['strict-transport-security'] = { value: 'max-age=63072000; includeSubdomains; preload'};
  headers['x-content-type-options'] = { value: 'nosniff'};
  headers['x-frame-options'] = {value: 'DENY'};
  headers['x-xss-protection'] = {value: '1; mode=block'};
  headers['referrer-policy'] = {value: 'same-origin'};
  headers['content-security-policy'] = { value: "script-src 'sha256-VmzytIIBrczpGcIG1mT4Y9SztLCOWxsfN37i9RoxSLo=';script-src-elem 'self' 'sha256-VmzytIIBrczpGcIG1mT4Y9SztLCOWxsfN37i9RoxSLo=' ;object-src 'none'; connect-src 'self' https://cognito-idp.us-west-2.amazonaws.com/ *.kpinetwork.com *.execute-api.us-west-2.amazonaws.com/demo *.execute-api.us-west-2.amazonaws.com/prod; img-src 'self' data; media-src 'none' ; font-src 'self'; manifest-src 'none'; prefetch-src 'none'; frame-src 'none'; form-action 'none'; frame-ancestors 'none';"};
  return response;
}

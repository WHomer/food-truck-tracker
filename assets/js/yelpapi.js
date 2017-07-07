
// to test this code use bash, go to the folder and enter "node yelpA.jspi"
'use strict';



const yelp = require('yelp-fusion');


// Place holders for Yelp Fusion's OAuth 2.0 credentials. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const clientId = 'jBPRDrNg2NHUe1maKfuxBg';
const clientSecret = 'XWDjn5nsQMcczQSCh0BJDaupZHjd0GiBCFqcjIig0Izsakeb9HjoXx6JKRt5YMrR';

const searchRequest = {
  term:'Food Truck',
  location: 'Chicago, IL'
};

yelp.accessToken(clientId, clientSecret).then(response => {
  const client = yelp.client(response.jsonBody.access_token);

//Insert food truck name here
client.reviews('the-fat-shallot-chicago').then(response => {
  console.log(response.jsonBody.reviews[0].text);
}).catch(e => {
  console.log(e);
$(".truck-list-detail").html(yelp);



});
});


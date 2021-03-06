//use (your) Foursquare credentials to fetch info: venue ID and details

const client_id='03TJDROYSIKO0BYSOTT3H4FVVB4NFQJCPOUKSZ1OGLTDJFJW';
const client_secret='W3Y2VQ2TIR4AK4ZYMB30ZAYVC3XRMLYYFHDJFMOPIPVG1ZQJ';
const url = "https://api.foursquare.com/v2";
const v = "20181008";
const limit = 1;

export const searchID = (lat, lng, name) => fetch(
	`${url}/venues/search?ll=${lat},${lng}&query=${name}&limit=${limit}&client_id=${client_id}&client_secret=${client_secret}&v=${v}`)
		.then(response => response.json())
		.then(response => response.response.venues[0].id)
		.catch(error => alert('Cannot access Foursquare data. Please check your credentials or Foursquare URL.'))

export const getVenueDetails = (id) => fetch(
	`${url}/venues/${id}?&client_id=${client_id}&client_secret=${client_secret}&v=${v}`)
  	.then(response => response.json())
    .catch('error')

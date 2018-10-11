const CLIENT_ID='VBWDK1BIW412NV2YPHAJMDFMHRZHQNL04ZYCK4KF1JWECWMJ';
const CLIENT_SECRET='3ZSICYJQLLAMEHYCUOMEM0AIUCLX3FHANQSEAZYA0YHF02TJ';
//const CLIENT_ID='03TJDROYSIKO0BYSOTT3H4FVVB4NFQJCPOUKSZ1OGLTDJFJW';
//const CLIENT_SECRET='W3Y2VQ2TIR4AK4ZYMB30ZAYVC3XRMLYYFHDJFMOPIPVG1ZQJ';
const API = "https://api.foursquare.com/v2";
const VERSION = "20181008";

const SEARCH_RESULTS = 1;

/**
*Use lat, lng & name to fetch a venue id from FourSquare.
*/
export const getSearchResult = (lat, lng, name) => fetch(
	`${API}/venues/search?ll=${lat},${lng}&query=${name}&limit=${SEARCH_RESULTS}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION}`)
	  	.then(response=>response.json())
	  	.then(response=>response.response.venues[0].id)
	  	.catch('error')
/**
*Use FourSquare id to return array of details about a place.
*/
export const getDetails = (id) => fetch(
	`${API}/venues/${id}?&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION}`)
  	.then(response => response.json())
    .catch('error')

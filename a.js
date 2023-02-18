const crypto = require('crypto');
const { constants } = require('fs');

const method = 'GET';
const url = 'https://sandbox.woohoo.in/rest/v3/catalog/products/sku';
const encodedUrl = encodeURIComponent(url);

const fullurl = `${method}&${encodedUrl}`;

// url encode the base string
console.log(fullurl);

const signingKey = '6fd59feb7effbde5d3c1fba488db6e1a';

const signature = crypto.createHmac('sha512', signingKey).update(fullurl).digest('hex').toString()

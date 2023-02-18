const router = require('express').Router();
// default import axios 
const { default: axios } = require('axios');
const moment = require('moment');
const { getSignatures } = require('../func');

router.get("/", (req, res) => {
    const { token } = req.query;

    // const method = 'GET';
    // const url = 'https://sandbox.woohoo.in/rest/v3/catalog/categories?q=1';

    // const encodedUrl = encodeURIComponent(url);
    // const fullurl = `${method}&${encodedUrl}`;
    // // url encode the base string
    // // console.log(fullurl);

    // const signingKey = '6fd59feb7effbde5d3c1fba488db6e1a';
    // const signature = crypto.createHmac('sha512', signingKey).update(fullurl).digest('hex').toString();

    const signature = getSignatures('GET', 'https://sandbox.woohoo.in/rest/v3/catalog/categories?q=1')

    try {
        axios.get("https://sandbox.woohoo.in/rest/v3/catalog/categories?q=1", {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": `Bearer ${token}`,
                "dateAtClient": moment().toISOString(),
                "signature": signature
            }
        }).then(data => {
            return res.json({
                data: data.data
            })
        })
    } catch (e) {
        return res.json({
            message: e.message
        })
    }
})


module.exports = router;
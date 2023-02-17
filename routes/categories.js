const router = require('express').Router();
// default import axios 
const { default: axios } = require('axios');
const moment = require('moment');
const crypto = require('crypto')



router.get("/", (req, res) => {
    const { token } = req.query;

    const method = 'GET';
    const url = 'https://sandbox.woohoo.in/rest/v3/catalog/categories?q=1';

    const baseString = `${method}&${url}`;

    // url encode the base string
    const baseStringEncoded = encodeURIComponent(baseString);

    const signingKey = '6fd59feb7effbde5d3c1fba488db6e1a';
    const signature = crypto.createHmac('sha256', signingKey)
                     .update(baseStringEncoded)
                     .digest('base64');

    try {
        axios.get("https://sandbox.woohoo.in/rest/v3/catalog/categories?q=1", {
            headers: {
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
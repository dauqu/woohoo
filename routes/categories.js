const router = require('express').Router();
// default import axios 
const { default: axios } = require('axios');
const moment = require('moment');
const { getSignatures } = require('../func');

router.get("/", (req, res) => {
    const { token } = req.query;

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
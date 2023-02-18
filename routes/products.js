const router = require('express').Router();

const { getSignatures } = require('../func');
const moment = require('moment');

router.get("/", (req, res) => {
    const { token, categoryId } = req.query;
    let url = `https://sandbox.woohoo.in/rest/v3/catalog/categories/${categoryId}/products?offset=offset&limit=limit`;

    const signature = getSignatures("GET", url);

    try {
        axios.get("url", {
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
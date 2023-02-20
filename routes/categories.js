const router = require('express').Router();
const { default: axios } = require('axios');
const moment = require('moment');
const { getSignatures, getToken } = require('../func');
const Category = require('../models/category_schema');


router.get("/", async (req, res) => {
    const token = await getToken();

    const allCats = await Category.find({});
    if (allCats.length > 0 && moment().subtract(5, 'minute') > allCats[0].updatedAt) {
        return res.json({
            data: allCats
        })
    }


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
        }).then(async (data) => {
            const newCat = await Category.create(
                data.data
            );

            console.log(newCat);

            return res.json({
                data: newCat
            })
        })
    } catch (e) {
        return res.json({
            message: e.message
        })
    }
})


module.exports = router;
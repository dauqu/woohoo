const router = require('express').Router();

const { getSignatures, getToken } = require('../func');
const moment = require('moment');
const { default: axios } = require('axios');

router.get("/", async (req, res) => {
    let token = await getToken();
    const { categoryId } = req.query;
    let url = `https://sandbox.woohoo.in/rest/v3/catalog/categories/${categoryId}/products`;

    const signature = getSignatures("GET", url);

    try {
        axios.get(url, {
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
        }).catch(e => {
            return res.json({
                message: e.response.data
            })
        })
    } catch (e) {
        return res.json({
            message: e.message
        })
    }
})

// GET Product by sku 
router.get("/sku/:sku", async (req, res) => {
    const { sku } = req.params;
    let token = await getToken();

    let url = `https://sandbox.woohoo.in/rest/v3/catalog/products/${sku}`;
    const signature = getSignatures("GET", url);
    try {
        const response = await axios.get(url, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": `Bearer ${token}`,
                "dateAtClient": moment().toISOString(),
                "signature": signature
            }
        })

        return res.json({
            data: response.data
        })
    } catch (e) {
        return res.json({
            message: e.message
        })
    }
})

// create new order
router.post("/", async (req, res) => {
    const {
        address,
        billing,
        isConsolidated,
        payments,
        orderType,
        refno,
        remarks,
        deliveryMode,
        egvDeliveryType,
        products,
        otp,
        coBrandImageId,
        cardnumber
    } = req.body;
    let token = await getToken();

    let url = `https://sandbox.woohoo.in/rest/v3/orders`;
    const signature = getSignatures("POST", url, body);
    try {
        const response = await axios.post(url, {
            address,
            billing,
            isConsolidated,
            payments,
            orderType,
            refno,
            remarks,
            deliveryMode,
            egvDeliveryType,
            products,
            otp,
            coBrandImageId,
            cardnumber
        }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": `Bearer ${token}`,
                "dateAtClient": moment().toISOString(),
                "signature": signature
            }
        })

        return res.json({
            data: response.data
        })
    } catch (e) {
        return res.json({
            message: e.message
        })
    }
})




module.exports = router;
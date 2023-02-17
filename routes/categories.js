const router = require('express').Router();
// default import axios 
const {default: axios} = require('axios');
const {token} = require('./constant')

router.get("/categories", (req, res) => {
    try{
        axios.get("https://sandbox.woohoo.in/rest/v3/catalog/categories/id", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(data => {
            return res.json({
                data: data.data
            })
        })
    }catch(e){
        return res.json({
            message: e.message
        })
    }
})


module.exports = router;
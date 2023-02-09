const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/:id", (req, res) => {
  //Get auth code from id
  const authorizationCode = req.params.id;
  const url = "https://sandbox.woohoo.in/rest/v3/orders";

  //Get request with bearer token
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${authorizationCode}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        res.send(response.data);
      } else {
        console.error(response.data);
      }
    });
});

module.exports = router;

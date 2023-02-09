const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/:id", async (req, res) => {
  try {
    const token = req.params.id;
    const url =
      "https://sandbox.woohoo.in/rest/v3/catalog/categories?q=1";

    const response = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (response.status === 200) {
      console.log(response.data);
      res.send(response.data);
    } else {
      console.error(response.data);
      res.status(response.status).send(response.data);
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ error: "An error occurred while processing the request." });
  }
});

module.exports = router;

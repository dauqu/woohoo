const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res) => {
  //Axios post request to the auth server
  $url = "https://sandbox.woohoo.in/oauth2/verify";

  $clientId = "d70aad72e6ca71e7d2114a38bfd4630a";
  $username = "techtreeapisandboxb2b@woohoo.in";
  $password = "techtreeapisandboxb2b@123";

  //Post request to the auth server
  axios
    .post($url, {
      client_id: $clientId,
      username: $username,
      password: $password,
    })
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

module.exports = router;

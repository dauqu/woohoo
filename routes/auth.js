const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res) => {

  var clientId = "d70aad72e6ca71e7d2114a38bfd4630a";
  var username = "techtreeapisandboxb2b@woohoo.in";
  var password = "techtreeapisandboxb2b@123";

  const data = {
    clientId,
    username,
    password,
  };

  axios
    .post("https://sandbox.woohoo.in/oauth2/verify", data)
    .then((response) => {
      const authorizationCode = response.data.authorizationCode;
      if (authorizationCode) {
        console.log(authorizationCode);
        getToken(authorizationCode)
          .then((bearerToken) => {
            console.log(bearerToken);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        console.error("Error while getting authorization code");
      }
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;

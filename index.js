const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const app = express();
const port = 3000;
const organizationId = "76974546";

app.get("/", (req, res) => {
  res.send("Healthy");
});
app.get("/health", (req, res) => {
  res.send("Healthy");
});
/** app.get("/auth", (req, res) => {
  const code = req.query.code;
  const authUrl = `https://www.linkedin.com/oauth/v2/accessToken`;

  console.log("CODE: ", code);
  const data = {
    code: code,
    grant_type: "authorization_code",
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: "https://localhost:3000/auth",
  };
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  axios.post(authUrl, data, config).then().catch();

  res.send("HELLO");
});
*/

app.listen(port, () => {
  console.log("LISTENING");
});

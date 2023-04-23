const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const app = express();
require("dotenv").config();
const port = 3000;
const organizationId = "76974546";

let cacheCount = 0;

app.get("/", (req, res) => {
  axios
    .get(
      "https://www.linkedin.com/pages-extensions/FollowCompany?id=76974546&counter=bottom"
    )

    .then((response) => {
      const htmlData = response.data;
      const $ = cheerio.load(htmlData);

      const followerElement = $(".follower-count")[0].children[0].data;

      const followerValue = followerElement.replace(",", "");
      if (followerValue !== cacheCount) {
        cacheCount = Number(followerValue);
      }

      res.send({ number: +followerValue });
    })
    .catch(() => res.send({ number: 55 }));
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

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log("LISTENING");
});

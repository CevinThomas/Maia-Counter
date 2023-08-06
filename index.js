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
      cacheCount = Number(followerValue);

      res.send({ number: +followerValue});
    })
    .catch(() => res.send({ number: cacheCount}));
});
app.get("/health", (req, res) => {
  res.send("Healthy");
});


app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log("LISTENING");
  console.log("UP AND RUNNING")
});

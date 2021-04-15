const express = require("express");
const axios = require("axios");

const router = express.Router();

// return all favorite images
router.get("/:q", (req, res) => {
  const searchTerm = req.params.q;
  console.log(searchTerm);

  //console.log(`query is ${searchTerm}`);
  const GIPHY_URL = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${searchTerm}&limit=15`;
  //console.log(`GIPHY URL is ${GIPHY_URL}`);
  axios
    .get(GIPHY_URL)
    .then((response) => {
      res.send(response.data.data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;

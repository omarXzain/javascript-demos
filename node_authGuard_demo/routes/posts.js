const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/api/posts", async (req, res) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts/1"
    );

    res.json(response.data);
    console.log(response.data);
  } catch (error) {
    console.log("erro", error);
  }
});

module.exports = router;

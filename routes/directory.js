const express = require("express");

const router = express.Router();

router.get("/get", (request, response) => {
  response.send("/get api directory called");
});

module.exports = router;

const express = require("express");

const router = express.Router();

router.get("/get", (request, response) => {
  response.send("/get api files called");
});

module.exports = router;

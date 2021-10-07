const express = require("express");

const router = express.Router();

router.get("/view", (request, response) => {
  response.send("/view api secret called");
});

router.get("/list", (request, response) => {
  response.send("/list api secret called");
});

module.exports = router;

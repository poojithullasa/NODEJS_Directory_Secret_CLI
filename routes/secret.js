const express = require("express");
const { viewSecret } = require("../controllers/viewSecret");
const { listSecret } = require("../controllers/listSecret");

const router = express.Router();

router.get("/view", viewSecret);

router.get("/list", listSecret);

module.exports = router;

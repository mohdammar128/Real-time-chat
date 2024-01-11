const express = require("express");
const router = express.Router();
const { createMessage } = require("../controller/messageController");
const authorization = require("../middleware/authorization");
router.route("/").post(authorization, createMessage);

module.exports = router;

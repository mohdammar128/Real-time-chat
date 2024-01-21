const express = require("express");
const router = express.Router();
const {
  createMessage,
  fectchAllMessages,
} = require("../controller/messageController");

const authorization = require("../middleware/authorization");
router.route("/create-message").post(authorization, createMessage);
router.route("/:chatId").get(authorization, fectchAllMessages);

module.exports = router;

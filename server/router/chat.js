const express = require("express");

const router = express.Router();
const authorization = require("../middleware/authorization");
const {
  accessChat,
  fetchAllChats,
  createGroupChat,
  renameGroup,
  removeUserFromGroup,
  addUserToGroup,
} = require("../controller/Chat");
router.route("/chat").post(authorization, accessChat);
router.route("/chat").get(authorization, fetchAllChats);
router.post("/chat/group", authorization, createGroupChat);
router.put("/chat/rename", authorization, renameGroup);
router.put("/chat/remove-user", authorization, removeUserFromGroup);
router.put("/chat/add-user", authorization, addUserToGroup);

module.exports = router;

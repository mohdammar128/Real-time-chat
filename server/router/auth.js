const { signUp, signIn, getAllUser } = require("../controller/Auth");
const authorization = require("../middleware/authorization");
const express = require("express");

const router = express.Router();

router.route("/auth/sign-up").post(signUp);
router.get("/auth/user", authorization, getAllUser);
router.post("/auth/sign-in", signIn);

module.exports = router;

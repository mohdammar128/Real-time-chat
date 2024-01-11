const jwt = require("jsonwebtoken");
require("dotenv").config();

const genrateToken = (id) => {
  let token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "10h",
  });
  return token;
};

module.exports = genrateToken;

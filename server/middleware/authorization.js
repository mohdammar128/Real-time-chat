const jwt = require("jsonwebtoken");
require("dotenv").config();

const authorization = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log(token);
    if (!token) {
      return res.status(404).json({
        sucess: false,
        message: "token not found in header",
      });
    }
    try {
      const idOfCurrUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.currUser = idOfCurrUser;
    } catch (error) {
      return res.status(401).json({
        sucess: false,
        message: "token is invalid",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "server side error",
    });
  }
};

module.exports = authorization;

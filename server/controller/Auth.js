const User = require("../models//userModel");
const bcrypt = require("bcrypt");
const genrateToken = require("../config/genrateToken");
const signUp = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password, profilePic } = req.body;
    let hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      profilePic,
    }); //it will create new user
    //How to save this new user into data base
    const saveNewUserDetails = await newUser.save();
    console.log(saveNewUserDetails);
    res.json({
      sucess: true,
      message: "Succesfully saved",
      data: saveNewUserDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Serve side error",
      errorMessage: error,
    });
  }
};

const signIn = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const userDetails = await User.findOne({ email });
    console.log(userDetails);
    if (
      !userDetails.email ||
      !(await bcrypt.compare(password, userDetails.password))
    ) {
      return res.json({
        success: false,
        message: "please enter correct email",
      });
    }
    res.json({
      sucess: true,
      message: "Successfully Login",
      data: userDetails,
      token: genrateToken(userDetails._id),
    });
  } catch (error) {
    res.json({
      success: false,
      message: "server side issue",
    });
  }
};
// api/v1/user?search="siddarth"
const getAllUser = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search } },
          { email: { $regex: req.query.search } },
        ],
      }
    : {};
  const users = await User.find(keyword).find({
    _id: { $ne: req.currUser.id },
  });
  res.send(users);
};

module.exports = { signUp, signIn, getAllUser };

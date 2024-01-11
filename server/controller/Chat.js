const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const accessChat = async (req, res) => {
  try {
    const userId = req.body.id;
    console.log(userId);
    if (!userId) {
      return res.status(400).json({
        sucess: false,
        message: "please send user Id",
      });
    }
    let isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.currUser.id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage")
      .exec();
    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name email profilePic",
    });
    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      let chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.currUser.id, userId],
      };
      try {
        const createdChat = await Chat.create(chatData);
        const fullChat = await Chat.findOne({ _id: createdChat._id })
          .populate("users", "-password")
          .exec();

        res.status(200).send(fullChat);
      } catch (error) {
        res.status(400);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const fetchAllChats = async (req, res) => {
  try {
    const getAllChats = await Chat.find({
      users: { $elemMatch: { $eq: req.currUser.id } },
    })

      .populate("users", "-password")
      .sort({ updatedAt: 1, createdAt: 1 })
      .exec();
    console.log(getAllChats);
    res.status(200).send(getAllChats);
  } catch (error) {
    console.error(error);
  }
};

const createGroupChat = async (req, res) => {
  try {
    const { chatName, users } = req.body;
    if (!chatName || !users) {
      return res.status(400).json({
        sucess: false,
        message: "please send chatName and users",
      });
    }
    users.push(req.currUser.id);

    const newGroupChat = new Chat({
      chatName,
      isGroupChat: true,
      users,
      groupAdmin: req.currUser.id,
    });
    newGroupChat.save();
    res.status(200).json({
      sucess: true,
      message: "group chat created",
      data: newGroupChat,
    });
  } catch (error) {
    console.error(error);
  }
};

const renameGroup = async (req, res) => {
  try {
    const { _id, chatName } = req.body;
    console.log(_id, chatName);
    const updatedChatName = await Chat.updateOne(
      { _id },
      { $set: { chatName } },
      { new: true }
    );
    res.json({
      sucess: true,
      data: updatedChatName,
    });
  } catch (error) {
    res.json({
      sucess: false,
      error: error.message,
    });
  }
};

const removeUserFromGroup = async (req, res) => {
  try {
    const { groupId, userId } = req.body;
    // find Group Admin
    const groupAdmin = await Chat.findOne({ _id: groupId })
      .select("groupAdmin")
      .exec();
    console.log(groupAdmin.groupAdmin, req.currUser.id);
    if (req.currUser.id != groupAdmin.groupAdmin) {
      return res.status(400).json({
        sucess: false,
        message: "you are not admin of this group",
      });
    }

    const updatedGroup = await Chat.updateOne(
      { _id: groupId },
      { $pull: { users: userId } },
      { new: true }
    );
    res.json({
      sucess: true,
      data: updatedGroup,
    });
  } catch (error) {
    res.json({
      sucess: false,
      error: error.message,
    });
  }
};

const addUserToGroup = async (req, res) => {
  const { groupId, userIds } = req.body;
  try {
    // find Group Admin
    const admin = await Chat.findOne({ _id: groupId }).select("groupAdmin");
    if (req.currUser.id != admin.groupAdmin) {
      return res.status(400).json({
        sucess: false,
        message: "you are not admin of this group",
      });
    }
    const updatedGroup = await Chat.updateOne(
      { _id: groupId },
      { $addToSet: { users: { $each: userIds } } },
      { new: true }
    );
    res.json({
      sucess: true,
      data: updatedGroup,
    });
  } catch (error) {
    res.json({
      sucess: false,
      error: error.message,
    });
  }
};
module.exports = {
  accessChat,
  fetchAllChats,
  createGroupChat,
  renameGroup,
  removeUserFromGroup,
  addUserToGroup,
};

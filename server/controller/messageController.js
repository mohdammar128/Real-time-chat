const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const createMessage = async (req, res) => {
  const { content, chatId } = req.body;

  try {
    if (!content || !chatId) {
      return res.json({
        success: false,
        message: "Invalid ChatId or please provide content",
      });
    }

    const newMessage = await Message.create({
      sender: req.currUser.id,
      content,
      chat: chatId,
    });

    // let savedMessage = await newMessage.populate("sender chat");
    console.log("THis is new messafe", newMessage);
    // savedMessage = await User.populate(savedMessage, {
    //   path: "chat.users",
    //   select: "name email",
    // });
    await Chat.findByIdAndUpdate(
      chatId,
      {
        latestMessage: newMessage,
      },
      { new: true } // to return the modified document
    );

    res.status(201).send(newMessage);
  } catch (error) {
    console.error("Error in createMessage:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const fectchAllMessages = async (req, res) => {
  const chatId = req.params.chatId;

  console.log(req.params);
  try {
    let getChats = await Message.find({ chat: chatId }).exec();
    if (getChats) {
      console.log("This is  fectched message", getChats);
    }
    res.send(getChats);
  } catch (error) {
    res.send(error);
  }
};

module.exports = { createMessage, fectchAllMessages };

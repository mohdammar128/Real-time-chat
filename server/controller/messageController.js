const Message = require("../models/messageModel");
// const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const createMessage = async (req, res) => {
  const { content, chatId } = req.body;
  try {
    if (!content || !chatId) {
      return res.json({
        sucess: false,
        message: "Invalid ChatId or please provide content",
      });
    }
    const newMessage = await Message.create({
      sender: req.currUser.id,
      content,
      chat: chatId,
    });
    await Chat.findByIdAndUpdate(
      { _id: chatId },
      {
        lattestMessage: newMessage,
      }
    );
    const savedMessage = await newMessage.save().populate("sender,chat").exec();

    res.status(201).json({ savedMessage });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = { createMessage };

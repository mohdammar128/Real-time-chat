import React from "react";
import SideDrawer from "../Component/ChatPage/SideDrawer";
import MyChat from "../Component/ChatPage/MyChat";
import ChatBox from "../Component/ChatPage/ChatBox";
import { useChatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import WrapChatBox from "../Component/ChatPage/WrapChatBox";
const ChatPage = () => {
  const { user, selectedChat } = useChatState();

  const sendMessage = async () => {
    const response = await axios.post("https//:localhost/");
  };
  return (
    <Box w={"100vw"}>
      {user && <SideDrawer />}
      <Box display={"flex"} gap={"1vw"} m={"10px"}>
        {user && <MyChat />}
        {user && <WrapChatBox selectedChat={selectedChat} />}
      </Box>
    </Box>
  );
};

export default ChatPage;

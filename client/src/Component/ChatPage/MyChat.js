import React, { useEffect, useState } from "react";
import { Box, useToast, Button, Stack, Text } from "@chakra-ui/react";
import { useChatState } from "../../Context/ChatProvider";
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import { getSender } from "../../Utility/ChatLogic";
import { socket } from "../../socket";
const MyChat = () => {
  const toast = useToast();
  const [loggedUser, setLoggedUser] = useState();
  const { user, setUser, selectedChat, setSelectedChat, chats, setChats } =
    useChatState();

  const fetchAllChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${
            user ? user.token : localStorage.getItem("token")
          }`,
        },
      };
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/chat",
        config
      );
      setChats(data);
    } catch (error) {
      toast({
        title: error.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  // Function to handle chat selection
  const handleSelectedChat = (chat) => {
    setSelectedChat(chat);

    // Emit a message with the chat ID using the socket object
    if (socket) {
      socket.emit("join-chat", { roomId: chat._id });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userInfo"))
      setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchAllChats();
  }, []);

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir={"column"}
      alignItems={"center"}
      p={3}
      bg={"white"}
      w={{ base: "100%", sm: "50%", md: "60%" }}
      borderRadius={"lg"}
      borderWidth={"1px"}
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily={"Work sans"}
        display={"flex"}
        w="100%"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        My Chat
        <Button
          display={"flex"}
          fontSize={{ base: "17px", md: "10px", lg: "17px" }}
          rightIcon={<AddIcon />}
        >
          New Group Chat
        </Button>
      </Box>
      <Box>
        {chats ? (
          <Stack>
            {chats.map((chat) => (
              <Box
                onClick={() => handleSelectedChat(chat)} // Call the modified function
                cursor={"pointer"}
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius={"lg"}
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : null}
      </Box>
    </Box>
  );
};

export default MyChat;

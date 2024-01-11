import React, { useEffect, useRef, useState, useCallback } from "react";
import { socket } from "../../socket";
import {
  Box,
  Input,
  Button,
  InputRightElement,
  InputGroup,
  Heading,
  Avatar,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

const ChatBox = ({ selectedChat }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const onSendMessage = useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const messageToSend = e.target.value;
        setNewMessage(messageToSend);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: messageToSend,
          },
        ]);
        socket.emit("privateMessage", {
          receiver:
            selectedChat.users[0].name ===
            JSON.parse(localStorage.getItem("userInfo")).name
              ? selectedChat.users[1].name
              : selectedChat.users[0].name,
          message: messageToSend,
          roomId: selectedChat._id,
        });

        // Clear the input field after sending the message
        setNewMessage("");
      }
    },
    [selectedChat]
  );

  useEffect(() => {
    socket.on("recv", (message) => {
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, { message }]);
    });
    return () => socket.off("recv");
  }, []);

  return (
    selectedChat && (
      <Box
        display={"flex"}
        flexDir={"column"}
        bgColor={"white"}
        w={{ sm: "60%", md: "60%" }}
        m={"3px"}
        padding={"10px"}
        borderRadius={"md"}
        h={"80vh"}
        maxW={"1280px"}
      >
        <Heading as={"h4"} size={"1xl"} h={"5vh"}>
          <Avatar name={selectedChat.users[1].name} size={"sm"} />{" "}
          {selectedChat.users[0].name ===
          JSON.parse(localStorage.getItem("userInfo")).name
            ? selectedChat.users[1].name
            : selectedChat.users[0].name}
        </Heading>
        <Box
          className="custom-chat-box"
          overflowY={"auto"}
          padding={"4px"}
          margin={"20px"}
          flexBasis={"60vh"}
        >
          <UnorderedList>
            {messages &&
              messages.map((data, index) => (
                <ListItem key={index}>{data.message}</ListItem>
              ))}
          </UnorderedList>
        </Box>
        <Box>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={"text"}
              placeholder="Type message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={onSendMessage}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={onSendMessage}>
                Send
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
      </Box>
    )
  );
};

export default ChatBox;

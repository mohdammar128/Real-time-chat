import React, { useEffect, useRef, useState, useCallback } from "react";
import SingleMessage from "./SingleMessage";
import { socket } from "../../socket";
import { jsonUserInfo } from "../../config";
import {
  Box,
  Input,
  Button,
  InputRightElement,
  InputGroup,
  Heading,
  Avatar,
} from "@chakra-ui/react";

import axios from "axios";

const ChatBox = ({ selectedChat, user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const onSendMessage = async (e) => {
    setNewMessage(e.target.value);
    if (e.key === "Enter" && newMessage) {
      const messageToSend = {
        content: newMessage,
        chatId: selectedChat._id,
      };

      setNewMessage("");
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/message/create-message",
        messageToSend,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data);
      setMessages([...messages, data]);
      socket.emit("privateMessage", {
        id: jsonUserInfo,
        message: messageToSend,
        roomId: selectedChat._id,
      });
    }
  };

  useEffect(() => {
    socket.on("recv", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    return () => socket.off("recv");
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchAllMessages();
  }, [selectedChat]);

  const fetchAllMessages = async () => {
    if (!selectedChat) return;
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/message/${selectedChat._id}`,
        // "http://localhost:4000/api/v1/message/65a91d8c585d3ef6aa956bfb",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setMessages([...messages, ...data]); // Assuming the messages are in the response.data
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
          height={"80vh"}
          display={"flex"}
          flexDir={"column"}
          gap={"10px"}
        >
          {messages?.map((data, index) => (
            <SingleMessage key={index} data={data} />
          ))}
          <div ref={messagesEndRef}></div>
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

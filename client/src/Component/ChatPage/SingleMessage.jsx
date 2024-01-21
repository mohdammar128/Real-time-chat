import { ListItem, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const SingleMessage = ({ data }) => {
  // console.log(data.sender);
  return (
    <Box
      bgColor={
        data?.sender === JSON.parse(localStorage?.getItem("userInfo"))?.id
          ? "#25D366"
          : "#FFFFF"
      }
      borderRadius={"md"}
      width={"auto"}
      display={"inline-block"}
      maxW={"40%"}
      h={"fit-content"}
      wordBreak={"break-word"}
      padding={"5px"}
      alignSelf={
        data?.sender !== JSON.parse(localStorage?.getItem("userInfo"))?.id
          ? "flex-start"
          : "flex-end"
      }
      shadow={"lg"}
    >
      {data?.content}
    </Box>
  );
};

export default SingleMessage;

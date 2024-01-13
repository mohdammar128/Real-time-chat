import { ListItem, Box } from "@chakra-ui/react";

const SingleMessage = ({ data }) => {
  return (
    <Box
      bgColor={
        data.id === JSON.parse(localStorage?.getItem("userInfo"))?.id
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
        data.id === JSON.parse(localStorage?.getItem("userInfo"))?.id
          ? "flex-end"
          : "flex-start"
      }
      shadow={"lg"}
    >
      {data.message}
    </Box>
  );
};

export default SingleMessage;

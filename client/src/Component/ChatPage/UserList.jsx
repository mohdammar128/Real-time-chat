import { Box, Avatar, Text } from "@chakra-ui/react";
import React from "react";

const UserListItem = ({ handleFunction, data }) => {
  return (
    <Box
      onClick={handleFunction}
      display={"flex"}
      gap={4}
      cursor={"pointer"}
      bg={"#E8E8E8"}
      w={"100%"}
      alignItems={"center"}
      color={"black"}
      px={3}
      py={2}
      mb={2}
      mt={5}
      _hover={{
        bg: "#38B2Ac",
        color: "white",
      }}
      borderRadius={"lg"}
    >
      <Avatar name="Dan Abrahmov" src={data.profilePic} size={"sm"} mr={2} />
      <Box>
        <Text>{data.name}</Text>
        <Text fontSize={"sm"} fontWeight={"medium"}>
          {data.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;

import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Text,
  Button,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import SignUp from "../Component/HomePage/SignUp";
import SignIn from "../Component/HomePage/SignIn";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  // -------------------------------------------
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("userInfo");
    if (user) {
      navigate("/chats");
    }
  });
  return (
    <Container maxW={"xl"} centerContent>
      <Box
        background={"white"}
        display={"flex"}
        justifyContent={"center"}
        w={"100%"}
        p={3}
        m={"40px 0px 15px 0px"}
        borderRadius={"md"}
      >
        <Text content="center">Lets Chat</Text>
      </Box>
      <Box backgroundColor={"white"} p={4} w={"100%"} borderRadius={"lg"}>
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList>
            <Tab w={"50%"}>Login</Tab>
            <Tab w={"50%"}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SignIn />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;

import {
  Box,
  Tooltip,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";

import ProfileModal from "../Utility/ProfileModal";
import DrawerLayOut from "../Utility/DrawerLayOut";
import { useChatState } from "../../Context/ChatProvider";
import { useEffect, useState } from "react";
import { handleSearchApi, accessChatApi } from "../../service/Chat/chat";
import { useNavigate } from "react-router-dom";

const SideDrawer = () => {
  const navigate = useNavigate();
  const { user, setUser, selectedChat, setSelectedChat, chats, setChats } =
    useChatState();

  const [search, setSearch] = useState("");
  const [serachLoading, setSearchLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [searchResult, setSearchResult] = useState();
  const toast = useToast();
  const drawerInputHandler = (e) => {
    const drawerInput = e.target.value;
    setSearch(drawerInput?.trim());
  };
  // logout funtion

  const logOutHandler = () => {
    localStorage.removeItem("userInfo");
    window.location.reload();
  };

  // accessing Chat
  const accessChat = async (userId) => {
    console.log(userId);
    setLoadingChat(true);
    try {
      const data = await accessChatApi(userId, user);
      if (!chats.find((c) => c._id === data._id)) setChats([...chats, data]);
      setSelectedChat(data);
      setLoadingChat(false);
    } catch (error) {
      toast({
        title: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setLoadingChat(false);
  };
  //  handle Search
  const handleSearch = async () => {
    setSearchLoading(true);
    if (!search) {
      toast({
        title: "please Enter some Input",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      setSearchLoading(true);
      return;
    }
    try {
      const data = await handleSearchApi(search, user);

      setSearchResult(data);

      setSearchLoading(false);
    } catch (err) {
      toast({
        title: "something went wrong",
        description: err.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom -left",
      });
      setSearchLoading(false);
    }
  };

  return (
    <>
      <Box
        w={"100%"}
        bg={"white"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        h={"3rem"}
      >
        <DrawerLayOut
          search={"search User"}
          inputDataHandler={drawerInputHandler}
          searchHandler={handleSearch}
          loading={serachLoading}
          data={searchResult}
          accessChat={accessChat}
          user={user}
          loadingChat={loadingChat}
        />

        <Text>Vartalaap</Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize={"2xl"} m={1} />
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar name={user?.name} src={user?.profilePic} size={"sm"} />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logOutHandler}>LogOut</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
    </>
  );
};

export default SideDrawer;

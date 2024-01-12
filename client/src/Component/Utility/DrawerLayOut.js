import { useRef } from "react";
import {
  Text,
  Tooltip,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  useDisclosure,
  Box,
  Spinner,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import ChatLoader from "./ChatLoader";
import UserListItem from "../ChatPage/UserList";

const DrawerLayOut = ({
  search,
  inputDataHandler,
  searchHandler,
  loading,
  data,
  accessChat,
  user,
  loadingChat,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const drawerInputHandler = (e) => {
    inputDataHandler(e);
  };

  return (
    <>
      <Tooltip hasArrow label="Search for Users" bg="gray.300" color="black">
        <Button
          onClick={onOpen}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <SearchIcon mr={3} />
          <Text>{search}</Text>
        </Button>
      </Tooltip>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search User</DrawerHeader>

          <DrawerBody>
            <Box display={"flex"} gap={5}>
              <Input placeholder="Type here..." onChange={drawerInputHandler} />
              <Button
                colorScheme="linkedin"
                onClick={() => {
                  searchHandler();
                }}
              >
                Go
              </Button>
              {/* <UserList /> */}
            </Box>
            {loading ? (
              <ChatLoader />
            ) : (
              data?.map((obj) => (
                <UserListItem
                  key={obj._id}
                  data={obj}
                  handleFunction={() => accessChat(obj._id)}
                />
              ))
            )}
            {loadingChat && (
              <Spinner
                thickness="4px"
                speed="5s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerLayOut;

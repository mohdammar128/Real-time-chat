import {
  Container,
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
} from "@chakra-ui/react";
import { signIn } from "../../service/Auth/Auth";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";
const loginData = {
  email: "",
  password: "",
};
import React, { useState } from "react";
import { useChatState } from "../../Context/ChatProvider";

const SignIn = () => {
  const navigate = useNavigate();
  const { user, setUser } = useChatState();

  const toast = useToast();
  const [show, setShowPassword] = useState(false);
  const [login, setLogin] = useState(loginData);
  const [isLoading, setLoading] = useState(false); // Fix the typo here
  const loginHandler = (e) => {
    e.preventDefault();
    if (e.target.name === "email") {
      setLogin({ ...login, [e.target.name]: e.target.value });
    }
    if (e.target.name === "password") {
      setLogin({ ...login, [e.target.name]: e.target.value });
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (login.email === "" || login.password === "") {
      toast({
        title: "Please fill all the fields",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
    try {
      const response = await signIn(login);

      if (response.data.success === false) {
        toast({
          title: response.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
        return;
      }

      const newUser = {
        id: response.data.data?._id,
        name: response.data.data?.name,
        email: response.data.data?.email,
        profilePic: response.data.data?.profilePic,
        token: response.data?.token,
      };
      localStorage.setItem("userInfo", JSON.stringify(newUser));
      setUser(newUser);
      socket.emit("login", newUser.id);
      navigate("/chats");
      setLoading(false);
    } catch (error) {
      console.log(error);

      toast({
        title: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
    }
    setLogin({ ...login, email: "", password: "" });
  };
  const passwordHandler = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Container mt={4} w={"100%"}>
      <VStack spacing={3}>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            value={login.email}
            placeholder="Enter Your Email"
            onChange={loginHandler}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>

          <InputGroup size="md">
            <Input
              value={login.password}
              name="password"
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              onChange={loginHandler}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={passwordHandler}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button
          w={"100%"}
          colorScheme="red"
          mt={15}
          onClick={onSubmitHandler}
          isLoading={isLoading}
        >
          Login
        </Button>
      </VStack>
    </Container>
  );
};

export default SignIn;

import {
  Container,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { createAccount } from "../../service/Auth/Auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const signUpData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  profilePic: "",
};

const SignUp = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [show, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirmPassword] = useState(false);
  const [signUp, setSignUp] = useState(signUpData);
  const [isLoading, setIsLoading] = useState(false);
  const passwordHandler = () => {
    setShowPassword((prev) => !prev);
  };
  const confirmPasswordHandler = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const signUphandler = (e) => {
    e.preventDefault();
    if (e.target.name === "name") {
      setSignUp({ ...signUp, [e.target.name]: e.target.value });
    }
    if (e.target.name === "email") {
      setSignUp({ ...signUp, [e.target.name]: e.target.value });
    }
    if (e.target.name === "password") {
      setSignUp({ ...signUp, [e.target.name]: e.target.value });
    }
    if (e.target.name === "confirmPassword") {
      setSignUp({ ...signUp, [e.target.name]: e.target.value });
    }
  };
  const handleFileUpload = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    console.log(file, e.target);
    if (file) await postDetails(file);
  };
  const postDetails = async (pics) => {
    setIsLoading(true);
    if (pics === undefined) {
      toast({
        title: "please select an image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setIsLoading(false);
    }
    try {
      if (pics.type === "image/png" || pics.type === "image/jpeg") {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "chat-app");
        data.append("cloud_name", "dxwftvabl");
        console.log(data);
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dxwftvabl/image/upload",
          data
        );
        const imageUrl = response.data.secure_url;
        console.log(imageUrl);
        setSignUp({ ...signUp, profilePic: imageUrl });

        setIsLoading(false);

        toast({
          title: "Image uploaded to Cloudinary successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      toast({
        title: "Image uploaded to Cloudinary failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setIsLoading(false);
    }
  };
  console.log(signUp);
  const submitHandler = async () => {
    setIsLoading(true);
    if (signUp.password !== signUp.confirmPassword) {
      toast({
        title: "Password and Confirm Password should be same",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setIsLoading(false);
      return;
    }
    if (
      !signUp.profilePic ||
      !signUp.name ||
      !signUp.email ||
      !signUp.password ||
      !signUp.confirmPassword
    ) {
      toast({
        title: "Please fill all the fields",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setIsLoading(false);
      return;
    }
    const result = await createAccount(signUp);
    toast({
      title: "Sign Up Successfully",
      description: "login for furthur proceed",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
    localStorage.setItem("userInfo", JSON.stringify(result)); //storing the data in local storage
    navigate("/");

    // setSignUp({
    //   ...signUpData,
    //   name: "",
    //   email: "",
    //   password: "",
    //   confirmPassword: ""  ,
    //   profilePic: "",
    // });
  };
  return (
    <Container mt={4} w={"100%"}>
      <VStack spacing={3}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            value={signUp.name}
            placeholder="Enter Name"
            onChange={signUphandler}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            value={signUp.email}
            placeholder="Enter Your Email"
            onChange={signUphandler}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>

          <InputGroup size="md">
            <Input
              name="password"
              value={signUp.password}
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              onChange={signUphandler}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={passwordHandler}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Confrim Password</FormLabel>

          <InputGroup size="md">
            <Input
              name="confirmPassword"
              value={signUp.confirmPassword}
              pr="4.5rem"
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm password"
              onChange={signUphandler}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={confirmPasswordHandler}>
                {showConfirm ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Upload Your profile Picture</FormLabel>
          <Input
            accept="image/*"
            type="file"
            p={1.5}
            onChange={handleFileUpload}
          />
        </FormControl>
        <Button
          w={"100%"}
          colorScheme="blue"
          mt={15}
          isLoading={isLoading}
          onClick={submitHandler}
        >
          Sign Up
        </Button>
      </VStack>
    </Container>
  );
};

export default SignUp;

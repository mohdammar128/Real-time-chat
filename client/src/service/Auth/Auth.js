import axios from "axios";
import { Auth } from "../api";
const createAccount = async (formData) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const name = formData.name;
    const email = formData.email;
    const password = formData.password;
    const profilePic = formData.profilePic;
    console.log(name, email, password, profilePic);
    const { response } = await axios.post(
      "http://localhost:4000/api/v1/auth/sign-up",
      { name, email, password, profilePic },
      config
    );

    return response;
  } catch (error) {
    return error;
  }
};
const signIn = async (loginCredentials) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(
    "http://localhost:4000/api/v1/auth/sign-in",
    loginCredentials,
    config
  );

  return response; // Return the entire response object
};
export { createAccount, signIn };

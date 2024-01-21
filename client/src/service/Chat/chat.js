import axios from "axios";

export const handleSearchApi = async (search, user) => {
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const { data } = await axios.get(
    `http://localhost:4000/api/v1/auth/user?search=${search}`,
    config
  );
  return data;
};
export const accessChatApi = async (userId, user) => {
  console.log(userId);
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };
  const { data } = await axios.post(
    `http://localhost:4000/api/v1/chat`,
    { id: userId },
    config
  );
  return data;
};

// export const createMessage = (content, chatId, user) => {
//   try {
//     const config = {
//       headers: {
//         "Content-type": "application/json",
//         Authorization: `Bearer${user?.token}`,
//       },
//     };
//     const response = axios.post(
//       "http://localhost:4000/api/v1/message/create-message",
//       { content, chatId },
//       config
//     );
//     return response.json();
//   } catch (error) {
//     return new Error("Somthing went wrong while api calling");
//   }
// };

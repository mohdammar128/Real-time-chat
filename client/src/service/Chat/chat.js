import axios from "axios";

const handleSearchApi = async (search, user) => {
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
const accessChatApi = async (userId, user) => {
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
export { handleSearchApi, accessChatApi };

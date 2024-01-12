import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  // const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      const userInfo = localStorage.getItem("userInfo");
      setUser(JSON.parse(userInfo));
    } else {
      navigate("/");
    }
  }, [navigate]);
  // Define and use the onSet function to update user as needed

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        // messages,
        // setMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

const useChatState = () => {
  return useContext(ChatContext);
};

export { useChatState };
export default ChatProvider;

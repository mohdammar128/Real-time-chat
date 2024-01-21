import ChatBox from "./ChatBox";

const WrapChatBox = ({ selectedChat, user }) => {
  return <ChatBox selectedChat={selectedChat} user={user} />;
};

export default WrapChatBox;

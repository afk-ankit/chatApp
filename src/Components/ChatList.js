import { useEffect, useRef } from "react";
import "../Css/ChatList.css";
import { auth } from "../firebase";
const ChatList = ({ message, uid }) => {
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current.scrollIntoView({
      behaviour: "smooth",
    });
  }, []);
  const setClass = (uid) => {
    if (uid !== auth.currentUser.uid) {
      return { alignSelf: "flex-start", backgroundColor: "white" };
    }
  };
  return (
    <div className="chatList" style={setClass(uid)}>
      {message}
      <div ref={scrollRef}></div>
    </div>
  );
};

export default ChatList;

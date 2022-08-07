import { useEffect, useRef } from "react";
import "../Css/ChatList.css";
import { auth } from "../firebase";
const ChatList = ({ message, uid, userName }) => {
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current.scrollIntoView({
      behaviour: "smooth",
    });
  }, []);

  const setClass = (uid) => {
    if (uid !== auth.currentUser.uid) {
      return {
        alignSelf: "flex-start",
        backgroundColor: "whitesmoke",
        color: "black",
      };
    }
  };

  const setStyle = (uid) => {
    if (uid != auth.currentUser.uid) {
      return {
        color: "lightsalmon",
      };
    }
  };

  return (
    <div className="chatList" style={setClass(uid)}>
      <h3 style={setStyle(uid)}>{userName}</h3>
      {message}
      <div ref={scrollRef}></div>
    </div>
  );
};

export default ChatList;

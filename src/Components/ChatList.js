import { useEffect, useRef } from "react";
import "../Css/ChatList.css";
import { auth } from "../firebase";
const ChatList = ({ message, uid, userName }) => {
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef?.current?.scrollIntoView({
      behaviour: "smooth",
    });
    console.log(message);
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

  if (message === true) {
    return (
      <div>
        <h3 style={{ textAlign: "center" }}>
          Send a hi 👋 to start a conversation !!!
        </h3>
      </div>
    );
  } else {
    return (
      <div className="chatList" style={setClass(uid)}>
        <h3 style={setStyle(uid)}>{userName}</h3>
        {message}
        <div ref={scrollRef}></div>
      </div>
    );
  }
};

export default ChatList;

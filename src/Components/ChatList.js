import { useEffect, useRef } from "react";
import "../Css/ChatList.css";
import { auth } from "../firebase";
import Moment from "react-moment";

const ChatList = ({ message, uid, userName, createdAt }) => {
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef?.current?.scrollIntoView({
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
        <h4 style={{ display: "block" }}>
          <Moment fromNow>{createdAt.toDate()}</Moment>
        </h4>
        <div ref={scrollRef}></div>
      </div>
    );
  }
};

export default ChatList;

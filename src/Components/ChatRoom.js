import ChatList from "./ChatList";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../Css/ChatRoom.css";
import { useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useValue } from "../App/StateProvider";
import SidebarMobile from "./SidebarMobile";
import PersonIcon from "@mui/icons-material/Person";
import { useChat } from "../App/ChatProvider";
import { Avatar, CircularProgress, Skeleton } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import toast from "react-hot-toast";

const ChatRoom = () => {
  //All the statfull components and refs are here
  const [unread, setUnread] = useState(0);
  const [user, setUser] = useState({});
  const [chatUser, setChatUser] = useState({ uid: null });
  const [state] = useValue();
  const [chatState] = useChat();
  const messageRef = useRef();
  const [message, setMessage] = useState([{ message: false }]);
  //useEffect hook
  useEffect(() => {
    //unread message
    const unreadRef = doc(
      db,
      "userChat",
      chatState?.uid > state.uid
        ? `${chatState?.uid}${state.uid}`
        : `${state.uid}${chatState?.uid}`,
      "unread",
      state.uid
    );

    onSnapshot(unreadRef, (result) => {
      if (result) {
        setUnread(result?.data().count);
      }
    });
    //chatPerson
    setChatUser({ uid: null });
    setMessage([{ message: false }]);
    if (chatState.uid) {
      onSnapshot(doc(db, "users", chatState.uid), (result) => {
        if (result) {
          setChatUser(result.data());
        }
      });
    }
    //message sender
    onSnapshot(doc(db, "users", state.uid), (result) => {
      if (result) {
        setUser(result.data());
      }
    });
    let mssg = [];

    const docRef = collection(
      db,
      "userChat",
      chatState.uid > state.uid
        ? `${chatState.uid}${state.uid}`
        : `${state.uid}${chatState.uid}`,
      "messages"
    );
    const q = query(docRef, orderBy("createdAt"));
    onSnapshot(q, (doc) => {
      if (doc) {
        doc.forEach((item) => {
          mssg.push({ ...item.data(), id: item.id });
        });
        setMessage(mssg);
        mssg = [];
      }
      if (doc.docs.length === 0) {
        setMessage([{ message: true }]);
      }
    });
  }, [chatState.uid, state.uid]);

  useEffect(() => {
    if (chatState.uid) {
      const userRef = doc(
        db,
        "userChat",
        chatState?.uid > state.uid
          ? `${chatState?.uid}${state.uid}`
          : `${state.uid}${chatState?.uid}`,
        "unread",
        chatState.uid
      );

      setDoc(userRef, {
        count: 0,
      });
    }
    const unreadRef = doc(
      db,
      "userChat",
      chatState?.uid > state.uid
        ? `${chatState?.uid}${state.uid}`
        : `${state.uid}${chatState?.uid}`,
      "unread",
      state.uid
    );
    setDoc(unreadRef, {
      count: unread,
    });
  }, [unread, state.uid, chatState.uid, message]);
  //function to send the data on the firebase
  const handleSend = async (e) => {
    e.preventDefault();
    const audio = new Audio("./assests/messagePop.mp3");
    const docRef = collection(
      db,
      "userChat",
      chatState.uid > state.uid
        ? `${chatState.uid}${state.uid}`
        : `${state.uid}${chatState.uid}`,
      "messages"
    );

    const message = messageRef.current.value;
    messageRef.current.value = null;
    const addMess = () => {
      return {
        uid: state.uid,
        userName: user.userName,
        message,
        createdAt: Timestamp.fromDate(new Date()),
      };
    };
    try {
      if (message !== "") {
        setUnread((prev) => prev + 1);
        await addDoc(docRef, addMess());
        audio.play();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  //toggling sidebar
  const sidebarToggle = () => {
    document.querySelector(".sidebarMobile").classList.toggle("toggle");
  };

  return (
    <div>
      <Navbar />
      <div className="chatroom__container">
        <Sidebar />
        <SidebarMobile />
        {chatState.uid ? (
          <div className="chatroom__chats">
            {chatUser.uid ? (
              <div className="chatroom__header">
                <Avatar src={chatUser.pic} />
                <h2>{chatUser.userName}</h2>
              </div>
            ) : (
              <div className="chatroom__header">
                <Skeleton
                  variant="circular"
                  sx={{ bgcolor: "grey.900" }}
                  width={"3rem"}
                  height={"3rem"}
                />
                <Skeleton
                  variant="text"
                  width="8rem"
                  sx={{ bgcolor: "grey.900" }}
                />
              </div>
            )}
            {message[0].message ? (
              <div className="chatroom__chatList">
                {message?.map((item) => (
                  <ChatList
                    key={item.id}
                    message={item.message}
                    uid={item.uid}
                    userName={item.userName}
                    createdAt={item.createdAt}
                  />
                ))}
              </div>
            ) : (
              <div
                className="chatroom__chatList"
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <CircularProgress color="inherit" />
              </div>
            )}

            <div className="chatroom__controls">
              <form className="chatroom__form">
                <div className="chatroom__personList">
                  <PersonIcon fontSize="large" onClick={sidebarToggle} />
                </div>
                <input type="text" ref={messageRef} />
                <button type="submit" onClick={handleSend}>
                  Send
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="chatroom__landing">
            <div className="chatroom__header" id="chatroom__userButton">
              <ArrowRightAltIcon
                style={{ fontSize: "2rem" }}
                onClick={sidebarToggle}
              />
              <h2 onClick={sidebarToggle}>User List</h2>
            </div>
            <h2 id="chatroom__landingTitle">
              Please select the user from the user list 👈
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;

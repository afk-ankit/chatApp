import ChatList from "./ChatList";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../Css/ChatRoom.css";
import { useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useValue } from "../App/StateProvider";
import { Link } from "react-router-dom";

const userMessages = [];

const ChatRoom = () => {
  //All the statfull components and refs are here
  const [state] = useValue();
  const messageRef = useRef();
  const [message, setMessage] = useState(userMessages);

  //useEffect hook
  useEffect(() => {
    let mssg = [];
    const docRef = collection(db, "messages");
    const q = query(docRef, orderBy("createdAt"));
    onSnapshot(q, (doc) => {
      doc.forEach((item) => {
        mssg.push({ ...item.data(), id: item.id });
      });
      console.log(mssg);
      setMessage(mssg);
      mssg = [];
    });
  }, []);

  //function to send the data on the firebase
  const handleSend = async (e) => {
    e.preventDefault();
    const message = messageRef.current.value;
    messageRef.current.value = null;
    const addMess = () => {
      return {
        uid: state.uid,
        userName: state.userName,
        message,
        createdAt: Timestamp.fromDate(new Date()),
      };
    };
    try {
      const doc = await addDoc(collection(db, "messages"), addMess());
      console.log("sucessfully created at " + doc.id);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="chatroom__container">
        <Sidebar />
        <div className="chatroom__chats">
          <div className="chatroom__chatList">
            {message?.map((item) => (
              <ChatList key={item.id} message={item.message} uid={item.uid} />
            ))}
          </div>
          <div className="chatroom__controls">
            <form className="chatroom__form">
              <input type="text" ref={messageRef} />
              <button type="submit" onClick={handleSend}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;

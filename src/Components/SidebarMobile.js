import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import "../Css/SidebarMobile.css";
import { auth, db } from "../firebase";
import _ from "lodash";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useChat } from "../App/ChatProvider";
import { addChat } from "../App/features/chatAction";
import SidebarUserMobile from "./SidebarUserMobile";

const SidebarMobile = () => {
  const [personalUser, setPersonalUser] = useState({});
  const [onlineUser, setOnlineUser] = useState([]);
  const [user, setUser] = useState([]);
  const sidebarRef = useRef();
  const [state, dispatch] = useChat();

  useEffect(() => {
    //user Details
    onSnapshot(doc(db, "users", auth.currentUser.uid), (result) => {
      if (result) {
        setPersonalUser(result.data());
      }
    });
    //list of online users
    let onlineArray = [];
    const q = query(
      collection(db, "users"),
      where("online", "==", true),
      where("uid", "!=", auth.currentUser.uid)
    );
    onSnapshot(q, (result) => {
      if (result) {
        result.docs.forEach((result) => {
          onlineArray.push(result.data());
        });
        setOnlineUser(onlineArray);
        onlineArray = [];
      }
    });

    //list of offline users
    let userArray = [];
    const q2 = query(collection(db, "users"), where("online", "!=", true));
    onSnapshot(q2, (result) => {
      if (result) {
        result.forEach((element) => {
          userArray.push(element.data());
        });
        setUser(userArray);
        userArray = [];
      }
    });
  }, []);

  const handleStyle = (online) => {
    if (online)
      return {
        backgroundColor: "#96e996",
      };
    else
      return {
        backgroundColor: "#ff4242",
      };
  };

  const toggleSidebar = () => {
    sidebarRef.current.classList.toggle("toggle");
  };
  const sidebarToggle = () => {
    document.querySelector(".sidebarMobile").classList.toggle("toggle");
  };
  return (
    <div className="sidebarMobile toggle" ref={sidebarRef}>
      <div className="sidebar active">
        <div className="sidebar__closeIcon">
          <CloseIcon onClick={toggleSidebar} />
        </div>
        <h2>You</h2>
        <div className="sidebar__container" onClick={sidebarToggle}>
          <div className="sidebar__userDetails">
            <div className="sidebar__img">
              {personalUser.pic ? (
                <img src={personalUser.pic} alt="" />
              ) : (
                <AccountCircleIcon
                  style={{
                    fontSize: "3.5rem",
                    marginLeft: "-0.4rem",
                    color: "#292929",
                  }}
                />
              )}
            </div>
            <div className="sidebar__userEmail">
              <h3>
                {_.truncate(personalUser.userName, {
                  length: 18,
                })}
              </h3>
              <p>
                {_.truncate(personalUser.email, {
                  length: 19,
                })}
              </p>
            </div>
          </div>

          <div
            className="sidebar__circle"
            style={handleStyle(personalUser.online)}
          ></div>
        </div>
        <hr />

        {/* online users */}
        <h2>Online Users</h2>
        {onlineUser.length ? (
          onlineUser?.map((item) => (
            <SidebarUserMobile
              key={item?.uid}
              dispatch={dispatch}
              handleStyle={handleStyle}
              sidebarToggle={sidebarToggle}
              item={item}
            ></SidebarUserMobile>
          ))
        ) : (
          <div className="sidebar__unfound">
            <p>No users online</p>
          </div>
        )}
        <hr />

        {/* //offline Users */}
        <h2>Offline Users</h2>
        {user.length ? (
          user?.map((item) => (
            <SidebarUserMobile
              key={item?.uid}
              dispatch={dispatch}
              handleStyle={handleStyle}
              sidebarToggle={sidebarToggle}
              item={item}
            ></SidebarUserMobile>
          ))
        ) : (
          <div className="sidebar__unfound">
            <p>No user offline</p>
          </div>
        )}
        <hr />
      </div>
    </div>
  );
};

export default SidebarMobile;

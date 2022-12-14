import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import "../Css/Sidebar.css";
import { auth, db } from "../firebase";
import _ from "lodash";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useChat } from "../App/ChatProvider";
import SidebarUser from "./SidebarUser";

const Sidebar = () => {
  const [personalUser, setPersonalUser] = useState({});
  const [onlineUser, setOnlineUser] = useState([]);
  const [user, setUser] = useState([]);
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
  return (
    <div className="sidebar">
      <h2>You</h2>
      <div className="sidebar__container">
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
                length: 27,
              })}
            </h3>
            <p>
              {_.truncate(personalUser.email, {
                length: 23,
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
          <SidebarUser
            key={item?.uid}
            dispatch={dispatch}
            handleStyle={handleStyle}
            item={item}
          ></SidebarUser>
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
          <SidebarUser
            key={item?.uid}
            dispatch={dispatch}
            handleStyle={handleStyle}
            item={item}
          ></SidebarUser>
        ))
      ) : (
        <div className="sidebar__unfound">
          <p>No user offline</p>
        </div>
      )}
      <hr />
    </div>
  );
};

export default Sidebar;

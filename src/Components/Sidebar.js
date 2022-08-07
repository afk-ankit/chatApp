import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import "../Css/Sidebar.css";
import { auth, db } from "../firebase";
const Sidebar = () => {
  const [personalUser, setPersonalUser] = useState({});
  const [onlineUser, setOnlineUser] = useState([]);
  const [user, setUser] = useState([]);
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
              <div className="sidebar__svg"></div>
            )}
          </div>
          <div className="sidebar__userEmail">
            <h3>{personalUser.userName}</h3>
            <p>{personalUser.email}</p>
          </div>
        </div>

        <div
          className="sidebar__circle"
          style={handleStyle(personalUser.online)}
        ></div>
      </div>
      {/* online users */}
      <h2>Online Users</h2>
      {onlineUser?.map((item) => (
        <div key={item?.uid}>
          <div className="sidebar__container">
            <div className="sidebar__userDetails">
              <div className="sidebar__img">
                {item?.pic ? (
                  <img src={item?.pic} alt="" />
                ) : (
                  <div className="sidebar__svg"></div>
                )}
              </div>
              <div className="sidebar__userEmail">
                <h3>{item?.userName}</h3>
                <p>{item?.email}</p>
              </div>
            </div>

            <div
              className="sidebar__circle"
              style={handleStyle(item?.online)}
            ></div>
          </div>
        </div>
      )) || <p>no page</p>}
      {/* //offline Users */}
      <h2>Offline Users</h2>
      {user?.map((item) => (
        <div key={item?.uid}>
          <div className="sidebar__container">
            <div className="sidebar__userDetails">
              <div className="sidebar__img">
                {item?.pic ? (
                  <img src={item?.pic} alt="" />
                ) : (
                  <div className="sidebar__svg"></div>
                )}
              </div>
              <div className="sidebar__userEmail">
                <h3>{item?.userName}</h3>
                <p>{item?.email}</p>
              </div>
            </div>

            <div
              className="sidebar__circle"
              style={handleStyle(item?.online)}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;

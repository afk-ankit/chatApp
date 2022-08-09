import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import "../Css/Sidebar.css";
import { auth, db } from "../firebase";
import _ from "lodash";

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
            <h3>
              {_.truncate(personalUser.userName, {
                length: 27,
              })}
            </h3>
            <p>
              {_.truncate(personalUser.email, {
                length: 27,
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
                  <h3>
                    {_.truncate(item?.userName, {
                      length: 27,
                    })}
                  </h3>
                  <p>
                    {_.truncate(item?.email, {
                      length: 27,
                    })}
                  </p>
                </div>
              </div>

              <div
                className="sidebar__circle"
                style={handleStyle(item?.online)}
              ></div>
            </div>
          </div>
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
                  <h3>
                    {_.truncate(item?.userName, {
                      length: 27,
                    })}
                  </h3>
                  <p>
                    {_.truncate(item?.email, {
                      length: 27,
                    })}
                  </p>
                </div>
              </div>

              <div
                className="sidebar__circle"
                style={handleStyle(item?.online)}
              ></div>
            </div>
          </div>
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

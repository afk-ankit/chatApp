import { collection, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import "../Css/Sidebar.css";
import { db } from "../firebase";
const Sidebar = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    let userArray = [];
    onSnapshot(collection(db, "users"), (result) => {
      result.forEach((element) => {
        userArray.push(element.data());
      });
      setUser(userArray);
      userArray = [];
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
      {user?.map((item) => (
        <div key={item.uid}>
          <div className="sidebar__container">
            <div className="sidebar__userDetails">
              <div className="sidebar__img">
                {item.pic ? (
                  <img src={item.pic} alt="" />
                ) : (
                  <div className="sidebar__svg"></div>
                )}
              </div>
              <div className="sidebar__userEmail">
                <h3>{item.userName}</h3>
                <p>{item.email}</p>
              </div>
            </div>

            <div
              className="sidebar__circle"
              style={handleStyle(item.online)}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;

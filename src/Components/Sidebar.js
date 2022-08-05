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
        console.log(element.data());
        userArray.push(element.data());
      });
      setUser(userArray);
      userArray = [];
    });
  }, []);

  const handleStyle = (online) => {
    if (online)
      return {
        backgroundColor: "green",
      };
    else
      return {
        backgroundColor: "red",
      };
  };
  return (
    <div className="sidebar">
      {user?.map((item) => (
        <>
          <div className="sidebar__container">
            <h3 className="sidebar__userName" key={item.uid}>
              {item.email}
            </h3>
            <div
              className="sidebar__circle"
              style={handleStyle(item.online)}
            ></div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Sidebar;

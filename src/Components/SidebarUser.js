import { Badge } from "@mui/material";
import { addChat } from "../App/features/chatAction";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import _ from "lodash";
import { useEffect, useState } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useValue } from "../App/StateProvider";

function SidebarUser(props) {
  const [unread, setUnread] = useState(0);
  const [state] = useValue();
  useEffect(() => {
    const unreadRef = doc(
      db,
      "userChat",
      props.item.uid > state.uid
        ? `${props.item.uid}${state.uid}`
        : `${state.uid}${props.item.uid}`,
      "unread",
      props.item.uid
    );
    onSnapshot(unreadRef, (data) => {
      setUnread(data.data()?.count);
    });
  }, []);
  return (
    <div
      onClick={() => {
        props.dispatch(addChat(props.item));
        const unreadOtherRef = doc(
          db,
          "userChat",
          props.item?.uid > state.uid
            ? `${props.item?.uid}${state.uid}`
            : `${state.uid}${props.item?.uid}`,
          "unread",
          props.item?.uid
        );

        updateDoc(unreadOtherRef, {
          count: 0,
        });
      }}
    >
      <div className="sidebar__container">
        <div className="sidebar__userDetails">
          <div className="sidebar__img">
            <Badge
              badgeContent={unread}
              max={50}
              overlap="circular"
              color="success"
              className="sidebar__img__badge"
            >
              {props.item?.pic ? (
                <img src={props.item?.pic} alt="" />
              ) : (
                <AccountCircleIcon
                  style={{
                    fontSize: "3.5rem",
                    marginLeft: "-0.4rem",
                    color: "#292929",
                  }}
                />
              )}
            </Badge>
          </div>
          <div className="sidebar__userEmail">
            <h3>
              {_.truncate(props.item?.userName, {
                length: 27,
              })}
            </h3>
            <p>
              {_.truncate(props.item?.email, {
                length: 23,
              })}
            </p>
          </div>
        </div>

        <div
          className="sidebar__circle"
          style={props.handleStyle(props.item?.online)}
        ></div>
      </div>
    </div>
  );
}

export default SidebarUser;

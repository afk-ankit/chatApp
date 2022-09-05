import { addChat } from "../App/features/chatAction";
import _ from "lodash";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useValue } from "../App/StateProvider";
import toast from "react-hot-toast";
import { Badge } from "@mui/material";

function SidebarUserMobile(props) {
  const [unread, setUnread] = useState(0);
  const [state] = useValue();
  useEffect(() => {
    const audio = new Audio("./assests/notification.wav");
    if (unread) {
      toast(`New message from ${props.item.userName}`, {
        duration: 1500,
        icon: "👋",
        id: "clipboard",
      });
      audio.play();
    }
    const unreadRef = doc(
      db,
      "userChat",
      props.item.uid > state.uid
        ? `${props.item.uid}${state.uid}`
        : `${state.uid}${props.item.uid}`,
      "unread",
      props.item.uid
    );
    const unsub = onSnapshot(unreadRef, (data) => {
      setUnread(data.data()?.count);
    });

    return () => unsub();
  }, [unread, props.item.uid, props.item.userName, state.uid]);

  return (
    <div
      onClick={() => {
        props.dispatch(addChat(props.item));
        props.sidebarToggle();
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
                length: 18,
              })}
            </h3>
            <p>
              {_.truncate(props.item?.email, {
                length: 15,
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
export default SidebarUserMobile;

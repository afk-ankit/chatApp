import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { removeUserContext } from "../App/features/userAction";
import { useValue } from "../App/StateProvider";
import { auth } from "../firebase";

const ChatRoom = () => {
  const [state, dispatch] = useValue();
  useEffect(() => {
    console.log(state);
  });
  return (
    <div>
      <h2>{state.uid} has entered the room</h2>
      <h2>{state.userName}</h2>
      <img src={state.img} alt="" />
      <button
        onClick={async () => {
          try {
            await signOut(auth);
            dispatch(removeUserContext());
          } catch (err) {
            console.log(err);
          }
        }}
      >
        Signout
      </button>
    </div>
  );
};

export default ChatRoom;

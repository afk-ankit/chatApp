import React, { useRef } from "react";
import Navbar from "./Navbar";
import "../Css/Profile.css";
import { storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";

const Profile = () => {
  const picRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const file = picRef.current.files[0];
      if (file) {
        const profileRef = ref(storage, `/file/${file.name}`);
        const result = uploadBytes(profileRef, file);
      } else if (!file) {
        throw new Error("No file Selected");
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };
  return (
    <>
      <Navbar />
      <div className="profile">
        <form action="" className="profile__form">
          <div className="profile__form__container">
            <div className="profile__userImg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="rgb(96, 96, 96)"
                width={40}
              >
                <path
                  fill-rule="evenodd"
                  d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                  clip-rule="evenodd"
                />
              </svg>
              <input type="file" id="file" ref={picRef} accept="image/*" />
            </div>
            <p id="profile__picTitle">Set new profile picture</p>
          </div>
          <div className="profile__form__container">
            <p>Set new username</p>
            <input type="text" />
          </div>
          <div className="profile__form__container">
            <button onClick={handleSubmit}>Save</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;

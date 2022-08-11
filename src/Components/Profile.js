import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import "../Css/Profile.css";
import { auth, db, storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useValue } from "../App/StateProvider";
import toast from "react-hot-toast";
import imageCompression from "browser-image-compression";

const Profile = () => {
  const [userInput, setUserInput] = useState();
  const [userDetails, setUserDetails] = useState({});
  const [edit, setEdit] = useState(true);
  const [state] = useValue();
  useEffect(() => {
    const docRef = doc(db, "users", state.uid);
    onSnapshot(docRef, (user) => {
      if (user) {
        let data = user.data();
        console.log(user.data());
        setUserDetails(data);
        setEdit(true);
        data = null;
      }
    });
  }, []);

  const picRef = useRef();
  const userNameRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    toast("You will be notified when profile will be updated !");
    const newUserName = userNameRef.current.value;
    try {
      const file = picRef.current.files[0];
      if (file) {
        const profileRef = ref(storage, `/file/${file.name}`);
        //compression beggins
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        console.log(
          `the size after compression is ${
            compressedFile.size / 1024 / 1024
          } MB`
        );

        //upload Task Initiate
        const uploadTask = uploadBytesResumable(profileRef, compressedFile);

        //listener to upload task
        uploadTask.on(
          "state__changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (err) => {
            throw new Error(err.message);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              const picUrl = url;
              console.log("The image can be download from " + url);
              const userRef = doc(db, "users", state.uid);
              updateDoc(userRef, {
                pic: picUrl,
              }).then((result) => {
                toast.success("Pic Updated Successfully");
                console.log("Pic Updated Succesfully");
              });
            });
          }
        );

        //changing the data on the firestore
      }

      if (newUserName) {
        const userRef = doc(db, "users", state.uid);
        await updateDoc(userRef, {
          userName: newUserName,
        });
        console.log("userName successfully updated ");
        toast.success("Username updated successfully");
      } else {
        toast.error("Can't update userName to blank !!!");
      }
    } catch (error) {
      toast.error(error.message);
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
              {userDetails.pic ? (
                <img src={userDetails.pic} alt="" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="rgb(96, 96, 96)"
                  width={40}
                >
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
              )}

              <input
                type="file"
                id="file"
                ref={picRef}
                accept="image/*"
                onChange={() => {
                  if (picRef.current.files[0]) {
                    //file reader to read the current file from input and display it in the dp section
                    const reader = new FileReader();
                    reader.readAsDataURL(picRef.current.files[0]);
                    reader.onload = () => {
                      if (reader.readyState === 2) {
                        // console.log("reader result is " + reader.result);
                        setUserDetails({ ...userDetails, pic: reader.result });
                      }
                    };
                  }
                }}
              />
            </div>
            <p
              id="profile__picTitle"
              style={{ color: "lightcoral", cursor: "pointer" }}
              onClick={async () => {
                try {
                  await updateDoc(doc(db, "users", state.uid), {
                    pic: null,
                  });
                  toast.success("Sucessfully removed dp");
                } catch (error) {
                  toast.error("error");
                }
              }}
            >
              Remove dp
            </p>
          </div>
          <div className="profile__form__container">
            <div className="profile__form__edit">
              <p>Username</p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 profile__edit__pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                width={25}
                onClick={(e) => {
                  userNameRef.current.classList.toggle("sidebar__userName");
                  setEdit((prev) => !prev);
                  userNameRef.current.focus();
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <input
              id="userName"
              type="text"
              ref={userNameRef}
              value={userInput != null ? userInput : userDetails.userName}
              onChange={(e) => {
                setUserInput(e.target.value);
              }}
              placeholder={
                userDetails.userName ? userDetails.userName : "No username"
              }
              readOnly={edit}
            />
          </div>
          <div className="profile__form__container">
            <p>Email</p>
            <input type="text" value={userDetails.email} readOnly />
          </div>
          <div className="profile__form__container">
            <p>User Id</p>
            <input type="text" value={userDetails.uid} readOnly />
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

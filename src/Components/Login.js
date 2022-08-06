import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import GoogleButton from "react-google-button";
import { addUserContext } from "../App/features/userAction";
import { useValue } from "../App/StateProvider";
import "../Css/Login.css";
import { auth, db, provider } from "../firebase";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useValue();

  useEffect(() => {}, []);
  const emailRef = useRef();
  const passwordRef = useRef();
  //google sign in
  const googleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      await setDoc(
        doc(db, "users", result.user.uid),
        {
          userName: result.user.displayName,
          email: result.user.email,
          pic: result.user.photoURL,
          uid: result.user.uid,
          online: true,
          createdAt: Timestamp.fromDate(new Date()),
        },
        {
          merge: true,
        }
      );
      //dispatch
      dispatch(
        addUserContext(
          result.user.displayName,
          result.user.email,
          result.user.photoURL,
          result.user.uid
        )
      );
      // navigate("/");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };
  //Login with email and password
  const handleSignIn = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );

      await updateDoc(doc(db, "users", result.user.uid), {
        online: true,
      });

      dispatch(
        addUserContext(
          result.user.displayName,
          result.user.email,
          result.user.photoURL,
          result.user.uid
        )
      );
      // navigate("/");

      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };

  //Login with createUSer
  const handleRegister = async () => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      console.log(result.user);
      //add to database
      await setDoc(
        doc(db, "users", result.user.uid),
        {
          userName: result.user.displayName,
          email: result.user.email,
          pic: result.user.photoURL,
          uid: result.user.uid,
          online: true,
          createdAt: Timestamp.fromDate(new Date()),
        },
        {
          merge: true,
        }
      );

      //dispatch to conttext
      dispatch(
        addUserContext(
          result.user.displayName,
          result.user.email,
          result.user.photoURL,
          result.user.uid
        )
      );
      // navigate("/profile");

      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Loading loading={loading} />
      <div className="login__container">
        <div className="login__title">
          <h1>
            Get <span className="login__span">Started !</span>
          </h1>
          <p className="login__para">
            No hasles stuff just logIn and chat 🔥🔥
          </p>
        </div>

        <form action="/" className="login__form">
          <h1 className="login__form__title">Sign in</h1>
          <div className="login__form__container__group">
            <div className="login__form__container">
              <p>Email</p>
              <input type="text" ref={emailRef} />
            </div>
            <div className="login__form__container">
              <p>Password</p>
              <input type="password" ref={passwordRef} autoComplete="true" />
            </div>
            <div className="login__form__container">
              <button onClick={handleSignIn}>Submit</button>
            </div>
            <div className="login__form__google">
              <p>Or</p>
              <GoogleButton
                className="login__google__button"
                onClick={googleSignIn}
              />
            </div>
          </div>
          <div className="login__register">
            <p>
              Don't have an account ?{" "}
              <span onClick={handleRegister}>Register</span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;

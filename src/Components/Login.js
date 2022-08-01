import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useEffect, useRef } from "react";
import GoogleButton from "react-google-button";
import { addUserContext } from "../App/features/userAction";
import { useValue } from "../App/StateProvider";
import "../Css/Login.css";
import { auth, provider } from "../firebase";

const Login = () => {
  const [state, dispatch] = useValue();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          addUserContext(user.displayName, user.email, user.photoURL, user.uid)
        );
      } else {
        console.log("user is null");
      }
    });
  }, []);
  const emailRef = useRef();
  const passwordRef = useRef();
  //google sign in
  const googleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      dispatch(
        addUserContext(
          result.user.displayName,
          result.user.email,
          result.user.photoURL,
          result.user.uid
        )
      );
    } catch (error) {
      alert(error.message);
    }
  };
  //Login with email and password
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      dispatch(
        addUserContext(
          result.user.displayName,
          result.user.email,
          result.user.photoURL,
          result.user.uid
        )
      );
    } catch (error) {
      alert(error.message);
    }
  };

  //Login with createUSer
  const handleRegister = async () => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      console.log(result.user);
      dispatch(
        addUserContext(
          result.user.displayName,
          result.user.email,
          result.user.photoURL,
          result.user.uid
        )
      );
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login__container">
      <div className="login__title">
        <h1>
          Get Started with the <span className="login__span">Chat</span> app !
        </h1>
        <p className="login__para">
          No bullshit stuff just logIn and chat 🔥🔥
        </p>
      </div>

      <form action="/" className="login__form">
        <h1 className="login__form__title">Sign In</h1>
        <div className="login__form__container__group">
          <div className="login__form__container">
            <p>Email</p>
            <input type="text" ref={emailRef} />
          </div>
          <div className="login__form__container">
            <p>Password</p>
            <input type="password" ref={passwordRef} />
          </div>
          <div className="login__form__container">
            <button onClick={handleSignIn}>Submit</button>
          </div>
          <div className="login__form__google">
            <p>Or SignIn with</p>
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
  );
};

export default Login;

import GoogleButton from "react-google-button";
import "../Css/Login.css";
const Login = () => {
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
        <h1 className="login__form__title">SignIn</h1>
        <div className="login__form__container__group">
          <div className="login__form__container">
            <p>Email</p>
            <input type="text" />
          </div>
          <div className="login__form__container">
            <p>Password</p>
            <input type="text" />
          </div>
          <div className="login__form__container">
            <button>Submit</button>
          </div>
          <div className="login__form__google">
            <p>Or SignIn with</p>
            <GoogleButton className="login__google__button" />
          </div>
        </div>
        <div className="login__register">
          <p>
            Don't have an account ? <a>Register</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;

import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { Link, NavLink } from "react-router-dom";
import { removeUserContext } from "../App/features/userAction";
import { useValue } from "../App/StateProvider";
import "../Css/Navbar.css";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useRef } from "react";
const Navbar = () => {
  const [state, dispatch] = useValue();
  const menuRef = useRef();
  //sign out functionality
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(removeUserContext());
      console.log("I am triggered");
      await updateDoc(doc(db, "users", state.uid), {
        online: false,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleStyle = ({ isActive }) => {
    if (isActive)
      return {
        color: "white",
      };
  };

  const setActive = () => {
    menuRef.current.classList.toggle("active");
  };

  return (
    <>
      <div className="navbar">
        <div className="nav__logo">
          <img src="./assests/logo.png" alt="logo" />
          <h2>Chat App</h2>
        </div>
        <div className="nav__links">
          <NavLink to="/" className="nav__a" style={handleStyle}>
            Home
          </NavLink>
          <NavLink to="/profile" className="nav__a" style={handleStyle}>
            Profile
          </NavLink>
          <button onClick={handleSignOut}>Sign out</button>
        </div>

        <div className="nav__hamburger" onClick={setActive}>
          <MenuRoundedIcon fontSize="large" />
        </div>
      </div>
      <div className="nav__mobileLinks" ref={menuRef}>
        <NavLink to="/" className="nav__a" style={handleStyle}>
          Home
        </NavLink>
        <NavLink to="/profile" className="nav__a" style={handleStyle}>
          Profile
        </NavLink>
        <button onClick={handleSignOut}>Sign out</button>
      </div>
    </>
  );
};

export default Navbar;

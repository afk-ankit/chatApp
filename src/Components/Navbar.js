import { signOut } from "firebase/auth";
import { removeUserContext } from "../App/features/userAction";
import { useValue } from "../App/StateProvider";
import "../Css/Navbar.css";
import { auth } from "../firebase";
const Navbar = () => {
  const [state, dispatch] = useValue();

  //sign out functionality

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(removeUserContext());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar">
      <div className="nav__logo">
        <img src="" alt="logo" />
      </div>
      <div className="nav__links">
        <button onClick={handleSignOut}>Signout</button>
      </div>
    </div>
  );
};

export default Navbar;

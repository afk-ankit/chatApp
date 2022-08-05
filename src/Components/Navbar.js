import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { removeUserContext } from "../App/features/userAction";
import { useValue } from "../App/StateProvider";
import "../Css/Navbar.css";
import { auth, db } from "../firebase";
const Navbar = () => {
  const [state, dispatch] = useValue();

  //sign out functionality

  const handleSignOut = async () => {
    try {
      await updateDoc(doc(db, "users", state.uid), {
        online: false,
      });
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
        <button onClick={handleSignOut}>Sign out</button>
      </div>
    </div>
  );
};

export default Navbar;

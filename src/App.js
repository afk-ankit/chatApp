import "./Css/App.css";
import ChatRoom from "./Components/ChatRoom";
import Login from "./Components/Login";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  Link,
  NavigationType,
} from "react-router-dom";

import Profile from "./Components/Profile";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useValue } from "./App/StateProvider";
import { addUserContext } from "./App/features/userAction";
import AuthProvider from "./AuthProvider";
function App() {
  const navigate = useNavigate();
  const [state, dispatch] = useValue();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          addUserContext(user.displayName, user.email, user.photoURL, user.uid)
        );
        navigate("/");
      } else {
      }
    });
    return unsub;
  }, []);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <AuthProvider>
              <ChatRoom />
            </AuthProvider>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <AuthProvider>
              <Profile />
            </AuthProvider>
          }
        />
      </Routes>
    </>
  );
}

export default App;

import "./Css/App.css";
import ChatRoom from "./Components/ChatRoom";
import Login from "./Components/Login";
import { Routes, Route } from "react-router-dom";
import AuthProvider from "./AuthProvider";
import Profile from "./Components/Profile";
function App() {
  return (
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
  );
}

export default App;

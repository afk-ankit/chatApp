import "./Css/App.css";
import ChatRoom from "./Components/ChatRoom";
import Login from "./Components/Login";
function App() {
  const user = false;
  return user ? (
    <div className="App">
      <ChatRoom />
    </div>
  ) : (
    <Login />
  );
}

export default App;

import "./Css/App.css";
import ChatRoom from "./Components/ChatRoom";
import Login from "./Components/Login";
import { useValue } from "./App/StateProvider";
function App() {
  const [state] = useValue();
  const user = state;
  return user.uid ? (
    <div className="App">
      <ChatRoom />
    </div>
  ) : (
    <Login />
  );
}

export default App;

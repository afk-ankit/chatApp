import { useValue } from "./App/StateProvider";
import { Navigate } from "react-router-dom";
const AuthProvider = ({ children }) => {
  const [state] = useValue();
  console.log(state);
  if (!state.uid) {
    return <Navigate to="/login" />;
  } else return <>{children}</>;
};

export default AuthProvider;

import { createContext, useContext, useReducer } from "react";
import { initialState, reducer } from "./features/userReducer";
//Prepares the data layer
const StateContext = createContext();

//Wrap out app with the data layer
const StateProvider = ({ children }) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
//pulls out the information from the data layer
export const useValue = () => useContext(StateContext);

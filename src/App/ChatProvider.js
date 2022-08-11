import { createContext, useContext, useReducer } from "react";
import { initialState, reducer } from "./features/chatReducer";

const ChatContext = createContext();
const ChatProvider = ({ children }) => {
  return (
    <ChatContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;

export const useChat = () => useContext(ChatContext);

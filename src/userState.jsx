import { useState, createContext } from "react";

export const UserContext = createContext();
const UserContextProvider = ({ children }) => {
  const [mode, setMode] = useState("");
  return (
    <UserContext.Provider value={{ mode, setMode }}>
      {" "}
      {children}{" "}
    </UserContext.Provider>
  );
};
export default UserContextProvider;

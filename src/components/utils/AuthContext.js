import React, { useContext, useEffect, useReducer } from "react";

const UserContext = React.createContext();
let reducer = (userInfo, newInfo) => {
  return {
    ...userInfo,
    ...newInfo,
  };
};
const initialState = { name: "", auth: false, roles: ["guest"] };
const localState = JSON.parse(localStorage.getItem("user"));

const UserProvider = ({ children }) => {
  const [user, setUser] = useReducer(reducer, localState || initialState);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const login = (name) => {
    setUser({
      name: name,
      auth: true,
      roles: ["guest"],
    });
  };

  const logout = () => {
    setUser({
      name: "",
      auth: false,
      roles: ["guest"],
    });
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useGlobalUser = () => {
  return useContext(UserContext);
};

export { UserContext, UserProvider };

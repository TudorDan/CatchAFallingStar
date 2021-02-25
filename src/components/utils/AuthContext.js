import React, { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  const [user, setUser] = useState({ name: "", auth: false, roles: ["guest"] });

  // Login updates the user data with a name parameter
  const login = (name) => {
    setUser({
      name: name,
      auth: true,
      roles: ["guest"],
    });
  };

  // Logout updates the user data to default
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

export { UserProvider, UserContext };

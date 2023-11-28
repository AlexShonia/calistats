import { createContext, useContext, useState } from "react";

const AuthoContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const changeName = (value) => {
    setName(value)
  }
  
  return (
    <AuthoContext.Provider value={{ isLoggedIn, name, changeName, login, logout }}>
      {children}
    </AuthoContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthoContext);
};

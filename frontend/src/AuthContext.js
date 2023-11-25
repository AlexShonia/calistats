import { createContext, useContext, useState } from "react";

const AuthoContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthoContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthoContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthoContext);
};

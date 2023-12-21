import { createContext, useContext, useState } from "react";

const AuthoContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  const [isGuestLoggedOut, setIsGuestLoggedOut] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    sessionStorage.clear();
  };

  const changeMail = (value) => {
    setMail(value);
  };

  const changeName = (value) => {
    setName(value);
  };

  return (
    <AuthoContext.Provider
      value={{
        isLoggedIn,
        mail,
        name,
        isGuestLoggedOut,
        setIsGuestLoggedOut,
        changeMail,
        changeName,
        login,
        logout,
      }}
    >
      {children}
    </AuthoContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthoContext);
};

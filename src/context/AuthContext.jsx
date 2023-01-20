import { createContext, useEffect, useState } from "react";

// firebase components
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

// create context 
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // states
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user);
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

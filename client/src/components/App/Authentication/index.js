import React, { createContext, useContext, useEffect, useState } from "react";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const isAuthed = user?.id ? true : false;

  useEffect(() => {
    fetch("/api/v1/profile", {
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => (res?.id ? setUser(res) : setUser(null)));
  }, []);

  const signin = (email, password) => {
    return fetch("/api/v1/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then(
        (user) => setUser(user.user),
        (error) => setUser(null),
        user
      )
      .catch((error) => error);
  };

  return { user, setUser, isAuthed, signin };
}

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
  // const isAuthed = user?.id ? true : false;
  const isAuthed = true
  useEffect(() => {
    //mock user in context
  setUser({
    firstName: 'Tom',
    lastName: 'Hardy',
    email: 'example@mail.com',
    bio: 'I am a passionate volunteer keen to enhance the connectivity in my local community and provide volunteer help to those in need.',
    phone: '0212223333',
    address: '3 Pleasant Crescent',
    city: 'Auckland',
    zipCode: 1441,
    isVolunteer: true,
    ratings: [4, 5, 4, 4, 5, 5]
  })}, []);
  //   fetch("/api/v1/profile", {
  //     headers: { "Content-type": "application/json" },
  //   })
  //     .then((res) => res.json())
  //     .then((res) => (res?.id ? setUser(res) : setUser(null)));
  // }

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

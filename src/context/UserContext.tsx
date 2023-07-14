import React, { createContext, useState, useEffect } from "react";

export type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export interface User {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  email: string;
  phoneNumber: string;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

type UserContextProviderProps = {
  children: React.ReactNode;
};

export const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // const isTokenExpired = (expiryTimestamp: number): boolean => {
  //   const currentTimestamp = Date.now();
  //   const expiryTime = new Date(expiryTimestamp).getTime();
  //   console.log(expiryTime);

  //   return currentTimestamp <= expiryTime;
  // };
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // useEffect(() => {
  //   const checkTokenExpiry = () => {
  //     const expiryTimestamp = localStorage.getItem("tokenExpiry");

  //     if (user && expiryTimestamp && isTokenExpired(Number(expiryTimestamp))) {
  //       setUser(null);
  //     }
  //   };

  //   const expiryCheckInterval = setInterval(checkTokenExpiry, 5000);

  //   return () => {
  //     clearInterval(expiryCheckInterval);
  //   };
  // }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

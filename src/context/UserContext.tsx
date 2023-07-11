import { createContext, useState } from "react";

export type UserContextType = {
  user: any;
  setUser: any;
};

interface User {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  email: string;
  phoneNumber: string;
}

export const UserContext = createContext({} as UserContextType);

type UserContextProviderType = {
  children: React.ReactNode;
};

export const UserContextProvider = ({ children }: UserContextProviderType) => {
  const [user, setUser] = useState<User | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

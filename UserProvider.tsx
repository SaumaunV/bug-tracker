import React, { createContext, useContext, useEffect, useState } from "react";
import { link } from "./src/config";

export type User = {
    id: string;
    username: string;
    email: string;
    role: string;
} | null

type ContextValue = {
  user: User;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  isDemo: boolean;
  setIsDemo: React.Dispatch<React.SetStateAction<boolean>>;
};

interface Props {
    children?: React.ReactNode;
}

export const UserContext = createContext<ContextValue>({
  user: null,
  loading: false,
  setUser: () => null,
  isDemo: false,
  setIsDemo: () => false,
});


export default function UserProvider({ children }: Props) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User>(null);
    const [isDemo, setIsDemo] = useState(false);

    useEffect(() => {
        const getUser = async () =>{ 
            try {
                const resp = await fetch(
                  `${link}/user`,
                  {
                    credentials: "include",
                  }
                );
                const respData: User = await resp.json();
                setUser(respData);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
        getUser();

    }, [])
  return (
    <UserContext.Provider value={{user, loading, setUser, isDemo, setIsDemo}}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
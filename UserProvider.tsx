import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
    id: string;
    username: string;
    email: string;
    role: string;
} | null

type ContextValue = {
  user: User;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

interface Props {
    children?: React.ReactNode;
}

export const UserContext = createContext<ContextValue>({
  user: null,
  loading: false,
  setUser: () => null,
});


export default function UserProvider({ children }: Props) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User>(null);

    useEffect(() => {
        const getUser = async () =>{ 
            try {
                const resp = await fetch("http://localhost:4000/user", {
                  credentials: "include"
                });
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
    <UserContext.Provider value={{user, loading, setUser}}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
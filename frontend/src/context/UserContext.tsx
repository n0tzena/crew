import { createContext, useContext, useState } from "react";
import type { User, UserContextType } from "../../../shared/types"

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode })
{
    const[user, setUser] = useState<User | null>(() => {
        const saved = localStorage.getItem("user")
        return saved ? JSON.parse(saved) : null;
    });

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser()
{
    const context = useContext(UserContext);

    if(!context) {
        throw new Error("useUser() deve estar dentro da função UserProvider()")
    }

    return context;
}
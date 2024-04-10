"use client"

import { createContext , useContext, useState } from "react"

const GlobalContext =createContext(null)

const stateInitialValue = {
    data:null,
    error: null,
    loading:false
}
export function GlobalState({children}){
    const [user , setUser] = useState(stateInitialValue);
    const [isAuthUser , setIsAuthUser] = useState(stateInitialValue);
    return(
        <GlobalContext.Provider
          value={{
            user,
            setUser,
            isAuthUser,
            setIsAuthUser
          }}
        >
        {children}
        </GlobalContext.Provider>
    )
}
export function useAppContext() { 
  return useContext(GlobalContext);
} 
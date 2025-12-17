import React, { useState, useContext, createContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { getCookie, setCookie, removeCookie } from "./library/cookie"

export const authContext = createContext(null)

export function useAuth() {
  return useContext(authContext);
}

export function ProvideAuth({ children }) {
  const [role, setRole] = useState(() => {
    return getCookie('role')
  })

  const updateRole = (newRole) => {
    setRole(newRole);
    if (newRole) {
      setCookie('role')
    } else {
      removeCookie('role')
    }
  };

  return (
    <authContext.Provider value={{ role, setRole: updateRole }}>
      {children}
    </authContext.Provider>
  )
}

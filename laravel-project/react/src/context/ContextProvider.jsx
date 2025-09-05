import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
});

export const ContextProvider = ({ children }) => {

    const [user, setUser] = useState({});
    const [token, _setToken] = useState(2323);
// localStorage.getItem("ACCESS_TOKEN") || null
    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    }

    return <StateContext.Provider value={{user, token, setToken, setUser}}>{children}</StateContext.Provider>;
};

export const useStateContext = () => useContext(StateContext);

import { createContext, useContext, useEffect, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    notification: null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {},
});

export const ContextProvider = ({ children }) => {
    // const [user, setUser] = useState({});
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("USER");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [token, _setToken] = useState(
        localStorage.getItem("ACCESS_TOKEN") || null
    );
    const [notification, _setNotification] = useState("");

    const setNotification =(message) => {
        _setNotification(message);
        setTimeout(() => {
            _setNotification("");
        }, 3000);
    }

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    useEffect(() => {
        if (user) {
            localStorage.setItem("USER", JSON.stringify(user));
        } else {
            localStorage.removeItem("USER");
        }
    }, [user]);

    useEffect(() => {
        if (token && !user) {
            axiosClient
                .get("/user")
                .then(({ data }) => setUser(data))
                .catch(() => {
                    setToken(null); // token invalid
                    setUser(null);
                });
        }
    }, [token]);

    return (
        <StateContext.Provider value={{ user, token, setToken, setUser, notification, setNotification }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);

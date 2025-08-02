import React, { createContext, useContext, useEffect, useState } from 'react';
import RenderRoutes from './RenderRoutes';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export default function AuthWrapper() {
    const [user, setUser] = useState({ user_email: null, isAuthenticated: false });
    const navigate = useNavigate();

    const login = (userEmail) => {
        setUser({ user_email: userEmail, isAuthenticated: true });
    };

    const autoLogin = () => {
        fetch("http://34.143.192.157:8080/authenticate", {
            credentials: "include",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(" " + response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Auto Sign in successful:");
                login(data.user_email);
                navigate("/dashboard"); 
            })
            .catch((error) => {
                console.log("Auto signin unsuccessful:", error);
                navigate("/"); 
            });
    };

    const logout = () => {
        setUser({ user_email: null, isAuthenticated: false });
        fetch("http://34.143.192.157:8080/logoutUser", {
            credentials: "include",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Logout request failed");
                }
                console.log("User logged out successfully");
                return response.json();
            })
            .then((data) => {
                console.log("User logged out, navigating to homepage");
                navigate("/");
            })
            .catch((error) => {
                console.log("Error during logout:", error);
                navigate("/");
            });
    };


    useEffect(() => {
        autoLogin();
    }, []); // Only run on initial render

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            <RenderRoutes />
        </AuthContext.Provider>
    );
}

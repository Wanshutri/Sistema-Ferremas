// AuthContext.js
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    isAuthenticated: false,
    usuario: null,
  });

  const login = async (correo, contrasena) => {
    try {
      const response = await fetch("http://localhost:3001/api/autenticar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correoUsuario: correo,
          contrasenaUsuario: contrasena,
        }),
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("user", data.usuario.idUsuario);
        localStorage.setItem("token", data.token);
        setAuthState({
          token: data.token,
          usuario: data.usuario,
          isAuthenticated: true,
        });
        return { success: true, usuario: data.usuario };
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      logout();
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthState({
      token: null,
      isAuthenticated: false,
      usuario: null,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user");
    if (token) {
      setAuthState({
        token,
        isAuthenticated: true,
        usuario: userId,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
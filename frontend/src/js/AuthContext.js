// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    isAuthenticated: false,
    usuario: null
  });

  const login = async (correo, contrasena) => {
    try {
      const response = await fetch('http://node_ferremas:3001/api/autenticar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correoUsuario: correo,
          contrasenaUsuario: contrasena
        })
      });
      const data = await response.json();
      if (data) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', data.usuario.idUsuario);
        setAuthState({
          token: data.token,
          usuario: data.usuario,
          isAuthenticated: true,
        });
      } else {
        // Manejo de errores del servidor (por ejemplo, si el servidor devuelve un mensaje de error)
        throw new Error(data.message);
      }
    } catch (error) {
      // Manejo de errores de red
      console.error('Error al intentar iniciar sesión:', error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthState({
      token: null,
      isAuthenticated: false,
      usuario: null
    });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user');
    if (token) {
      setAuthState({
        token,
        isAuthenticated: true,
        usuario: userId
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
// context/auth.context.js
import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const AuthContext = createContext(undefined)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem('user')
    return storedUser ? JSON.parse(storedUser) : null
  })

  useEffect(() => {
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user))
      sessionStorage.setItem('token', user.token) // Store token separately
    } else {
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('token')
    }
  }, [user])

  const login = async (credentials) => {
    try {
      const response = await axios.post(
        `${API_URL}/registration/authenticate`,
        credentials
      )
      console.log('Response from API:', response.data) // Debugging the response

      // El token es una cadena simple en la respuesta
      const token = response.data
      if (!token) {
        throw new Error('Token not found in the response')
      }

      // Decodifica el token para extraer la información del usuario
      const userInfo = JSON.parse(atob(token.split('.')[1]))
      console.log('Decoded User Info:', userInfo) // Print decoded user info to console

      // Aquí puedes agregar una solicitud adicional para obtener datos completos del usuario si es necesario

      // Guarda el usuario y el token
      setUser({ ...userInfo, token })
      console.log('JWT Token:', token) // Print token to console
    } catch (error) {
      console.error('Error during login:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      const token = sessionStorage.getItem('token')
      await axios.post(
        `${API_URL}/registration/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 5000, // Setting a timeout of 5 seconds
        }
      )
      setUser(null)
    } catch (error) {
      console.error('Error during logout:', error)
      throw error
    }
  }

  const register = async (userData) => {
    try {
      const response = await axios.post(
        `${API_URL}/registration/registry`,
        userData
      )
      return response.data
    } catch (error) {
      console.error('Error during registration:', error)
      throw error
    }
  }

  const handleUpdateUser = async (updatedUser) => {
    try {
      const token = sessionStorage.getItem('token')
      const response = await axios.put(
        `${API_URL}/user/${updatedUser.id}`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setUser(response.data)
    } catch (error) {
      console.error('Error updating user:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, handleUpdateUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

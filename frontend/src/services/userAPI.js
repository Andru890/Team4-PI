import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`)
    console.log('Users: ')
    console.table(response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching user by ID:', error)
    throw error
  }
}

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/user`, userData)
    return response.data
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

export const updateUser = async (userData) => {
  try {
    const response = await axios.put(`${API_URL}/user/${userData.id}`, userData)
    return response.data
  } catch (error) {
    console.error('Error updating user:', error)
    throw error
  }
}

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/user/${userId}`)
    return response.data
  } catch (error) {
    console.error('Error deleting user:', error)
    throw error
  }
}

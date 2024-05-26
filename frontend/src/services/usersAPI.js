import axios from 'axios'

const API_URL = 'http://localhost:8000'

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`)
    return response.data
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData)
    return response.data
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

export const updateUser = async (userData) => {
  try {
    const response = await axios.put(
      `${API_URL}/users/${userData.id}`,
      userData
    )
    return response.data
  } catch (error) {
    console.error('Error updating user:', error)
    throw error
  }
}

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${userId}`)
    return response.data
  } catch (error) {
    console.error('Error deleting user:', error)
    throw error
  }
}

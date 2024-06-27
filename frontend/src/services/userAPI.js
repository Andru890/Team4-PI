import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

const getAuthHeaders = () => {
  const token = sessionStorage.getItem('token')
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/all`, getAuthHeaders())
    return response.data
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

export const getUserById = async (userId) => {
  try {
    const response = await axios.get(
      `${API_URL}/user/${userId}`,
      getAuthHeaders()
    )
    return response.data
  } catch (error) {
    console.error('Error fetching user by ID:', error)
    throw error
  }
}

export const createUser = async (userData) => {
  try {
    const response = await axios.post(
      `${API_URL}/user`,
      userData,
      getAuthHeaders()
    )
    return response.data
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

export const updateUser = async (userData) => {
  try {
    const response = await axios.put(
      `${API_URL}/user/${userData.email}`,
      userData,
      getAuthHeaders()
    )
    return response.data
  } catch (error) {
    console.error('Error updating user:', error)
    throw error
  }
}

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/user/${userId}`,
      getAuthHeaders()
    )
    return response.data
  } catch (error) {
    console.error('Error deleting user:', error)
    throw error
  }
}

export const getUserByEmail = async (email) => {
  try {
    const response = await axios.get(
      `${API_URL}/user/email/${email}`,
      getAuthHeaders()
    )
    return response.data
  } catch (error) {
    console.error('Error fetching user by email:', error)
    throw error
  }
}

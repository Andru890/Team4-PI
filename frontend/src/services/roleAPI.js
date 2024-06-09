import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const getRole = async () => {
  try {
    const res = await axios.get(`${API_URL}/role`)
    console.log('Roles: ')
    console.table(res.data)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export const getRoleById = async (roleId) => {
  try {
    const res = await axios.get(`${API_URL}/role/${roleId}`)
    console.log(res.data)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export const addRole = async (role) => {
  try {
    const res = await axios.post(`${API_URL}/role`, role)
    console.log(res.data)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export const deleteRole = async (roleId) => {
  try {
    const res = await axios.delete(`${API_URL}/role/${roleId}`)
    console.log(res.data)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export const updateRole = async (roleId, role) => {
  try {
    const res = await axios.put(`${API_URL}/role/change/${roleId}`, role)
    console.log(res.data)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

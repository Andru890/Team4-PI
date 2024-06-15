import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const getCategory = async () => {
  try {
    const res = await axios.get(`${API_URL}/category`)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export const getCategoryById = async (categoryId) => {
  try {
    const res = await axios.get(`${API_URL}/category/detail/${categoryId}`)
    console.log(res.data)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export const addCategory = async (category) => {
  try {
    const res = await axios.post(`${API_URL}/category`, category)
    console.log(res.data)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export const deleteCategory = async (categoryId) => {
  try {
    const res = await axios.delete(`${API_URL}/category/${categoryId}`)
    console.log(res.data)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export const updateCategory = async (categoryId, category) => {
  try {
    const res = await axios.put(`${API_URL}/category/${categoryId}`, category)
    console.log(res.data)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

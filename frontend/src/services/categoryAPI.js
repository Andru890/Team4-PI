import axios from 'axios'

const API_URL = 'http://localhost:8000'

// GET /category
export const getCategory = async () => {
  try {
    const res = await axios.get(`${API_URL}/category`)
    console.log(res.data)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

// GET /category/detail/:id
export const getCategoryById = async (categoryId) => {
  try {
    const res = await axios.get(`${API_URL}/category/detail/${categoryId}`)
    console.log(res.data)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

// POST /category
export const addCategory = async (category) => {
  try {
    const res = await axios.post(`${API_URL}/category`, category)
    console.log(res.data)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

// DELETE /category/:id
export const deleteCategory = async (categoryId) => {
  try {
    const res = await axios.delete(`${API_URL}/category/${categoryId}`)
    console.log(res.data)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

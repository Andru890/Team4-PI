import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL_DEVELOPMENT

export const getProduct = async () => {
  try {
    const res = await axios.get(`${API_URL}/product`)
    console.log(res.data)
    return res.data
  } catch (error) {
    console.error(error)
  }
}
export const getProductById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/product/detail/${id}`)
    console.log(res.data)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export const addProduct = async (product) => {
  try {
    const res = await axios.post(`${API_URL}/product`, product)
    console.log(res.data)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export const deleteProduct = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/product/${id}`)
    console.log(res.data)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export const updateProduct = async (product) => {
  try {
    const res = await axios.put(`${API_URL}/product/${product.id}`, product)
    console.log(res.data)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export const addProductCategory = async (productId, categoryId) => {
  try {
    const res = await axios.put(
      `${API_URL}/product/${productId}/category/${categoryId}`
    )
    console.log(res.data)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

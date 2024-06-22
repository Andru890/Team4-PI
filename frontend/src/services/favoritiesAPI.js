import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const getFavorities = async () => {
  try {
    const res = await axios.get(`${API_URL}/favorites/list`)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export const addFavorities = async (userEmail, productId) => {
  try {
    const res = await axios.post(
      `${API_URL}/favorites/user/${userEmail}/product/${productId}`
    )
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export const getFavoritiesByUser = async (userEmail) => {
  try {
    const res = await axios.get(`${API_URL}/favorites/user/${userEmail}`)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export const deleteFavorities = async (favListID) => {
  try {
    const res = await axios.delete(
      `${API_URL}/favorites/user/product/${favListID}`
    )
    return res.data
  } catch (error) {
    console.error(error)
  }
}

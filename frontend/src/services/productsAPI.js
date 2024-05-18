import axios from 'axios'

export const getProduct = async () => {
  try {
    const res = await axios.get('https://localhost:8000/product')
    console.log(res.data)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

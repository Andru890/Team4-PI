import axios from 'axios'
import { toast } from 'sonner'

const API_URL = import.meta.env.VITE_API_URL

const getAuthToken = () => {
  return sessionStorage.getItem('token')
}

export const getQualify = async () => {
  try {
    const res = await axios.get(`${API_URL}/qualify`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export const postQualify = async (
  userEmail,
  productId,
  reservationId,
  rating,
  comment
) => {
  try {
    const url = `${API_URL}/qualify/user/${userEmail}/product/${productId}?reservationId=${reservationId}`
    const data = {
      rating: rating,
      coment: comment,
    }
    const res = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
    })
    return res.data
  } catch (error) {
    console.error(error)
    if (
      error.response &&
      error.response.data.error === `El usuario no puede calificar la reserva`
    ) {
      toast.error(
        `No puedes calificar este producto, no tienes reservas asociadas a ${userEmail}`
      )
    } else {
      toast.error('Ocurrió un error al intentar calificar')
    }
  }
}

export const getQualifyByProduct = async (productId) => {
  try {
    const res = await axios.get(`${API_URL}/qualify/product/${productId}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export const getQualifyByUser = async (userEmail) => {
  try {
    const res = await axios.get(`${API_URL}/qualify/user/${userEmail}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })
    return res.data
  } catch (error) {
    console.error(error)
  }
}

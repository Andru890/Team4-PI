import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

const getAuthToken = () => {
  return sessionStorage.getItem('token')
}

export const getFeatures = async () => {
  try {
    const response = await axios.get(`${API_URL}/product-detail`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching features:', error)
    throw error
  }
}

export const getFeatureById = async (featureId) => {
  try {
    const response = await axios.get(`${API_URL}/product-detail/${featureId}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching feature by ID:', error)
    throw error
  }
}

export const createFeature = async (featureData) => {
  try {
    const response = await axios.post(
      `${API_URL}/product-detail`,
      {
        characteristic: featureData.characteristic,
        imageUrl: featureData.imageUrl,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Error creating feature:', error)
    throw error
  }
}

export const updateFeature = async (featureData) => {
  try {
    const response = await axios.put(
      `${API_URL}/product-detail/${featureData.id}`,
      {
        characteristic: featureData.characteristic,
        image: featureData.image,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Error updating feature:', error)
    throw error
  }
}

export const deleteFeature = async (featureId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/product-detail/${featureId}`,
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Error deleting feature:', error)
    throw error
  }
}

export const getFeaturesByProduct = async (productId) => {
  try {
    const response = await axios.get(
      `${API_URL}/product-detail/product-characteristic/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Error getting features by product:', error)
    throw error
  }
}

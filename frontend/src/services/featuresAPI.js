import axios from 'axios'

const API_URL = 'http://localhost:8000'

export const getFeatures = async () => {
  try {
    const response = await axios.get(`${API_URL}/features`)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching features:', error)
    throw error
  }
}

export const getFeatureById = async (featureId) => {
  try {
    const response = await axios.get(`${API_URL}/features/${featureId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching feature by ID:', error)
    throw error
  }
}

export const createFeature = async (featureData) => {
  try {
    const response = await axios.post(`${API_URL}/features`, featureData)
    return response.data
  } catch (error) {
    console.error('Error creating feature:', error)
    throw error
  }
}

export const updateFeature = async (featureData) => {
  try {
    const response = await axios.put(
      `${API_URL}/features/${featureData.id}`,
      featureData
    )
    return response.data
  } catch (error) {
    console.error('Error updating feature:', error)
    throw error
  }
}

export const deleteFeature = async (featureId) => {
  try {
    const response = await axios.delete(`${API_URL}/features/${featureId}`)
    return response.data
  } catch (error) {
    console.error('Error deleting feature:', error)
    throw error
  }
}

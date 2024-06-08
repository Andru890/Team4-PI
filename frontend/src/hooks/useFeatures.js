import { useCallback, useEffect } from 'react'

import {
  getFeatures,
  getFeatureById,
  createFeature,
  updateFeature,
  deleteFeature,
  getFeaturesByProduct,
} from '@/services/featuresAPI'

export const useFeatures = (dispatch) => {
  const handleGetFeatures = useCallback(async () => {
    try {
      const data = await getFeatures()
      if (data) {
        dispatch({ type: 'GET_FEATURES', payload: data })
      } else {
        throw new Error('Failed to fetch features data')
      }
    } catch (error) {
      console.error('Failed to fetch features data', error)
    }
  }, [dispatch])

  const handleGetFeatureById = useCallback(
    async (id) => {
      if (!id) {
        throw new Error('Feature ID is required')
      }
      const data = await getFeatureById(id)
      if (data) {
        dispatch({ type: 'GET_FEATURE_DETAIL', payload: data })
      } else {
        throw new Error('Failed to fetch feature detail')
      }
    },
    [dispatch]
  )

  const handleCreateFeature = useCallback(
    async (feature) => {
      if (!feature) {
        throw new Error('Feature is required')
      }
      const data = await createFeature(feature)
      if (data) {
        dispatch({ type: 'ADD_FEATURE', payload: data })
      } else {
        throw new Error('Failed to add feature')
      }
    },
    [dispatch]
  )

  const handleUpdateFeature = useCallback(
    async (feature) => {
      if (!feature) {
        throw new Error('Feature is required')
      }
      const data = await updateFeature(feature)
      if (data) {
        dispatch({ type: 'UPDATE_FEATURE', payload: data })
      } else {
        throw new Error('Failed to update feature')
      }
    },
    [dispatch]
  )

  const handleDeleteFeature = useCallback(
    async (id) => {
      if (!id) {
        throw new Error('Feature ID is required')
      }
      await deleteFeature(id)
      dispatch({ type: 'DELETE_FEATURE', payload: id })
    },
    [dispatch]
  )

  const handleGetFeaturesByProduct = useCallback(
    async (productId) => {
      if (!productId) {
        throw new Error('Product ID is required')
      }
      const data = await getFeaturesByProduct(productId)
      if (data) {
        dispatch({ type: 'GET_FEATURES_BY_PRODUCT', payload: data })
      } else {
        throw new Error('Failed to fetch features by product')
      }
    },
    [dispatch]
  )

  useEffect(() => {
    handleGetFeatures()
  }, [handleGetFeatures])

  return {
    handleGetFeatures,
    handleGetFeatureById,
    handleCreateFeature,
    handleUpdateFeature,
    handleDeleteFeature,
    handleGetFeaturesByProduct,
  }
}

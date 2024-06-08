import { useCallback, useEffect } from 'react'
import {
  getCategory,
  getCategoryById,
  addCategory,
  deleteCategory,
} from '@/services/categoryAPI'

export const useCategory = (dispatch) => {
  const handleGetCategory = useCallback(async () => {
    try {
      const data = await getCategory()
      if (data) {
        dispatch({ type: 'GET_CATEGORY', payload: data })
      } else {
        throw new Error('Failed to fetch category data')
      }
    } catch (error) {
      console.error(error)
      // Handle error here
    }
  }, [dispatch])

  const handleGetCategoryById = useCallback(
    async (id) => {
      if (!id) {
        throw new Error('Category ID is required')
      }
      const data = await getCategoryById(id)
      if (data) {
        dispatch({ type: 'GET_CATEGORY_DETAIL', payload: data })
      } else {
        throw new Error('Failed to fetch category detail')
      }
    },
    [dispatch]
  )

  const handleAddCategory = useCallback(
    async (category) => {
      if (!category) {
        throw new Error('Category is required')
      }
      const data = await addCategory(category)
      if (data) {
        dispatch({ type: 'ADD_CATEGORY', payload: data })
      } else {
        throw new Error('Failed to add category')
      }
    },
    [dispatch]
  )

  const handleDeleteCategory = useCallback(
    async (id) => {
      if (!id) {
        throw new Error('Category ID is required')
      }
      await deleteCategory(id)
      dispatch({ type: 'DELETE_CATEGORY', payload: id })
    },
    [dispatch]
  )

  useEffect(() => {
    handleGetCategory()
  }, [handleGetCategory])

  return {
    handleGetCategory,
    handleGetCategoryById,
    handleAddCategory,
    handleDeleteCategory,
  }
}

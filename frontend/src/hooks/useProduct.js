import { useCallback, useEffect } from 'react'

import {
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  addProductCategory,
} from '@/services/productsAPI'

export const useProduct = (dispatch) => {
  const handleGetProduct = useCallback(async () => {
    try {
      const data = await getProduct()
      if (data) {
        dispatch({ type: 'GET_LIST', payload: data })
      } else {
        throw new Error('Failed to fetch product data')
      }
    } catch (error) {
      throw new Error('Failed to fetch product data')
    }
  }, [dispatch])

  const handleGetProductById = useCallback(
    async (id) => {
      if (!id) {
        throw new Error('Product ID is required')
      }
      const data = await getProductById(id)
      if (data) {
        dispatch({ type: 'GET_DETAIL', payload: data })
      } else {
        throw new Error('Failed to fetch product detail')
      }
    },
    [dispatch]
  )

  const handleAddProduct = useCallback(
    async (product) => {
      if (!product) {
        throw new Error('Product is required')
      }
      const data = await addProduct(product)
      if (data) {
        dispatch({ type: 'ADD_PRODUCT', payload: data })
      } else {
        throw new Error('Failed to add product')
      }
    },
    [dispatch]
  )

  const handleUpdateProduct = useCallback(
    async (product) => {
      if (!product) {
        throw new Error('Product is required')
      }
      const data = await updateProduct(product)
      if (data) {
        dispatch({ type: 'UPDATE_PRODUCT', payload: data })
      } else {
        throw new Error('Failed to update product')
      }
    },
    [dispatch]
  )

  const handleDeleteProduct = useCallback(
    async (id) => {
      if (!id) {
        throw new Error('Product ID is required')
      }
      await deleteProduct(id)
      dispatch({ type: 'DELETE_PRODUCT', payload: id })
    },
    [dispatch]
  )

  const handleUpdateProductStock = useCallback(
    async (id, newStock) => {
      if (!id || newStock === null) {
        throw new Error('Product ID and new stock are required')
      }
      const data = await updateProduct({ id, stock: newStock })
      if (data) {
        dispatch({
          type: 'UPDATE_PRODUCT_STOCK',
          payload: { id, stock: newStock },
        })
      } else {
        throw new Error('Failed to update product stock')
      }
    },
    [dispatch]
  )

  const handleUpdateProductCategory = useCallback(
    async (productId, categoryId) => {
      if (!productId || !categoryId) {
        throw new Error('Product ID and category ID are required')
      }
      const data = await addProductCategory(productId, categoryId)
      if (data) {
        dispatch({
          type: 'UPDATE_PRODUCT_CATEGORY',
          payload: { productId, categoryId },
        })
      } else {
        throw new Error('Failed to update product category')
      }
    },
    [dispatch]
  )

  useEffect(() => {
    handleGetProduct()
  }, [handleGetProduct])

  return {
    handleGetProduct,
    handleGetProductById,
    handleAddProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    handleUpdateProductStock,
    handleUpdateProductCategory,
  }
}

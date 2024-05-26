import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from 'react'
import { reducer } from '@/reducer/reducer'
import {
  getProduct,
  addProduct,
  deleteProduct as apiDeleteProduct,
  getProductById,
} from '@/services/productsAPI'
import {
  getCategory,
  getCategoryById,
  addCategory,
  deleteCategory,
} from '@/services/categoryAPI'

export const initialState = {
  data: [],
  productSelected: {},
  dataCategory: [],
  categorySelected: {},
}

export const ContextGlobal = createContext(undefined)

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

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
  }, [])

  const handleGetProductById = useCallback(async (id) => {
    if (!id) {
      throw new Error('Product ID is required')
    }
    const data = await getProductById(id)
    if (data) {
      dispatch({ type: 'GET_DETAIL', payload: data })
    } else {
      throw new Error('Failed to fetch product detail')
    }
  }, [])

  const handleAddProduct = useCallback(async (product) => {
    if (!product) {
      throw new Error('Product is required')
    }
    const data = await addProduct(product)
    if (data) {
      dispatch({ type: 'ADD_PRODUCT', payload: data })
    } else {
      throw new Error('Failed to add product')
    }
  }, [])

  const handleDeleteProduct = useCallback(async (id) => {
    if (!id) {
      throw new Error('Product ID is required')
    }
    await apiDeleteProduct(id)
    dispatch({ type: 'DELETE_PRODUCT', payload: id })
  }, [])

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
  }, [])

  const handleGetCategoryById = useCallback(async (id) => {
    if (!id) {
      throw new Error('Category ID is required')
    }
    const data = await getCategoryById(id)
    if (data) {
      dispatch({ type: 'GET_CATEGORY_DETAIL', payload: data })
    } else {
      throw new Error('Failed to fetch category detail')
    }
  }, [])

  const handleAddCategory = useCallback(async (category) => {
    if (!category) {
      throw new Error('Category is required')
    }
    const data = await addCategory(category)
    dispatch({ type: 'ADD_CATEGORY', payload: data })
  }, [])

  const handleDeleteCategory = useCallback(async (id) => {
    if (!id) {
      throw new Error('Category ID is required')
    }
    await deleteCategory(id)
    dispatch({ type: 'DELETE_CATEGORY', payload: id })
  }, [])

  useEffect(() => {
    handleGetProduct()
  }, [handleGetProduct])

  useEffect(() => {
    handleGetCategory()
  }, [handleGetCategory])

  return (
    <ContextGlobal.Provider
      value={{
        state,
        dispatch,
        handleGetProductById,
        handleAddProduct,
        handleDeleteProduct,
        handleGetCategory,
        handleGetCategoryById,
        handleAddCategory,
        handleDeleteCategory,
      }}
    >
      {children}
    </ContextGlobal.Provider>
  )
}

export const useGlobalContext = () => useContext(ContextGlobal)

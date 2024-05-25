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
}

export const ContextGlobal = createContext(undefined)

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleGetProduct = useCallback(async () => {
    const data = await getProduct()
    dispatch({ type: 'GET_LIST', payload: data })
  }, [])

  const handleGetProductById = useCallback(async (id) => {
    const data = await getProductById(id)
    dispatch({ type: 'GET_DETAIL', payload: data })
  }, [])

  const handleAddProduct = useCallback(async (product) => {
    const data = await addProduct(product)
    dispatch({ type: 'ADD_PRODUCT', payload: data })
  }, [])

  const handleDeleteProduct = useCallback(async (id) => {
    const data = await apiDeleteProduct(id)
    dispatch({ type: 'DELETE_PRODUCT', payload: data })
  }, [])

  const handleGetCategory = useCallback(async () => {
    const data = await getCategory()
    dispatch({ type: 'GET_CATEGORY', payload: data })
  }, [])

  const handleGetCategoryById = useCallback(async (id) => {
    const data = await getCategoryById(id)
    dispatch({ type: 'GET_CATEGORY_DETAIL', payload: data })
  }, [])

  const handleAddCategory = useCallback(async (category) => {
    const data = await addCategory(category)
    dispatch({ type: 'ADD_CATEGORY', payload: data })
  }, [])

  const handleDeleteCategory = useCallback(async (id) => {
    const data = await deleteCategory(id)
    dispatch({ type: 'DELETE_CATEGORY', payload: data })
  }, [])

  useEffect(() => {
    handleGetProduct()
  }, [handleGetProduct])

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

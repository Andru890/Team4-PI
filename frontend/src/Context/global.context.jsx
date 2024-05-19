import React, {
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
    await apiDeleteProduct(id)
    dispatch({ type: 'DELETE_PRODUCT', payload: id })
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
      }}
    >
      {children}
    </ContextGlobal.Provider>
  )
}

export const useGlobalContext = () => useContext(ContextGlobal)

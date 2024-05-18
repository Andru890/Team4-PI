import { createContext, useContext, useEffect, useReducer } from 'react'
import { reducer } from '@/reducer/reducer'
import { getProduct, addProduct, deleteProduct } from '@/services/productsAPI'

export const initialState = {
  data: [],
  productSelected: {},
}

export const ContextGlobal = createContext(undefined)

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleGetProduct = async () => {
    const data = await getProduct()
    dispatch({ type: 'GET_LIST', payload: data })
  }

  const handleAddProduct = async () => {
    const data = await addProduct()
    dispatch({ type: 'ADD_PRODUCT', payload: data })
  }

  const handleDeleteProduct = async () => {
    const data = await deleteProduct()
    dispatch({ type: 'DELETE_PRODUCT', payload: data })
  }

  useEffect(() => {
    handleGetProduct()
  }, [])

  return (
    <ContextGlobal.Provider
      value={{ state, dispatch, handleAddProduct, handleDeleteProduct }}
    >
      {children}
    </ContextGlobal.Provider>
  )
}

export const useGlobalContext = () => useContext(ContextGlobal)

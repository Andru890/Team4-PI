import { createContext, useContext, useEffect, useReducer } from 'react'
import { reducer } from '@/reducer/reducer'
import { getProduct } from '@/services/productsAPI'

export const initialState = {
  data: [],
  productSelected: {},
}
export const ContextGlobal = createContext(undefined)
export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    getProduct().then((data) => {
      dispatch({ type: 'GET_LIST', payload: data })
    })
  }, [])

  return (
    <ContextGlobal.Provider value={{ state, dispatch }}>
      {children}
    </ContextGlobal.Provider>
  )
}

export const useGlobalContext = () => useContext(ContextGlobal)

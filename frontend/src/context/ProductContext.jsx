import { createContext, useContext, useReducer } from 'react'
import { useProduct } from '@/hooks/useProduct'
import { initialState } from '@/context/initialState'
import { reducer } from '@/context/reducer/reducer'

const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const productHandlers = useProduct(dispatch)

  return (
    <ProductContext.Provider value={{ state, dispatch, ...productHandlers }}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProductContext = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider')
  }
  return context
}

import { initialState } from '@/context/initialState'
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
  updateProduct,
  deleteProduct,
  getProductById,
} from '@/services/productsAPI'
import {
  getCategory,
  getCategoryById,
  addCategory,
  deleteCategory,
} from '@/services/categoryAPI'
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '@/services/userAPI'

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

  const handleUpdateProduct = useCallback(async (product) => {
    if (!product) {
      throw new Error('Product is required')
    }
    const data = await updateProduct(product)
    if (data) {
      dispatch({ type: 'UPDATE_PRODUCT', payload: data })
    } else {
      throw new Error('Failed to update product')
    }
  }, [])

  const handleUpdateProductStock = useCallback(async (id, newStock) => {
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
  }, [])

  const handleDeleteProduct = useCallback(async (id) => {
    if (!id) {
      throw new Error('Product ID is required')
    }
    await deleteProduct(id)
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
    if (data) {
      dispatch({ type: 'ADD_CATEGORY', payload: data })
    } else {
      throw new Error('Failed to add category')
    }
  }, [])

  const handleDeleteCategory = useCallback(async (id) => {
    if (!id) {
      throw new Error('Category ID is required')
    }
    await deleteCategory(id)
    dispatch({ type: 'DELETE_CATEGORY', payload: id })
  }, [])

  const handleGetUser = useCallback(async () => {
    try {
      const data = await getUsers()
      if (data) {
        dispatch({ type: 'GET_USER', payload: data })
      } else {
        throw new Error('Failed to fetch user data')
      }
    } catch (error) {
      console.error(error)
    }
  }, [])

  const handleGetUserById = useCallback(async (id) => {
    if (!id) {
      throw new Error('User ID is required')
    }
    const data = await getUserById(id)
    if (data) {
      dispatch({ type: 'GET_USER_DETAIL', payload: data })
    } else {
      throw new Error('Failed to fetch user detail')
    }
  }, [])

  const handleAddUser = useCallback(async (user) => {
    if (!user) {
      throw new Error('User is required')
    }
    const data = await createUser(user)
    if (data) {
      dispatch({ type: 'ADD_USER', payload: data })
    } else {
      throw new Error('Failed to add user')
    }
  }, [])

  const handleUpdateUser = useCallback(async (user) => {
    if (!user) {
      throw new Error('User is required')
    }
    const data = await updateUser(user)
    if (data) {
      dispatch({ type: 'UPDATE_USER', payload: data })
    } else {
      throw new Error('Failed to update user')
    }
  }, [])

  const handleDeleteUser = useCallback(async (id) => {
    if (!id) {
      throw new Error('User ID is required')
    }
    await deleteUser(id)
    dispatch({ type: 'DELETE_USER', payload: id })
  }, [])

  useEffect(() => {
    handleGetProduct()
  }, [handleGetProduct])

  useEffect(() => {
    handleGetCategory()
  }, [handleGetCategory])

  useEffect(() => {
    handleGetUser()
  }, [handleGetUser])

  return (
    <ContextGlobal.Provider
      value={{
        state,
        dispatch,
        handleGetProductById,
        handleAddProduct,
        handleUpdateProduct,
        handleUpdateProductStock,
        handleDeleteProduct,
        handleGetCategory,
        handleGetCategoryById,
        handleAddCategory,
        handleDeleteCategory,
        handleGetUser,
        handleGetUserById,
        handleAddUser,
        handleUpdateUser,
        handleDeleteUser,
      }}
    >
      {children}
    </ContextGlobal.Provider>
  )
}

export const useGlobalContext = () => useContext(ContextGlobal)

import { initialState } from '@/context/initialState'
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from 'react'
import { reducer } from '@/context/reducer/reducer'
import {
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  addProductCategory,
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
import { updateRole } from '@/services/roleAPI'
import { toast } from 'sonner'

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
    []
  )

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
  const handleCreateUser = useCallback(async (user) => {
    try {
      const response = await createUser(user)
      if (response) {
        dispatch({
          type: 'ADD_USER',
          payload: response,
        })
        return response
      }
    } catch (error) {
      console.error('Failed to create user', error)
      return null
    }
  }, [])

  const handleGetUsers = useCallback(async () => {
    try {
      const data = await getUsers()
      if (data) {
        dispatch({
          type: 'GET_USER',
          payload: data,
        })
      } else {
        throw new Error('Failed to fetch user data')
      }
    } catch (error) {
      console.error('Failed to fetch user data', error)
    }
  }, [])

  const handleGetUserById = useCallback(async (id) => {
    const user = await getUserById(id)
    dispatch({
      type: 'GET_USER_DETAIL',
      payload: user,
    })
  }, [])

  const handleUpdateUser = useCallback(async (user) => {
    const updatedUser = await updateUser(user)
    dispatch({
      type: 'UPDATE_USER',
      payload: updatedUser,
    })
  }, [])

  const handleDeleteUser = useCallback(async (id) => {
    if (!id) {
      throw new Error('User ID is required')
    }
    await deleteUser(id)
    dispatch({
      type: 'DELETE_USER',
      payload: id,
    })
  }, [])

  const login = useCallback(async (email, password) => {
    try {
      const users = await getUsers()
      const user = users.find(
        (u) => u.email === email && u.password === password
      )
      if (user) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: user })
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('user', JSON.stringify(user))
        return user
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      console.error('Login failed', error)
      throw error
    }
  }, [])

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' })
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('user')
  }, [])

  const handleRoleChange = useCallback(async (userId, newRole) => {
    try {
      // Realiza la solicitud al servidor para actualizar el rol
      const updatedUser = await updateRole(userId, { name: newRole })
      // Actualiza el estado con el nuevo usuario actualizado
      dispatch({ type: 'UPDATE_USER', payload: updatedUser })
      toast.success(
        `Rol actualizado con éxito para el usuario ${updatedUser.name}`
      )
    } catch (error) {
      console.error('Failed to update user role', error)
      toast.error('Error al actualizar el rol del usuario')
    }
  }, [])

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
    const user = JSON.parse(localStorage.getItem('user'))
    if (isAuthenticated && user) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: user })
    }
  }, [])

  useEffect(() => {
    handleGetProduct()
  }, [handleGetProduct])

  useEffect(() => {
    handleGetCategory()
  }, [handleGetCategory])

  useEffect(() => {
    handleGetUsers()
  }, [handleGetUsers])

  const data = {
    state,
    dispatch,
    handleGetProductById,
    handleAddProduct,
    handleUpdateProduct,
    handleUpdateProductStock,
    handleUpdateProductCategory,
    handleDeleteProduct,
    handleGetCategory,
    handleGetCategoryById,
    handleAddCategory,
    handleDeleteCategory,
    handleCreateUser,
    handleGetUserById,
    handleUpdateUser,
    handleDeleteUser,
    login,
    logout,
    handleRoleChange,
  }

  return (
    <ContextGlobal.Provider value={data}>{children}</ContextGlobal.Provider>
  )
}

export const useGlobalContext = () => {
  const context = useContext(ContextGlobal)
  if (!context) {
    throw new Error('useGlobalContext must be used within a ContextProvider')
  }
  return context
}

import { initialState } from '@/context/initialState'
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from 'react'
import { reducer } from '@/context/reducer/reducer'
import { updateRole } from '@/services/roleAPI'
import { toast } from 'sonner'
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
import {
  getFeatures,
  getFeatureById,
  createFeature,
  updateFeature,
  deleteFeature,
  getFeaturesByProduct,
} from '@/services/featuresAPI'
import { getRole } from '@/services/roleAPI'

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

  const handleUpdateUser = async (updatedUser) => {
    try {
      const response = await updateUser(updatedUser)
      if (response) {
        dispatch({ type: 'UPDATE_USER', payload: response })
        updateUser(response)
      }
    } catch (error) {
      console.error('Failed to update user', error)
    }
  }

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

  const handleRoleChange = useCallback(async (userId, newRole) => {
    try {
      const updatedUser = await updateRole(userId, { name: newRole })
      dispatch({ type: 'UPDATE_USER', payload: updatedUser })
      toast.success(
        `Rol actualizado con éxito para el usuario ${updatedUser.name}`
      )
    } catch (error) {
      console.error('Failed to update user role', error)
      toast.error('Error al actualizar el rol del usuario')
    }
  }, [])

  const handleGetRole = useCallback(async () => {
    try {
      const data = await getRole()
      if (data) {
        dispatch({ type: 'GET_ROLE', payload: data })
      } else {
        throw new Error('Failed to fetch role data')
      }
    } catch (error) {
      console.error('Failed to fetch role data', error)
    }
  }, [])

  const handleGetFeatures = useCallback(async () => {
    try {
      const data = await getFeatures()
      if (data) {
        dispatch({ type: 'GET_FEATURE', payload: data })
      } else {
        throw new Error('Failed to fetch features data')
      }
    } catch (error) {
      console.error('Failed to fetch features data', error)
    }
  }, [])

  const handleGetFeatureById = useCallback(async (id) => {
    if (!id) {
      throw new Error('Feature ID is required')
    }
    const data = await getFeatureById(id)
    if (data) {
      dispatch({ type: 'GET_FEATURE_DETAIL', payload: data })
    } else {
      throw new Error('Failed to fetch feature detail')
    }
  }, [])

  const handleCreateFeature = useCallback(async (feature) => {
    if (!feature) {
      throw new Error('Feature is required')
    }
    const data = await createFeature(feature)
    if (data) {
      dispatch({ type: 'ADD_FEATURE', payload: data })
    } else {
      throw new Error('Failed to add feature')
    }
  }, [])

  const handleUpdateFeature = useCallback(async (feature) => {
    if (!feature) {
      throw new Error('Feature is required')
    }
    const data = await updateFeature(feature)
    if (data) {
      dispatch({ type: 'UPDATE_FEATURE', payload: data })
    } else {
      throw new Error('Failed to update feature')
    }
  }, [])

  const handleDeleteFeature = useCallback(async (id) => {
    if (!id) {
      throw new Error('Feature ID is required')
    }
    await deleteFeature(id)
    dispatch({ type: 'DELETE_FEATURE', payload: id })
  }, [])

  const handleGetFeaturesByProduct = useCallback(async (productId) => {
    if (!productId) {
      throw new Error('Product ID is required')
    }
    const data = await getFeaturesByProduct(productId)
    if (data) {
      dispatch({ type: 'GET_FEATURES_BY_PRODUCT', payload: data })
    } else {
      throw new Error('Failed to fetch features by product')
    }
  }, [])

  const handleGetFavs = useCallback(() => {
    const favs = localStorage.getItem('favs')
    if (favs) {
      dispatch({ type: 'GET_FAVS', payload: JSON.parse(favs) })
    }
  }, [])

  const handleAddFav = useCallback((product) => {
    dispatch({ type: 'ADD_FAV', payload: product })
  }, [])

  const handleDelFav = useCallback((product) => {
    dispatch({ type: 'DEL_FAV', payload: product })
  }, [])

  const handleClearFavs = useCallback(() => {
    dispatch({ type: 'CLEAR_FAVS' })
  }, [])

  const toggleTheme = () => {
    dispatch({ type: 'CHANGE_THEME' })
  }

  useEffect(() => {
    handleGetFeatures()
  }, [handleGetFeatures])

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

  useEffect(() => {
    localStorage.setItem('favs', JSON.stringify(state.favs))
  }, [state.favs])

  useEffect(() => {
    localStorage.setItem('theme', state.theme)
  }, [state.theme])

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
    handleRoleChange,
    handleGetRole,
    handleGetFeatures,
    handleGetFeatureById,
    handleCreateFeature,
    handleUpdateFeature,
    handleDeleteFeature,
    handleGetFeaturesByProduct,
    toggleTheme,
    handleGetFavs,
    handleAddFav,
    handleDelFav,
    handleClearFavs,
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

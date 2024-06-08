import { useCallback, useEffect } from 'react'

import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '@/services/userAPI'

export const useRole = (dispatch) => {
  const handleCreateUser = useCallback(
    async (user) => {
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
    },
    [dispatch]
  )

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
  }, [dispatch])

  const handleGetUserById = useCallback(
    async (id) => {
      const user = await getUserById(id)
      dispatch({
        type: 'GET_USER_DETAIL',
        payload: user,
      })
    },
    [dispatch]
  )

  const handleUpdateUser = useCallback(
    async (user) => {
      const updatedUser = await updateUser(user)
      dispatch({
        type: 'UPDATE_USER',
        payload: updatedUser,
      })
    },
    [dispatch]
  )

  const handleDeleteUser = useCallback(
    async (id) => {
      if (!id) {
        throw new Error('User ID is required')
      }
      await deleteUser(id)
      dispatch({
        type: 'DELETE_USER',
        payload: id,
      })
    },
    [dispatch]
  )

  useEffect(() => {
    handleGetUsers()
  }, [handleGetUsers])

  return {
    handleCreateUser,
    handleGetUsers,
    handleGetUserById,
    handleUpdateUser,
    handleDeleteUser,
  }
}

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/context/auth.context'
import { routes } from '@/routes/routes'

const AuthGuard = ({ children }) => {
  const { isAuthenticated } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home)
    }
  }, [isAuthenticated, navigate])

  return children
}

export default AuthGuard

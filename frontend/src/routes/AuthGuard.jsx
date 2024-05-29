import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/context/auth.context'
import { routes } from '@/routes/routes'

// AuthGuard para usuarios autenticados
const AuthGuard = ({ children }) => {
  const { isAuthenticated } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(routes.login) // redirige a la página de inicio de sesión si el usuario no está autenticado
    }
  }, [isAuthenticated, navigate])

  return children
}

export default AuthGuard
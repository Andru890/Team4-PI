import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/context/auth.context'
import { routes } from '@/routes/routes'

// AuthGuard para usuarios no autenticados
const NoAuthGuard = ({ children }) => {
  const { isAuthenticated } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home) // redirige a la página de inicio si el usuario está autenticado
    }
  }, [isAuthenticated, navigate])

  return children
}

export default NoAuthGuard

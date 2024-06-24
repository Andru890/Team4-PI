import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '@/context/auth.context'
import { routes } from '@/routes/routes'

const PrivateRoute = ({ children }) => {
  const { user } = useAuthContext()
  const token = sessionStorage.getItem('token')

  if (!user || !token) {
    return <Navigate to={routes.login} />
  }
  return children ? children : <Outlet />
}

const AdminGuard = ({ children }) => {
  const { user } = useAuthContext()
  const token = sessionStorage.getItem('token')

  if (
    !user ||
    !token ||
    !user.roles ||
    !Array.isArray(user.roles) ||
    user.roles.length === 0 ||
    user.roles[0] !== 'admin'
  ) {
    return <Navigate to={routes.home} />
  }
  return children ? children : <Outlet />
}

const LogginGuard = ({ children }) => {
  const { user } = useAuthContext()
  const token = sessionStorage.getItem('token')

  if (!user || !token) {
    return <Navigate to={routes.home} />
  }
  return children ? children : <Outlet />
}

export { PrivateRoute, AdminGuard, LogginGuard }

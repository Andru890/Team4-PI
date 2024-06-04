import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '@/context/auth.context'
import { routes } from '@/routes/routes'

const PrivateRoute = ({ children }) => {
  const { user } = useAuthContext()
  if (!user) {
    return <Navigate to={routes.login} />
  }
  return children ? children : <Outlet />
}

const AdminGuard = ({ children }) => {
  const { user } = useAuthContext()
  if (!user || user.role.name !== 'admin') {
    return <Navigate to={routes.home} />
  }
  return children ? children : <Outlet />
}

export { PrivateRoute, AdminGuard }

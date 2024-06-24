import { Link, useLocation } from 'react-router-dom'
import { useGlobalContext } from '@/context/global.context'
import { Badge } from '@/components/ui/badge'
import {
  HomeIcon,
  ShoppingCartIcon,
  PackageIcon,
  UsersIcon,
  FolderIcon,
  SlidersVerticalIcon,
} from '@/components/Icons'
import { routes } from '@/routes/routes'

const AdminSidebar = () => {
  const location = useLocation()
  const { state } = useGlobalContext()
  const orderCount = state.reservations.length

  const isActive = (path) => {
    return location.pathname.startsWith(path.replace(/\/$/, ''))
  }

  return (
    <div className='hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40'>
      <div className='flex h-full max-h-screen flex-col gap-2'>
        <div className='flex h-[60px] items-center border-b px-6'>
          <Link className='flex items-center gap-2 font-semibold' to='/'>
            <img
              src='/logoimg.png'
              alt='logotipo de la empresa que representa la imagen'
              height={100}
              width={60}
            />
            <img
              src='/isotipo.png'
              alt='isotipo de la empresa que representa el nombre'
              height={100}
              width={100}
            />
          </Link>
        </div>
        <div className='flex-1 overflow-auto py-2'>
          <nav className='grid items-start px-4 text-sm font-medium'>
            <Link
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                isActive(routes.dashboard)
                  ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50'
                  : ''
              }`}
              to={routes.dashboard}
            >
              <HomeIcon className='h-4 w-4' />
              Inicio
            </Link>
            <Link
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                isActive(routes.dashboardorders)
                  ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50'
                  : ''
              }`}
              to={routes.dashboardorders}
            >
              <ShoppingCartIcon className='h-4 w-4' />
              Ordenes
              <Badge className='ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full'>
                {orderCount}
              </Badge>
            </Link>
            <Link
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                isActive(routes.dashboardusers)
                  ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50'
                  : ''
              }`}
              to={routes.dashboardusers}
            >
              <UsersIcon className='h-4 w-4' />
              Usuarios
            </Link>
            <Link
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                isActive(routes.dashboardproducts)
                  ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50'
                  : ''
              }`}
              to={routes.dashboardproducts}
            >
              <PackageIcon className='h-4 w-4' />
              Lista de Productos
            </Link>
            <Link
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                isActive(routes.dashboardcategories)
                  ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50'
                  : ''
              }`}
              to={routes.dashboardcategories}
            >
              <FolderIcon className='h-4 w-4' />
              Categorías
            </Link>
            <Link
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
                isActive(routes.dashboardfeatures)
                  ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50'
                  : ''
              }`}
              to={routes.dashboardfeatures}
            >
              <SlidersVerticalIcon className='h-4 w-4' />
              Características
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default AdminSidebar

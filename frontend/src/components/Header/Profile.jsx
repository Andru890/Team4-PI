import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar'
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenu,
} from '@/components/ui/dropdown-menu'
import { useGlobalContext } from '@/context/global.context'
import { routes } from '@/routes/routes'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import { useState } from 'react'

const Profile = () => {
  const { state, logout } = useGlobalContext()
  const user = state.user
  const navigate = useNavigate()
  const [dialogOpen, setDialogOpen] = useState(false)

  const getInitials = (name, lastname) => {
    if (!name || !lastname) return 'NA'
    return `${name.charAt(0)}${lastname.charAt(0)}`.toUpperCase()
  }

  const handleLogout = () => {
    logout()
    window.location.reload()
    navigate(routes.home)
  }

  const isAdmin = user?.role.name === 'admin'

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className='h-9 w-9'>
            <AvatarImage alt={`@${user?.name}`} src='/placeholder-avatar.jpg' />
            <AvatarFallback>
              {getInitials(user?.name, user?.lastname)}
            </AvatarFallback>
            <span className='sr-only'>Toggle user menu</span>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => setDialogOpen(true)}
          >
            Mi Perfil
          </DropdownMenuItem>
          {isAdmin && (
            <>
              <DropdownMenuSeparator />
              <Link to={routes.dashboard}>
                <DropdownMenuItem className='cursor-pointer'>
                  Panel Administración
                </DropdownMenuItem>
              </Link>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem className='cursor-pointer' onClick={handleLogout}>
            Salir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className='mx-auto max-w-md rounded-xl bg-white shadow-lg dark:bg-gray-800'>
          <div className='relative h-40 overflow-hidden rounded-t-xl'>
            <img
              src='/logo.png'
              alt='Background'
              className='h-full w-full object-cover object-center'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent' />
          </div>
          <div className='-mt-16 flex flex-col items-center justify-center'>
            <Avatar className='h-32 w-32 border-4 border-white dark:border-gray-800'>
              <AvatarImage src={user?.imageUrl} alt='User Avatar' />
              <AvatarFallback>
                {getInitials(user?.name, user?.lastname)}
              </AvatarFallback>
            </Avatar>
            <div className='mt-4 text-center'>
              <h3 className='text-2xl font-bold'>{user?.name}</h3>
              <p className='text-gray-500 dark:text-gray-400 text-lg'>
                {user?.email}
              </p>
              <div className='my-4 border-b border-gray-300 dark:border-gray-700'></div>
              <div className='grid grid-cols-2 gap-4 text-left'>
                <div>
                  <p className='text-gray-500 dark:text-gray-400 font-medium'>
                    Telefono
                  </p>
                  <p className='text-gray-700 dark:text-gray-300'>
                    {user?.phone || 'No disponible'}
                  </p>
                </div>
                <div>
                  <p className='text-gray-500 dark:text-gray-400 font-medium'>
                    Localización
                  </p>
                  <p className='text-gray-700 dark:text-gray-300'>
                    {user?.city || 'No disponible'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Profile

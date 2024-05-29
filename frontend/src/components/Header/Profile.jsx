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

const Profile = () => {
  const { state, logout } = useGlobalContext()
  const user = state.user
  const navigate = useNavigate()

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
  console.log('isAdmin', isAdmin)

  return (
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
        <DropdownMenuItem>Cuenta</DropdownMenuItem>
        <DropdownMenuItem>Preferencias</DropdownMenuItem>
        {isAdmin && (
          <>
            <DropdownMenuSeparator />
            <Link to={routes.dashboard}>
              <DropdownMenuItem>Dashboard</DropdownMenuItem>
            </Link>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Salir</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Profile

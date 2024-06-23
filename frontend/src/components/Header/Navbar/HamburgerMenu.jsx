import { useState } from 'react'
import { SheetTrigger, SheetContent, Sheet } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { routes } from '@/routes/routes'
import { MenuIcon } from '@/components/Icons'
import Profile from '@/components/Header/Profile'
import { useAuthContext } from '@/context/auth.context'

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const closeMenu = () => setIsOpen(false)

  const { user } = useAuthContext()
  const token = sessionStorage.getItem('token')
  const isAuthenticated = user && token

  return (
    <Sheet isOpen={isOpen} onClose={closeMenu}>
      <SheetTrigger asChild>
        <Button
          onClick={() => setIsOpen(true)}
          className='ml-auto lg:hidden hide-on-small'
          size='icon'
          variant='outline'
        >
          <MenuIcon className='h-6 w-6' />
          <span className='sr-only'>Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='right'>
        <div className='grid gap-4 py-6'>
          <Link
            onClick={closeMenu}
            className='flex items-center gap-2 text-lg font-medium hover:underline'
            to={routes.home}
          >
            Inicio
          </Link>
          <Link
            onClick={closeMenu}
            className='flex items-center gap-2 text-lg font-medium hover:underline'
            to={routes.categories}
          >
            Categorias
          </Link>
          <Link
            className='flex items-center gap-2 text-lg font-medium hover:underline'
            to={routes.services}
          >
            Servicios
          </Link>
          <Link
            className='flex items-center gap-2 text-lg font-medium hover:underline'
            to={routes.contact}
          >
            Contacto
          </Link>
          {isAuthenticated ? (
            <Profile />
          ) : (
            <div className='flex items-center gap-4 mt-4'>
              <Link to={routes.login}>
                <Button variant='outline'>Iniciar sesión</Button>
              </Link>
              <Link to={routes.register}>
                <Button>Registrarse</Button>
              </Link>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default HamburgerMenu

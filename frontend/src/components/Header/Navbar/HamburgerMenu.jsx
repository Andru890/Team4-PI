import { SheetTrigger, SheetContent, Sheet } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { routes } from '@/routes/routes'
import { MenuIcon } from '@/components/Icons'
const HamburgerMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className='ml-auto lg:hidden' size='icon' variant='outline'>
          <MenuIcon className='h-6 w-6' />
          <span className='sr-only'>Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='right'>
        <div className='grid gap-4 py-6'>
          <Link
            className='flex items-center gap-2 text-lg font-medium hover:underline'
            to={routes.home}
          >
            Inicio
          </Link>
          <Link
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
          <div className='flex items-center gap-4 mt-4'>
            <Link to={routes.login}>
              <Button variant='outline'>Iniciar sesión</Button>
            </Link>
            <Link to={routes.register}>
              <Button>Registrarse</Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
export default HamburgerMenu

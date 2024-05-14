import { SheetTrigger, SheetContent, Sheet } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
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
            href='#'
          >
            Inicio
          </Link>
          <Link
            className='flex items-center gap-2 text-lg font-medium hover:underline'
            href='#'
          >
            Acerca de
          </Link>
          <Link
            className='flex items-center gap-2 text-lg font-medium hover:underline'
            href='#'
          >
            Servicios
          </Link>
          <Link
            className='flex items-center gap-2 text-lg font-medium hover:underline'
            href='#'
          >
            Contacto
          </Link>
          <div className='flex items-center gap-4 mt-4'>
            <Button variant='outline'>Iniciar sesión</Button>
            <Button>Registrarse</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
export default HamburgerMenu

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <line x1='4' x2='20' y1='12' y2='12' />
      <line x1='4' x2='20' y1='6' y2='6' />
      <line x1='4' x2='20' y1='18' y2='18' />
    </svg>
  )
}

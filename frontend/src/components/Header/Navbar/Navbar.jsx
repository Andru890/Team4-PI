import { Link } from 'react-router-dom'
import { routes } from '@/routes/routes'
import {
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenu,
} from '@/components/ui/navigation-menu'

const Navbar = () => {
  return (
    <nav className='hidden md:flex items-center gap-6'>
      <Link
        className='text-primary hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gray-900 dark:after:bg-gray-100 after:transition-all after:duration-300 hover:after:w-full'
        to={routes.home}
      >
        Inicio
      </Link>

      <NavigationMenu className='text-primary hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gray-900 dark:after:bg-gray-100 after:transition-all after:duration-300 hover:after:w-full'>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className='bg-white'>
              Categorías
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className='grid w-[400px] p-2'>
                <NavigationMenuLink asChild>
                  <Link
                    className='group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50'
                    href='#'
                  >
                    <div className='text-sm font-medium leading-none group-hover:underline'>
                      Camaras
                    </div>
                    <div className='line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400'>
                      Camaras de fotos y video.
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link
                    className='group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50'
                    href='#'
                  >
                    <div className='text-sm font-medium leading-none group-hover:underline'>
                      Sonido
                    </div>
                    <div className='line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400'>
                      Equipos de sonido.
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link
                    className='group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50'
                    href='#'
                  >
                    <div className='text-sm font-medium leading-none group-hover:underline'>
                      Luces
                    </div>
                    <div className='line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400'>
                      Luces para eventos.
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link
                    className='group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50'
                    href='#'
                  >
                    <div className='text-sm font-medium leading-none group-hover:underline'>
                      Accesorios
                    </div>
                    <div className='line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400'>
                      Accesorios para eventos.
                    </div>
                  </Link>
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <Link
        className='text-primary hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gray-900 dark:after:bg-gray-100 after:transition-all after:duration-300 hover:after:w-full'
        to={routes.services}
      >
        Servicios
      </Link>
      <Link
        className='text-primary hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gray-900 dark:after:bg-gray-100 after:transition-all after:duration-300 hover:after:w-full'
        to={routes.contact}
      >
        Contacto
      </Link>
    </nav>
  )
}

export default Navbar

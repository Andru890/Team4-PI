import { Link } from 'react-router-dom'
import { useGlobalContext } from '@/context/global.context'
import { routes } from '@/routes/routes'
import './Navbar.css'
import {
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenu,
} from '@/components/ui/navigation-menu'

const Navbar = () => {
  const { state } = useGlobalContext()
  const { dataCategory: categories } = state

  return (
    <nav className='hidden md:flex items-center gap-6'>
      <Link
        className='text-primary px-4 py-2 hover:text-accent-foreground dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gray-900 dark:after:bg-gray-100 after:transition-all after:duration-300 hover:after:w-full rounded-md hover:bg-accent focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50'
        to={routes.home}
      >
        Inicio
      </Link>

      <NavigationMenu
        className='text-primary dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gray-900 dark:after:bg-gray-100 after:transition-all after:duration-300 hover:after:w-full
      '
      >
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className='bg-white'>
              Categorías
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className='grid w-[400px] p-2'>
                {categories.map((category) => (
                  <NavigationMenuLink asChild key={category.id}>
                    <Link
                      className='group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50'
                      to={`${routes.category}/${category.id}`}
                    >
                      <div className='text-sm font-medium leading-none group-hover:underline'>
                        {category.name}
                      </div>
                      <div className='line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400'>
                        {category.description}
                      </div>
                    </Link>
                  </NavigationMenuLink>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <Link
        className='text-primary px-4 py-2 hover:text-accent-foreground dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gray-900 dark:after:bg-gray-100 after:transition-all after:duration-300 hover:after:w-full rounded-md hover:bg-accent focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50'
        to={routes.services}
      >
        Servicios
      </Link>
      <Link
        className='text-primary px-4 py-2 hover:text-accent-foreground dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gray-900 dark:after:bg-gray-100 after:transition-all after:duration-300 hover:after:w-full rounded-md hover:bg-accent focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50'
        to={routes.contact}
      >
        Contacto
      </Link>
    </nav>
  )
}

export default Navbar

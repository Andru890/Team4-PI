import { Link } from 'react-router-dom'
import { useGlobalContext } from '@/context/global.context'
import { routes } from '@/routes/routes'
import {
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenu,
} from '@/components/ui/navigation-menu'

const Navbar = ({ isHome, isScrolled }) => {
  const { state } = useGlobalContext()
  const { dataCategory: categories } = state

  const shouldHide = isHome && !isScrolled

  return (
    <nav
      className={`hidden md:flex items-center gap-6 transition-opacity duration-300 ${shouldHide ? 'opacity-0' : 'opacity-100'}`}
    >
      <Link
        className={`transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:transition-all after:duration-300 hover:after:w-full ${
          isScrolled ? 'text-black after:bg-black' : 'text-white after:bg-white'
        }`}
        to={routes.home}
      >
        Inicio
      </Link>

      <NavigationMenu
        className={`transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:transition-all after:duration-300 hover:after:w-full ${
          isScrolled ? 'bg-transparent' : 'bg-white'
        }`}
      >
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Categorías</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className='grid w-[400px] p-2'>
                {categories.map((category) => (
                  <NavigationMenuLink asChild key={category.id}>
                    <Link
                      className='group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-transparent p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50'
                      to={`${routes.category}/${category.id}`}
                    >
                      <div className='text-sm font-medium leading-none group-hover:underline'>
                        {category.name}
                      </div>
                      <div className='line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400'>
                        {category.description || 'Sin descripción'}
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
        className={`transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:transition-all after:duration-300 hover:after:w-full ${
          isScrolled ? 'text-black after:bg-black' : 'text-white after:bg-white'
        }`}
        to={routes.contact}
      >
        Contacto
      </Link>
    </nav>
  )
}

export default Navbar

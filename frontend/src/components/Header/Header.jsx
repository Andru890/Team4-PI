import { Button } from '@/components/ui/button'
import Navbar from '@/components/Header/Navbar/Navbar'
import HamburgerMenu from '@/components/Header/Navbar/HamburgerMenu'
import { CameraLogo } from '@/components/Icons'
import { Link } from 'react-router-dom'
import { routes } from '@/routes/routes'
import Profile from '@/components/Header/Profile'
import { useGlobalContext } from '@/context/global.context'

const Header = () => {
  const { state } = useGlobalContext()
  const isAuthenticated = state.isAuthenticated

  return (
    <header className='fixed top-0 left-0 z-50 flex h-20 w-full shrink-0 items-center px-4 md:px-6 bg-white'>
      <Link to='/'>
        <div className='flex items-center gap-2'>
          <CameraLogo className='h-6 w-6' />
          <span className='text-lg text-primary font-semibold'>
            VisualStudio Service
          </span>
        </div>
      </Link>
      <HamburgerMenu />
      <div className='ml-auto hidden lg:flex items-center gap-4'>
        <Navbar />
        <div className='flex items-center gap-2 cursor-pointer'>
          {isAuthenticated ? (
            <Profile />
          ) : (
            <>
              <Link to={routes.login}>
                <Button variant='outline'>Iniciar sesión</Button>
              </Link>
              <Link to={routes.register}>
                <Button>Registrarse</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header

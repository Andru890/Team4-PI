import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/Header/Navbar/Navbar'
import HamburgerMenu from '@/components/Header/Navbar/HamburgerMenu'
import MobileNavigationBar from '@/components/Header/Navbar/MobileNavigationBar'
import { Link, useLocation } from 'react-router-dom'
import { routes } from '@/routes/routes'
import Profile from '@/components/Header/Profile'
import { useAuthContext } from '@/context/auth.context'

const Header = () => {
  const { user } = useAuthContext()
  const token = sessionStorage.getItem('token')
  const isAuthenticated = user && token

  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  const isHome = location.pathname === routes.home

  useEffect(() => {
    const handleScroll = () => {
      if (isHome) {
        setIsScrolled(window.scrollY > 20)
      }
    }

    if (isHome) {
      window.addEventListener('scroll', handleScroll)
    } else {
      setIsScrolled(false)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isHome])

  const logoImgSrc = isHome && !isScrolled ? '/logoimg2.png' : '/logoimg.png'
  const isotipoImgSrc = isHome && !isScrolled ? '/isotipo2.png' : '/isotipo.png'

  return (
    <header
      className={`fixed top-0 left-0 z-50 flex h-20 w-full shrink-0 items-center px-4 md:px-6 transition-colors duration-300 ${
        isScrolled || !isHome
          ? 'bg-white shadow-lg dark:bg-gray-800'
          : 'bg-transparent dark:bg-transparent'
      }`}
    >
      <Link to='/'>
        <div className='flex items-center gap-2'>
          <img
            src={logoImgSrc}
            alt='logotipo de la empresa que representa la imagen'
            height={100}
            width={70}
          />
          <img
            src={isotipoImgSrc}
            alt='isotipo de la empresa que representa el nombre'
            height={100}
            width={120}
          />
        </div>
      </Link>
      <HamburgerMenu />
      <MobileNavigationBar />
      <div className='ml-auto hidden lg:flex items-center gap-4'>
        <Navbar isHome={isHome} isScrolled={isScrolled} />
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

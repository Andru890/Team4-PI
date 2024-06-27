import { Link } from 'react-router-dom'
import { HomeIcon, FolderIcon, MailIcon, UserIcon } from '@/components/Icons'
import { routes } from '@/routes/routes'

const MobileNavigationBar = () => {
  return (
    <nav className='fixed bottom-0 left-0 right-0 bg-background shadow-lg border-t border-border z-50 hide-on-large'>
      <div className='container flex justify-around items-center h-14 px-4'>
        <Link
          to={routes.home}
          className='flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition'
        >
          <HomeIcon className='w-6 h-6' />
          <span className='text-xs font-medium'>Inicio</span>
        </Link>
        <Link
          href='#'
          className='flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition'
        >
          <FolderIcon className='w-6 h-6' />
          <span className='text-xs font-medium'>Categorías</span>
        </Link>
        <Link
          to={routes.contact}
          className='flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition'
        >
          <MailIcon className='w-6 h-6' />
          <span className='text-xs font-medium'>Contacto</span>
        </Link>
        <Link
          href='#'
          className='flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition'
        >
          <UserIcon className='w-6 h-6' />
          <span className='text-xs font-medium'>Perfil</span>
        </Link>
      </div>
    </nav>
  )
}

export default MobileNavigationBar

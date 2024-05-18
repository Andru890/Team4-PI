import { Link } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Package2Icon, SearchIcon } from '@/components/Icons'

const Header = () => {
  return (
    <header className='flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-200 px-6 dark:bg-gray-800/40'>
      <Link className='lg:hidden' href='#'>
        <Package2Icon className='h-6 w-6' />
        <span className='sr-only'>Inicio</span>
      </Link>
      <div className='w-full flex-1'>
        <form>
          <div className='relative'>
            <SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400' />
            <Input
              className='w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950'
              placeholder='Buscar productos...'
              type='search'
            />
          </div>
        </form>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className='rounded-full border border-black w-8 h-8 dark:border-gray-800'
            size='icon'
            variant='ghost'
          >
            <img
              alt='Avatar'
              className='rounded-full'
              height='32'
              src='/placeholder.svg'
              style={{
                aspectRatio: '32/32',
                objectFit: 'cover',
              }}
              width='32'
            />
            <span className='sr-only'>Menu usuario</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Preferencias</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Salir</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

export default Header

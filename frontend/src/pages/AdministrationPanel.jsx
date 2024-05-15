import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from '@/components/ui/dropdown-menu'
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from '@/components/ui/table'
import {
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogContent,
  Dialog,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { CardContent } from '@/components/ui/card'
import {
  Package2Icon,
  BellIcon,
  HomeIcon,
  ShoppingCartIcon,
  PackageIcon,
  CameraIcon,
  UsersIcon,
  LineChartIcon,
  SearchIcon,
  DeleteIcon,
  TrashIcon,
} from '@/components/Icons'
import AdminMobileFallback from '@/components/AdminPanel/AdminMobileFallback'

const AdministrationPanel = () => {
  return (
    <div key='1' className='grid min-h-screen w-full lg:grid-cols-[280px_1fr]'>
      <div className='hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40'>
        <div className='flex h-full max-h-screen flex-col gap-2'>
          <div className='flex h-[60px] items-center border-b px-6'>
            <Link className='flex items-center gap-2 font-semibold' href='#'>
              <CameraIcon className='h-6 w-6' />
              <span className=''>VisualStudio Service</span>
            </Link>
            <Button className='ml-auto h-8 w-8' size='icon' variant='outline'>
              <BellIcon className='h-4 w-4' />
              <span className='sr-only'>Toggle notifications</span>
            </Button>
          </div>
          <div className='flex-1 overflow-auto py-2'>
            <nav className='grid items-start px-4 text-sm font-medium'>
              <Link
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
                href='#'
              >
                <HomeIcon className='h-4 w-4' />
                Inicio
              </Link>
              <Link
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
                href='#'
              >
                <ShoppingCartIcon className='h-4 w-4' />
                Ordenes
                <Badge className='ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full'>
                  6
                </Badge>
              </Link>
              <Link
                className='flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50'
                href='#'
              >
                <PackageIcon className='h-4 w-4' />
                Lista de Productos
              </Link>
              <Link
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
                href='#'
              >
                <UsersIcon className='h-4 w-4' />
                Clientes
              </Link>
              <Link
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
                href='#'
              >
                <LineChartIcon className='h-4 w-4' />
                Reportes
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <header className='flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40'>
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
                className='rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800'
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
        <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
          <div className='flex items-center'>
            <h1 className='font-semibold text-lg md:text-2xl'>Productos</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button className='ml-auto' size='sm'>
                  Agregar producto
                </Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[600px]'>
                <DialogHeader>
                  <DialogTitle>Agregar nuevo producto</DialogTitle>
                </DialogHeader>
                <CardContent>
                  <form className='grid gap-4'>
                    <div className='grid gap-2'>
                      <Label htmlFor='name'>Nombre</Label>
                      <Input id='name' placeholder='Nombre del producto' />
                    </div>
                    <div className='grid gap-2'>
                      <Label htmlFor='description'>Descripción</Label>
                      <Textarea
                        id='description'
                        placeholder='Descripción del producto'
                      />
                    </div>
                    <div className='grid gap-2 md:grid-cols-2 md:gap-4'>
                      <div className='grid gap-2'>
                        <Label htmlFor='price'>Precio</Label>
                        <Input
                          id='price'
                          placeholder='Precio del producto'
                          type='number'
                        />
                      </div>
                      <div className='grid gap-2'>
                        <Label htmlFor='stock'>Stock</Label>
                        <Input
                          id='stock'
                          placeholder='Stock del producto'
                          type='number'
                        />
                      </div>
                    </div>
                    <div className='grid gap-2'>
                      <Label htmlFor='image'>Imagen</Label>
                      <Input id='image' type='file' multiple accept='image/*' />
                    </div>
                    <Button className='w-full' type='submit'>
                      Crear Producto
                    </Button>
                  </form>
                </CardContent>
              </DialogContent>
            </Dialog>
          </div>
          <div className='border shadow-sm rounded-lg'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[80px]'>Imagen</TableHead>
                  <TableHead className='max-w-[150px]'>Nombre</TableHead>
                  <TableHead className='hidden md:table-cell'>
                    Descripción
                  </TableHead>
                  <TableHead className='hidden md:table-cell'>Precio</TableHead>
                  <TableHead className='hidden md:table-cell'>Stock</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <img
                      alt='Product image'
                      className='aspect-square rounded-md object-cover'
                      height='64'
                      src='/placeholder.svg'
                      width='64'
                    />
                  </TableCell>
                  <TableCell className='font-medium'>
                    Cámara de Video Profesional
                  </TableCell>
                  <TableCell className='hidden md:table-cell'>
                    Cámara de video de alta definición para grabaciones
                    profesionales.
                  </TableCell>
                  <TableCell className='hidden md:table-cell'>
                    $1200.99
                  </TableCell>
                  <TableCell className='hidden md:table-cell'>
                    50 en stock
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <Button size='icon' variant='outline'>
                        <DeleteIcon className='h-4 w-4' />
                        <span className='sr-only'>Editar</span>
                      </Button>
                      <Button size='icon' variant='outline'>
                        <TrashIcon className='h-4 w-4' />
                        <span className='sr-only'>Eliminar</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <img
                      alt='Product image'
                      className='aspect-square rounded-md object-cover'
                      height='64'
                      src='/placeholder.svg'
                      width='64'
                    />
                  </TableCell>
                  <TableCell className='font-medium'>
                    Micrófono de Estudio
                  </TableCell>
                  <TableCell className='hidden md:table-cell'>
                    Micrófono de estudio de alta calidad para grabaciones de
                    audio nítidas.
                  </TableCell>
                  <TableCell className='hidden md:table-cell'>
                    $300.99
                  </TableCell>
                  <TableCell className='hidden md:table-cell'>
                    200 en stock
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <Button size='icon' variant='outline'>
                        <DeleteIcon className='h-4 w-4' />
                        <span className='sr-only'>Editar</span>
                      </Button>
                      <Button size='icon' variant='outline'>
                        <TrashIcon className='h-4 w-4' />
                        <span className='sr-only'>Eliminar</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <img
                      alt='Product image'
                      className='aspect-square rounded-md object-cover'
                      height='64'
                      src='/placeholder.svg'
                      width='64'
                    />
                  </TableCell>
                  <TableCell className='font-medium'>
                    Iluminación de Estudio
                  </TableCell>
                  <TableCell className='hidden md:table-cell'>
                    Kit de iluminación profesional para mejorar la calidad de
                    tus grabaciones.
                  </TableCell>
                  <TableCell className='hidden md:table-cell'>
                    $500.99
                  </TableCell>
                  <TableCell className='hidden md:table-cell'>
                    100 en stock
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <Button size='icon' variant='outline'>
                        <DeleteIcon className='h-4 w-4' />
                        <span className='sr-only'>Editar</span>
                      </Button>
                      <Button size='icon' variant='outline'>
                        <TrashIcon className='h-4 w-4' />
                        <span className='sr-only'>Eliminar</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
      <AdminMobileFallback />
    </div>
  )
}

export default AdministrationPanel

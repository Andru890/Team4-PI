import { Button } from '@/components/ui/button'
import { DeleteIcon, TrashIcon } from '@/components/Icons'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'

const ProductTable = () => {
  return (
    <div className='border shadow-sm rounded-lg'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[80px]'>ID</TableHead>
            <TableHead className='w-[80px]'>Imagen</TableHead>
            <TableHead className='max-w-[150px]'>Nombre</TableHead>
            <TableHead className='hidden md:table-cell'>Descripción</TableHead>
            <TableHead className='hidden md:table-cell'>Precio</TableHead>
            <TableHead className='hidden md:table-cell'>Stock</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
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
              Cámara de video de alta definición para grabaciones profesionales.
            </TableCell>
            <TableCell className='hidden md:table-cell'>$1200.99</TableCell>
            <TableCell className='hidden md:table-cell'>50 en stock</TableCell>
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
          {/* Otros TableRow aquí */}
        </TableBody>
      </Table>
    </div>
  )
}

export default ProductTable

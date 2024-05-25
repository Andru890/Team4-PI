import Swal from 'sweetalert2'
import { useGlobalContext } from '@/context/global.context'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { TrashIcon, PenIcon } from '@/components/Icons'
import { Button } from '@/components/ui/button'

const AdminCategoriesTable = ({ category, setCategory }) => {
  const { handleDeleteCategory } = useGlobalContext()

  return (
    <div className='border shadow-sm rounded-lg'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Productos</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className='font-medium'>Electrónica</TableCell>
            <TableCell>250</TableCell>
            <TableCell className='flex items-center gap-2'>
              <Button size='icon' variant='ghost'>
                <PenIcon className='h-4 w-4' />
                <span className='sr-only'>Editar</span>
              </Button>
              <Button size='icon' variant='ghost' className='text-red-500'>
                <TrashIcon className='h-4 w-4' />
                <span className='sr-only'>Eliminar</span>
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className='font-medium'>Moda</TableCell>
            <TableCell>180</TableCell>
            <TableCell className='flex items-center gap-2'>
              <Button size='icon' variant='ghost'>
                <PenIcon className='h-4 w-4' />
                <span className='sr-only'>Editar</span>
              </Button>
              <Button size='icon' variant='ghost' className='text-red-500'>
                <TrashIcon className='h-4 w-4' />
                <span className='sr-only'>Eliminar</span>
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className='font-medium'>Hogar</TableCell>
            <TableCell>120</TableCell>
            <TableCell className='flex items-center gap-2'>
              <Button size='icon' variant='ghost'>
                <PenIcon className='h-4 w-4' />
                <span className='sr-only'>Editar</span>
              </Button>
              <Button size='icon' variant='ghost' className='text-red-500'>
                <TrashIcon className='h-4 w-4' />
                <span className='sr-only'>Eliminar</span>
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className='font-medium'>Deportes</TableCell>
            <TableCell>300</TableCell>
            <TableCell className='flex items-center gap-2'>
              <Button size='icon' variant='ghost'>
                <PenIcon className='h-4 w-4' />
                <span className='sr-only'>Editar</span>
              </Button>
              <Button size='icon' variant='ghost' className='text-red-500'>
                <TrashIcon className='h-4 w-4' />
                <span className='sr-only'>Eliminar</span>
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className='font-medium'>Jardín</TableCell>
            <TableCell>150</TableCell>
            <TableCell className='flex items-center gap-2'>
              <Button size='icon' variant='ghost'>
                <PenIcon className='h-4 w-4' />
                <span className='sr-only'>Editar</span>
              </Button>
              <Button size='icon' variant='ghost' className='text-red-500'>
                <TrashIcon className='h-4 w-4' />
                <span className='sr-only'>Eliminar</span>
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default AdminCategoriesTable

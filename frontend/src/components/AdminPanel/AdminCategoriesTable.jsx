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

  const handleDelete = async (categoryId) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo!',
    })

    if (result.isConfirmed) {
      handleDeleteCategory(categoryId)
      setCategory((prev) => prev.filter((cat) => cat.id !== categoryId))
    }
  }

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
          {category.map((category) => (
            <TableRow key={category.id}>
              <TableCell className='font-medium'>{category.name}</TableCell>
              <TableCell>1</TableCell>
              <TableCell className='flex items-center gap-2'>
                <Button size='icon' variant='ghost'>
                  <PenIcon className='h-4 w-4' />
                  <span className='sr-only'>Editar</span>
                </Button>
                <Button
                  size='icon'
                  variant='ghost'
                  className='text-red-500'
                  onClick={() => handleDelete(category.id)}
                >
                  <TrashIcon className='h-4 w-4' />
                  <span className='sr-only'>Eliminar</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default AdminCategoriesTable

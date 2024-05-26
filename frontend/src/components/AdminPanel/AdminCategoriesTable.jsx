import Swal from 'sweetalert2'
import { toast } from 'sonner'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { TrashIcon } from '@/components/Icons'
import { Button } from '@/components/ui/button'

const AdminCategoriesTable = ({ products, category, handleDeleteCategory }) => {
  const handleDelete = async (categoryId) => {
    const hasProducts = products.some(
      (product) => product.category.id === categoryId
    )

    if (hasProducts) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No puedes eliminar una categoría con productos asociados',
      })
      return
    }

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
      toast('Categoría eliminada con éxito', 'success')
    }
  }

  return (
    <div className='border shadow-sm rounded-lg'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Productos</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {category.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell className='font-medium'>{category.name}</TableCell>
              <TableCell>
                {
                  products.filter(
                    (product) =>
                      product.category.id === category.id &&
                      product.category.name === category.name
                  ).length
                }
              </TableCell>
              <TableCell className='flex items-center gap-2'>
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

import { Button } from '@/components/ui/button'
import { PenIcon, TrashIcon } from '@/components/Icons'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { toast } from 'sonner'
import Swal from 'sweetalert2'

const ProductTable = ({ products, handleDeleteProduct }) => {
  const onDeleteClick = async (product) => {
    const result = await Swal.fire({
      title: `¿Estás seguro de que deseas eliminar el producto "${product.name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    })

    if (result.isConfirmed) {
      const stockResult = await Swal.fire({
        title: `El producto "${product.name}" tiene un stock de ${product.stock} unidades.`,
        input: 'number',
        inputPlaceholder: 'Ingresa la cantidad a eliminar',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
          if (!value) {
            return 'Por favor, ingresa una cantidad'
          } else if (isNaN(value)) {
            return 'Por favor, ingresa un número válido'
          } else if (value > product.stock) {
            return `La cantidad no puede ser mayor que el stock (${product.stock})`
          }
        },
      })

      if (stockResult.isConfirmed) {
        handleDeleteProduct(product.id, stockResult.value)
        toast(
          `Se han eliminado x unidades del producto "${product.name}". Stock restante: ${product.sto}.`
        )
      }
    }
  }

  return (
    <div className='border shadow-sm rounded-lg'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[30px]'>ID</TableHead>
            <TableHead className='w-[80px]'>Imagen</TableHead>
            <TableHead className='max-w-[150px]'>Nombre</TableHead>
            <TableHead className='hidden md:table-cell'>Descripción</TableHead>
            <TableHead className='hidden md:table-cell w-[100px]'>
              Categoria
            </TableHead>
            <TableHead className='hidden md:table-cell'>
              Características
            </TableHead>
            <TableHead className='hidden md:table-cell'>Precio</TableHead>
            <TableHead className='hidden md:table-cell'>Stock</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className='w-[30px]'>{product.id}</TableCell>
              <TableCell>
                <img
                  alt='Product image'
                  className='aspect-square rounded-md object-cover'
                  height='64'
                  src={product.image}
                  width='64'
                />
              </TableCell>
              <TableCell className='font-medium'>{product.name}</TableCell>
              <TableCell className='hidden md:table-cell w-[400px]'>
                {product.description}
              </TableCell>
              <TableCell className='hidden md:table-cell'>
                {product.category.name}
              </TableCell>
              <TableCell className='hidden md:table-cell'>
                <ul className='list-disc pl-4 text-sm'>
                  {product.characteristic &&
                    product.characteristic
                      .split(',')
                      .map((char, index) => <li key={index}>{char.trim()}</li>)}
                </ul>
              </TableCell>
              <TableCell className='hidden md:table-cell w-[120px]'>
                ${product.price}
              </TableCell>
              <TableCell className='hidden md:table-cell'>
                {product.stock} en stock
              </TableCell>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <Button size='icon' variant='ghost'>
                    <PenIcon className='h-4 w-4' />
                    <span className='sr-only'>Editar</span>
                  </Button>
                  <Button
                    className='text-red-500'
                    size='icon'
                    variant='ghost'
                    onClick={() => onDeleteClick(product)}
                    disabled={product.stock === 0}
                  >
                    <TrashIcon className='h-4 w-4' />
                    <span className='sr-only'>Eliminar</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ProductTable
import { TableRow, TableCell } from '@/components/ui/table'
import { Button } from '@/components/ui'
import { DeleteIcon, TrashIcon } from '@/components/Icons'

const ProductRow = ({ product }) => {
  return (
    <TableRow>
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
      <TableCell className='hidden md:table-cell'>
        {product.description}
      </TableCell>
      <TableCell className='hidden md:table-cell'>{product.price}</TableCell>
      <TableCell className='hidden md:table-cell'>{product.stock}</TableCell>
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
  )
}

export default ProductRow

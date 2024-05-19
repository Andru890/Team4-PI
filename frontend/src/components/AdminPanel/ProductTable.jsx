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
import { deleteProduct } from '@/components/AdminPanel/Actions'

const ProductTable = ({ products }) => {
  return (
    <div className='border shadow-sm rounded-lg'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[80px]'>ID</TableHead>
            <TableHead className='w-[80px]'>Imagen</TableHead>
            <TableHead className='max-w-[150px]'>Nombre</TableHead>
            <TableHead className='hidden md:table-cell'>Descripción</TableHead>
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
              <TableCell>{product.id}</TableCell>
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
              <TableCell className='hidden md:table-cell'>
                <ul className='list-disc pl-4 text-sm'>
                  {product.characteristic &&
                    product.characteristic
                      .split(',')
                      .map((char, index) => <li key={index}>{char.trim()}</li>)}
                </ul>
              </TableCell>
              <TableCell className='hidden md:table-cell'>
                ${product.price}
              </TableCell>
              <TableCell className='hidden md:table-cell'>
                {product.stock} en stock
              </TableCell>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <Button size='icon' variant='outline'>
                    <DeleteIcon className='h-4 w-4' />
                    <span className='sr-only'>Editar</span>
                  </Button>
                  <Button
                    size='icon'
                    variant='outline'
                    onClick={() => deleteProduct(product, products)}
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

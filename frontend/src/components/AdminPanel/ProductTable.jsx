import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead,
} from '@/components/ui'
import ProductRow from '@/components/ADminPanel/ProductRow'

const ProductTable = ({ products }) => {
  return (
    <div className='border shadow-sm rounded-lg'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[80px]'>Imagen</TableHead>
            <TableHead className='max-w-[150px]'>Nombre</TableHead>
            <TableHead className='hidden md:table-cell'>Descripción</TableHead>
            <TableHead className='hidden md:table-cell'>Precio</TableHead>
            <TableHead className='hidden md:table-cell'>Stock</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ProductTable

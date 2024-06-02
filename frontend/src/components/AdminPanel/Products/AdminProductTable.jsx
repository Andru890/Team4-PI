import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import {
  PenIcon,
  TrashIcon,
  SearchIcon,
  ArrowUpDownIcon,
  FilterIcon,
} from '@/components/Icons'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu'
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
import EditProductDialog from '@/components/AdminPanel/Products/EditProductDialog'
import AddProductDialog from '@/components/AdminPanel/Products/AddProductDialog'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

const ProductTable = ({
  products,
  categories,
  handleDeleteProduct,
  handleUpdateProduct,
  handleUpdateProductCategory,
}) => {
  const [editingProduct, setEditingProduct] = useState(null)
  const [selectedCategories, setSelectedCategories] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = product.categories[0]?.id || ''
      return acc
    }, {})
  )
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState({ key: 'id', order: 'asc' })
  const [filters, setFilters] = useState({
    categories: [],
  })

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const searchValue = search.toLowerCase()
        return (
          product.id.toString().toLowerCase().includes(searchValue) ||
          product.name.toLowerCase().includes(searchValue) ||
          product.description.toLowerCase().includes(searchValue) ||
          product.price.toString().includes(searchValue) ||
          product.stock.toString().includes(searchValue)
        )
      })
      .filter((product) => {
        if (
          filters.categories.length > 0 &&
          !filters.categories.includes(product.categories[0]?.id)
        ) {
          return false
        }
        return true
      })
      .sort((a, b) => {
        if (sort.order === 'asc') {
          return a[sort.key] > b[sort.key] ? 1 : -1
        } else {
          return a[sort.key] < b[sort.key] ? 1 : -1
        }
      })
  }, [products, search, sort, filters])

  const handleSort = (key) => {
    if (sort.key === key) {
      setSort({ key, order: sort.order === 'asc' ? 'desc' : 'asc' })
    } else {
      setSort({ key, order: 'asc' })
    }
  }

  const handleFilterChange = (value) => {
    setFilters({
      ...filters,
      categories: filters.categories.includes(value)
        ? filters.categories.filter((item) => item !== value)
        : [...filters.categories, value],
    })
  }

  const onEditClick = (product) => {
    setEditingProduct(product)
  }

  const handleCategoryChange = async (productId, newCategoryId) => {
    await handleUpdateProductCategory(productId, newCategoryId)
    setSelectedCategories((prev) => ({
      ...prev,
      [productId]: newCategoryId,
    }))
    toast.success(`Se ha actualizado la categoría del producto con éxito`)
  }

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
        toast.success(
          `Se han eliminado ${stockResult.value} unidades del producto "${product.name}". Stock restante: ${product.stock - stockResult.value}.`
        )
      }
    }
  }

  return (
    <main className='flex flex-col gap-4 p-4 md:p-6'>
      <div className='flex items-center gap-4'>
        <div className='relative w-full'>
          <Input
            placeholder='Buscar Productos...'
            className='bg-white dark:bg-gray-950 pl-8'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400' />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='shrink-0'>
              <ArrowUpDownIcon className='w-4 h-4 mr-2' />
              Ordenar por
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-[200px]' align='end'>
            <DropdownMenuRadioGroup value={sort.key} onValueChange={handleSort}>
              <DropdownMenuRadioItem value='id'>ID</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='name'>Nombre</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='description'>
                Descripción
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='price'>
                Precio
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='stock'>Stock</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='shrink-0'>
              <FilterIcon className='w-4 h-4 mr-2' />
              Filtros
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-[200px]' align='end'>
            <div className='grid gap-2'>
              {categories.map((category) => (
                <Label
                  key={category.id}
                  className='flex items-center gap-2 font-normal'
                >
                  <Checkbox
                    checked={filters.categories.includes(category.id)}
                    onCheckedChange={() => handleFilterChange(category.id)}
                  />
                  {category.name}
                </Label>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <AddProductDialog />
      </div>
      <div className='overflow-hidden rounded-lg border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[30px]' onClick={() => handleSort('id')}>
                ID
                {sort.key === 'id' && (
                  <span>{sort.order === 'asc' ? '\u2191' : '\u2193'}</span>
                )}
              </TableHead>
              <TableHead className='w-[80px]'>Imagen</TableHead>
              <TableHead
                className='max-w-[150px]'
                onClick={() => handleSort('name')}
              >
                Nombre
                {sort.key === 'name' && (
                  <span>{sort.order === 'asc' ? '\u2191' : '\u2193'}</span>
                )}
              </TableHead>
              <TableHead
                className='hidden md:table-cell'
                onClick={() => handleSort('description')}
              >
                Descripción
                {sort.key === 'description' && (
                  <span>{sort.order === 'asc' ? '\u2191' : '\u2193'}</span>
                )}
              </TableHead>
              <TableHead className='hidden md:table-cell w-[100px]'>
                Categoria
              </TableHead>
              <TableHead className='hidden md:table-cell'>
                Características
              </TableHead>
              <TableHead
                className='hidden md:table-cell'
                onClick={() => handleSort('price')}
              >
                Precio
                {sort.key === 'price' && (
                  <span>{sort.order === 'asc' ? '\u2191' : '\u2193'}</span>
                )}
              </TableHead>
              <TableHead
                className='hidden md:table-cell'
                onClick={() => handleSort('stock')}
              >
                Stock
                {sort.key === 'stock' && (
                  <span>{sort.order === 'asc' ? '\u2191' : '\u2193'}</span>
                )}
              </TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
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
                  <select
                    className='border rounded-md p-1'
                    onChange={(e) =>
                      handleCategoryChange(product.id, e.target.value)
                    }
                    value={
                      selectedCategories[product.id] ||
                      (product.categories && product.categories.length > 0
                        ? product.categories[0].id
                        : '') ||
                      ''
                    }
                  >
                    <option value='' disabled>
                      {product.category.name}
                    </option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </TableCell>
                <TableCell className='hidden md:table-cell'>
                  <ul className='list-disc pl-4 text-sm'>
                    {product.characteristic &&
                      product.characteristic
                        .split(',')
                        .map((char, index) => (
                          <li key={index}>{char.trim()}</li>
                        ))}
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
                    <Button
                      size='icon'
                      variant='ghost'
                      onClick={() => onEditClick(product)}
                    >
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
      {editingProduct && (
        <EditProductDialog
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          handleUpdateProduct={handleUpdateProduct}
        />
      )}
    </main>
  )
}

export default ProductTable

import { useState, useMemo } from 'react'
import Swal from 'sweetalert2'
import { toast } from 'sonner'
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
import {
  TrashIcon,
  SearchIcon,
  ArrowUpDownIcon,
  FilterIcon,
} from '@/components/Icons'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import AdminCategoriesDialog from '@/components/AdminPanel/Category/AddCategoriesDialog'

const AdminCategoriesTable = ({
  products,
  categories,
  handleDeleteCategory,
}) => {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState({ key: 'id', order: 'asc' })
  const [filters, setFilters] = useState({
    productCount: [],
  })

  const filteredCategories = useMemo(() => {
    return categories
      .filter((category) => {
        const searchValue = search.toLowerCase()
        return (
          category.id.toString().toLowerCase().includes(searchValue) ||
          category.name.toLowerCase().includes(searchValue) ||
          category.description.toLowerCase().includes(searchValue) ||
          products
            .filter((product) => product.category.id === category.id)
            .length.toString()
            .includes(searchValue)
        )
      })
      .filter((category) => {
        const productCount = products.filter(
          (product) => product.category.id === category.id
        ).length
        if (
          filters.productCount.length > 0 &&
          !filters.productCount.includes(productCount)
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
  }, [categories, products, search, sort, filters])

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
      productCount: filters.productCount.includes(value)
        ? filters.productCount.filter((item) => item !== value)
        : [...filters.productCount, value],
    })
  }

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
      title: `¿Estás seguro que deseas eliminar la categoría?`,
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo!',
    })

    if (result.isConfirmed) {
      handleDeleteCategory(categoryId)
      toast.success(`Categoría eliminada con éxito`)
    }
  }

  return (
    <main className='flex flex-col gap-4 p-4 md:p-6'>
      <div className='flex items-center gap-4'>
        <div className='relative w-full'>
          <Input
            placeholder='Buscar categorías...'
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
              {[0, 1, 2, 3].map((count) => (
                <Label
                  key={count}
                  className='flex items-center gap-2 font-normal'
                >
                  <Checkbox
                    checked={filters.productCount.includes(count)}
                    onCheckedChange={() => handleFilterChange(count)}
                  />
                  {count} Productos
                </Label>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <AdminCategoriesDialog />
      </div>
      <div className='overflow-hidden rounded-lg border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className='cursor-pointer'
                onClick={() => handleSort('id')}
              >
                ID
                {sort.key === 'id' && (
                  <span>{sort.order === 'asc' ? '\u2191' : '\u2193'}</span>
                )}
              </TableHead>
              <TableHead>Imagen</TableHead>
              <TableHead
                className='cursor-pointer'
                onClick={() => handleSort('name')}
              >
                Nombre
                {sort.key === 'name' && (
                  <span>{sort.order === 'asc' ? '\u2191' : '\u2193'}</span>
                )}
              </TableHead>

              <TableHead>Productos</TableHead>
              <TableHead
                className='cursor-pointer'
                onClick={() => handleSort('description')}
              >
                Descripción
                {sort.key === 'description' && (
                  <span>{sort.order === 'asc' ? '\u2191' : '\u2193'}</span>
                )}
              </TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>
                  <img
                    src={category.image}
                    alt={category.description}
                    className='h-8 w-8 rounded-full'
                  />
                </TableCell>
                <TableCell className='font-medium'>{category.name}</TableCell>
                <TableCell>
                  {
                    products.filter(
                      (product) => product.category.id === category.id
                    ).length
                  }
                </TableCell>
                <TableCell>
                  {category.description || 'Sin descripción'}
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
    </main>
  )
}

export default AdminCategoriesTable

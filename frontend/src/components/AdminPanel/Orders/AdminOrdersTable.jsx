import { useEffect, useState, useMemo } from 'react'
import { useGlobalContext } from '@/context/global.context'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { SearchIcon } from '@/components/Icons'

const AdminOrdersTable = () => {
  const { state, handleGetReservations } = useGlobalContext()
  const { reservations } = state
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState({ key: 'id', order: 'asc' })
  const [filters, setFilters] = useState({
    status: [],
  })

  useEffect(() => {
    handleGetReservations()
  }, [handleGetReservations])

  const filteredOrders = useMemo(
    () =>
      reservations
        .map((order) => ({
          ...order,
          productName:
            order.products.length > 0 ? order.products[0].name : 'N/A',
          productId: order.products.length > 0 ? order.products[0].id : 'N/A',
        }))
        .filter((order) => {
          const searchValue = search.toLowerCase()
          return (
            String(order.id).toLowerCase().includes(searchValue) ||
            order.status.toLowerCase().includes(searchValue) ||
            order.productName.toLowerCase().includes(searchValue)
          )
        })
        .filter((order) => {
          if (
            filters.status.length > 0 &&
            !filters.status.includes(order.status)
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
        }),
    [reservations, search, sort, filters]
  )

  const handleSort = (key) => {
    if (sort.key === key) {
      setSort({ key, order: sort.order === 'asc' ? 'desc' : 'asc' })
    } else {
      setSort({ key, order: 'asc' })
    }
  }

  const handleFilterChange = (type, value) => {
    if (type === 'status') {
      setFilters({
        ...filters,
        status: filters.status.includes(value)
          ? filters.status.filter((item) => item !== value)
          : [...filters.status, value],
      })
    }
  }

  return (
    <main className='flex flex-col gap-4 p-4 md:p-6'>
      <div className='flex items-center gap-4'>
        <div className='relative w-full'>
          <Input
            placeholder='Buscar órdenes...'
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
              <DropdownMenuRadioItem value='id'>Orden #</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='productName'>
                Nombre del Producto
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='productId'>
                ID del Producto
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='dateIn'>
                Fecha de Entrada
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='dateOut'>
                Fecha de Salida
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='status'>
                Estado
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
              <Label className='flex items-center gap-2 font-normal'>
                <Checkbox
                  checked={filters.status.includes('reserved')}
                  onCheckedChange={() =>
                    handleFilterChange('status', 'reserved')
                  }
                />
                Reservado
              </Label>
              <Label className='flex items-center gap-2 font-normal'>
                <Checkbox
                  checked={filters.status.includes('completed')}
                  onCheckedChange={() =>
                    handleFilterChange('status', 'completed')
                  }
                />
                Completado
              </Label>
              <Label className='flex items-center gap-2 font-normal'>
                <Checkbox
                  checked={filters.status.includes('cancelled')}
                  onCheckedChange={() =>
                    handleFilterChange('status', 'cancelled')
                  }
                />
                Cancelado
              </Label>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className='overflow-hidden rounded-lg border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className='cursor-pointer'
                onClick={() => handleSort('id')}
              >
                Orden #
                {sort.key === 'id' && (
                  <span className='ml-1'>
                    {sort.order === 'asc' ? '\u2191' : '\u2193'}
                  </span>
                )}
              </TableHead>
              <TableHead
                className='cursor-pointer'
                onClick={() => handleSort('productName')}
              >
                Nombre del Producto
                {sort.key === 'productName' && (
                  <span className='ml-1'>
                    {sort.order === 'asc' ? '\u2191' : '\u2193'}
                  </span>
                )}
              </TableHead>
              <TableHead
                className='cursor-pointer'
                onClick={() => handleSort('productId')}
              >
                ID del Producto
                {sort.key === 'productId' && (
                  <span className='ml-1'>
                    {sort.order === 'asc' ? '\u2191' : '\u2193'}
                  </span>
                )}
              </TableHead>
              <TableHead
                className='cursor-pointer'
                onClick={() => handleSort('productName')}
              >
                Correo Electrónico
                {sort.key === 'productName' && (
                  <span className='ml-1'>
                    {sort.order === 'asc' ? '\u2191' : '\u2193'}
                  </span>
                )}
              </TableHead>
              <TableHead
                className='cursor-pointer'
                onClick={() => handleSort('dateIn')}
              >
                Fecha de Entrega
                {sort.key === 'dateIn' && (
                  <span className='ml-1'>
                    {sort.order === 'asc' ? '\u2191' : '\u2193'}
                  </span>
                )}
              </TableHead>
              <TableHead
                className='cursor-pointer'
                onClick={() => handleSort('dateOut')}
              >
                Fecha de Devolución
                {sort.key === 'dateOut' && (
                  <span className='ml-1'>
                    {sort.order === 'asc' ? '\u2191' : '\u2193'}
                  </span>
                )}
              </TableHead>
              <TableHead
                className='cursor-pointer'
                onClick={() => handleSort('status')}
              >
                Estado
                {sort.key === 'status' && (
                  <span className='ml-1'>
                    {sort.order === 'asc' ? '\u2191' : '\u2193'}
                  </span>
                )}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className='font-medium'>{order.id}</TableCell>
                <TableCell>{order.productName}</TableCell>
                <TableCell>{order.productId}</TableCell>
                <TableCell>{order.email}</TableCell>
                <TableCell>
                  {new Date(order.dateIn).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(order.dateOut).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === 'Devuelto' ? 'success' : 'warning'
                    }
                    className={` ${
                      order.reserved
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    }`}
                  >
                    {order.reserved ? 'Devuelto' : 'Reservado'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  )
}

export default AdminOrdersTable

function ArrowUpDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='m21 16-4 4-4-4' />
      <path d='M17 20V4' />
      <path d='m3 8 4-4 4 4' />
      <path d='M7 4v16' />
    </svg>
  )
}

function FilterIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <polygon points='22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3' />
    </svg>
  )
}

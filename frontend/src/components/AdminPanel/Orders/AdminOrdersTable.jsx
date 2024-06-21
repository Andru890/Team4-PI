import { useState, useMemo } from 'react'
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
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { SearchIcon } from '@/components/Icons'

const AdminUsersTable = () => {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState({ key: 'id', order: 'asc' })
  const [filters, setFilters] = useState({
    status: [],
    customer: [],
  })
  const orders = useMemo(
    () =>
      [
        {
          id: 'INV001',
          date: '2024-05-01',
          customer: 'Wilson Del Canto',
          total: 250.99,
          status: 'Finalizada',
        },
        {
          id: 'INV002',
          date: '2024-04-15',
          customer: 'Camilo Patiño',
          total: 150.0,
          status: 'En Proceso',
        },
        {
          id: 'INV003',
          date: '2024-03-20',
          customer: 'Sofia Brugo',
          total: 350.75,
          status: 'Cancelada',
        },
        {
          id: 'INV004',
          date: '2024-02-10',
          customer: 'Andres Pristone',
          total: 450.0,
          status: 'Finalizada',
        },
        {
          id: 'INV005',
          date: '2024-01-05',
          customer: 'Paula Palacios',
          total: 550.5,
          status: 'En Proceso',
        },
      ]
        .filter((order) => {
          const searchValue = search.toLowerCase()
          return (
            order.id.toLowerCase().includes(searchValue) ||
            order.customer.toLowerCase().includes(searchValue) ||
            order.total.toString().toLowerCase().includes(searchValue) ||
            order.status.toLowerCase().includes(searchValue)
          )
        })
        .filter((order) => {
          if (
            filters.status.length > 0 &&
            !filters.status.includes(order.status)
          ) {
            return false
          }
          if (
            filters.customer.length > 0 &&
            !filters.customer.includes(order.customer)
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
    [search, sort, filters]
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
    } else if (type === 'customer') {
      setFilters({
        ...filters,
        customer: filters.customer.includes(value)
          ? filters.customer.filter((item) => item !== value)
          : [...filters.customer, value],
      })
    }
  }
  return (
    <main className='flex flex-col gap-4 p-4 md:p-6'>
      <div className='flex items-center gap-4'>
        <div className='relative w-full'>
          <Input
            placeholder='Buscar ordenes...'
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
              <DropdownMenuRadioItem value='date'>Fecha</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='customer'>
                Cliente
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='total'>Total</DropdownMenuRadioItem>
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
                  checked={filters.status.includes('Finalizada')}
                  onCheckedChange={() =>
                    handleFilterChange('status', 'Finalizada')
                  }
                />
                Finalizada
              </Label>
              <Label className='flex items-center gap-2 font-normal'>
                <Checkbox
                  checked={filters.status.includes('En Proceso')}
                  onCheckedChange={() =>
                    handleFilterChange('status', 'En Proceso')
                  }
                />
                En Proceso
              </Label>
              <Label className='flex items-center gap-2 font-normal'>
                <Checkbox
                  checked={filters.status.includes('Cancelada')}
                  onCheckedChange={() =>
                    handleFilterChange('status', 'Cancelada')
                  }
                />
                Cancelada
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
                onClick={() => handleSort('date')}
              >
                Fecha
                {sort.key === 'date' && (
                  <span className='ml-1'>
                    {sort.order === 'asc' ? '\u2191' : '\u2193'}
                  </span>
                )}
              </TableHead>
              <TableHead
                className='cursor-pointer'
                onClick={() => handleSort('customer')}
              >
                Cliente
                {sort.key === 'customer' && (
                  <span className='ml-1'>
                    {sort.order === 'asc' ? '\u2191' : '\u2193'}
                  </span>
                )}
              </TableHead>
              <TableHead
                className='text-right cursor-pointer'
                onClick={() => handleSort('total')}
              >
                Total
                {sort.key === 'total' && (
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
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className='font-medium'>{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell className='text-right'>
                  ${order.total.toFixed(2)}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Finalizada'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : order.status === 'En Proceso'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}
                  >
                    {order.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  )
}

export default AdminUsersTable

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

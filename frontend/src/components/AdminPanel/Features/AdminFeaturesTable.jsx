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
  SearchIcon,
  ArrowUpDownIcon,
  FilterIcon,
  TrashIcon,
  PenIcon,
} from '@/components/Icons'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import AdminFeatureDialog from '@/components/AdminPanel/Features/AddFeaturesDialog'

const AdminFeaturesTable = ({ features, handleDeleteFeature }) => {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState({ key: 'id', order: 'asc' })
  const [filters, setFilters] = useState({
    customer: [],
  })

  const filteredFeatures = useMemo(() => {
    return features
  }, [features, search, sort, filters])

  const handleSort = (key) => {
    if (sort.key === key) {
      setSort({ key, order: sort.order === 'asc' ? 'desc' : 'asc' })
    } else {
      setSort({ key, order: 'asc' })
    }
  }

  const handleFilterChange = (type, value) => {
    if (type === 'customer') {
      setFilters({
        ...filters,
        customer: filters.customer.includes(value)
          ? filters.customer.filter((item) => item !== value)
          : [...filters.customer, value],
      })
    }
  }

  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteFeature(id)
        toast.success('Característica eliminada con éxito')
      }
    })
  }

  return (
    <main className='flex flex-col gap-4 p-4 md:p-6'>
      <div className='flex items-center gap-4'>
        <div className='relative w-full'>
          <Input
            placeholder='Buscar características...'
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
              <DropdownMenuRadioItem value='characteristic'>
                Característica
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
                  checked={filters.customer.includes('Diseño Responsivo')}
                  onCheckedChange={() =>
                    handleFilterChange('customer', 'Diseño Responsivo')
                  }
                />
                Diseño Responsivo
              </Label>
              <Label className='flex items-center gap-2 font-normal'>
                <Checkbox
                  checked={filters.customer.includes('Modo Oscuro')}
                  onCheckedChange={() =>
                    handleFilterChange('customer', 'Modo Oscuro')
                  }
                />
                Modo Oscuro
              </Label>
              <Label className='flex items-center gap-2 font-normal'>
                <Checkbox
                  checked={filters.customer.includes('Accesibilidad')}
                  onCheckedChange={() =>
                    handleFilterChange('customer', 'Accesibilidad')
                  }
                />
                Accesibilidad
              </Label>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <AdminFeatureDialog />
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
              <TableHead>Icono</TableHead>
              <TableHead
                className='cursor-pointer'
                onClick={() => handleSort('characteristic')}
              >
                Característica
                {sort.key === 'characteristic' && (
                  <span>{sort.order === 'asc' ? '\u2191' : '\u2193'}</span>
                )}
              </TableHead>

              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFeatures.map((feature) => (
              <TableRow key={feature.id}>
                <TableCell>{feature.id}</TableCell>
                <TableCell>
                  <img
                    src={feature.imageUrl}
                    alt={feature.imageUrl}
                    className='w-8 h-8'
                  />
                </TableCell>
                <TableCell>{feature.characteristic}</TableCell>

                <TableCell>
                  <div className='flex items-center gap-2'>
                    <Button
                      variant='ghost'
                      size='icon'
                      // onClick={() => handleEditFeature(feature)}
                    >
                      <PenIcon className='h-4 w-4' />
                      <span className='sr-only'>Editar</span>
                    </Button>
                    <Button
                      size='icon'
                      variant='ghost'
                      className='text-red-500'
                      onClick={() => handleDelete(feature.id)}
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
    </main>
  )
}

export default AdminFeaturesTable

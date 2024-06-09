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

const AdminUsersTable = ({
  users,
  handleDeleteUser,
  handleRoleChange,
  handleGetRole,
  roles,
}) => {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState({ key: 'id', order: 'asc' })
  const [filters, setFilters] = useState({
    role: [],
  })

  console.log('roles actuales:')
  console.log(roles.name)

  const filteredUsers = useMemo(() => {
    return users
      .filter((user) => {
        const searchValue = search.toLowerCase()
        return (
          user.id.toString().toLowerCase().includes(searchValue) ||
          user.name.toLowerCase().includes(searchValue) ||
          user.lastname.toLowerCase().includes(searchValue) ||
          user.email.toLowerCase().includes(searchValue) ||
          user.phone.toLowerCase().includes(searchValue) ||
          user.city.toLowerCase().includes(searchValue) ||
          user.role.name.toLowerCase().includes(searchValue)
        )
      })
      .filter((user) => {
        if (filters.role.length > 0 && !filters.role.includes(user.role.name)) {
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
  }, [users, search, sort, filters])

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
      role: filters.role.includes(value)
        ? filters.role.filter((item) => item !== value)
        : [...filters.role, value],
    })
  }

  const handleDelete = async (userId) => {
    const result = await Swal.fire({
      title: `¿Estás seguro que deseas eliminar el usuario?`,
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo!',
    })

    if (result.isConfirmed) {
      handleDeleteUser(userId)
      toast.success(`Usuario eliminado con éxito`)
    }
  }

  const handleUpdateChangeRole = async (userId, newRole) => {
    await handleRoleChange(userId, newRole)
  }

  return (
    <main className='flex flex-col gap-4 p-4 md:p-6'>
      <div className='flex items-center gap-4'>
        <div className='relative w-full'>
          <Input
            placeholder='Buscar usuarios...'
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
              <DropdownMenuRadioItem value='lastname'>
                Apellido
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='email'>
                Correo
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='phone'>
                Telefono
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='city'>Pais</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value='role.name'>
                Rol
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
                  checked={filters.role.includes('Administrador')}
                  onCheckedChange={() => handleFilterChange('Administrador')}
                />
                Administrador
              </Label>
              <Label className='flex items-center gap-2 font-normal'>
                <Checkbox
                  checked={filters.role.includes('Usuario')}
                  onCheckedChange={() => handleFilterChange('Usuario')}
                />
                Usuario
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
                ID
                {sort.key === 'id' && (
                  <span>{sort.order === 'asc' ? '\u2191' : '\u2193'}</span>
                )}
              </TableHead>
              <TableHead
                className='cursor-pointer'
                onClick={() => handleSort('name')}
              >
                Nombre
                {sort.key === 'name' && (
                  <span>{sort.order === 'asc' ? '\u2191' : '\u2193'}</span>
                )}
              </TableHead>
              <TableHead
                className='cursor-pointer'
                onClick={() => handleSort('lastname')}
              >
                Apellido
                {sort.key === 'lastname' && (
                  <span>{sort.order === 'asc' ? '\u2191' : '\u2193'}</span>
                )}
              </TableHead>
              <TableHead
                className='cursor-pointer'
                onClick={() => handleSort('email')}
              >
                Correo
                {sort.key === 'email' && (
                  <span>{sort.order === 'asc' ? '\u2191' : '\u2193'}</span>
                )}
              </TableHead>
              <TableHead
                className='cursor-pointer'
                onClick={() => handleSort('phone')}
              >
                Telefono
                {sort.key === 'phone' && (
                  <span>{sort.order === 'asc' ? '\u2191' : '\u2193'}</span>
                )}
              </TableHead>
              <TableHead
                className='cursor-pointer'
                onClick={() => handleSort('city')}
              >
                Pais
                {sort.key === 'city' && (
                  <span>{sort.order === 'asc' ? '\u2191' : '\u2193'}</span>
                )}
              </TableHead>
              <TableHead
                className='cursor-pointer'
                onClick={() => handleSort('role.name')}
              >
                Rol
                {sort.key === 'role.name' && (
                  <span>{sort.order === 'asc' ? '\u2191' : '\u2193'}</span>
                )}
              </TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell className='font-medium'>{user.name}</TableCell>
                <TableCell className='font-medium'>{user.lastname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.city}</TableCell>
                <TableCell>
                  <select
                    className='border rounded-md p-1'
                    onChange={(e) =>
                      handleUpdateChangeRole(user.id, e.target.value)
                    }
                    value={user.role.name}
                  >
                    <option value='' disabled>
                      Selecciona un rol
                    </option>
                    <option value='admin'>Administrador</option>
                    <option value='customer'>Usuario</option>
                  </select>
                </TableCell>
                <TableCell className='flex items-center gap-2'>
                  <Button
                    size='icon'
                    variant='ghost'
                    className='text-red-500'
                    onClick={() => handleDelete(user.id)}
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

export default AdminUsersTable

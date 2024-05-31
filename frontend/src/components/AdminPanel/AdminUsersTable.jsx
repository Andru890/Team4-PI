import Swal from 'sweetalert2'
import { toast } from 'sonner'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { TrashIcon } from '@/components/Icons'
import { Button } from '@/components/ui/button'

const AdminUsersTable = ({ users, handleDeleteUser, handleRoleChange }) => {
  const handleDelete = async (userId) => {
    const result = await Swal.fire({
      title: `¿Estás seguro que deaseas eliminar el usuario?`,
      text: 'No podrás revertir esto!',
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
    // Llama a la función handleRoleChange del contexto global
    await handleRoleChange(userId, newRole)
  }

  return (
    <div className='border shadow-sm rounded-lg'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Apellido</TableHead>
            <TableHead>Correo</TableHead>
            <TableHead>Telefono</TableHead>
            <TableHead>Pais</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
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
                  <option value='admin'>Adminsitrador</option>
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
  )
}
export default AdminUsersTable

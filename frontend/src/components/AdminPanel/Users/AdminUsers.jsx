import AdminUsersTable from '@/components/AdminPanel/Users/AdminUsersTable'
import { useGlobalContext } from '@/context/global.context'

const AdminUsers = () => {
  const { state, handleDeleteUser, handleRoleChange, handleGetRole } =
    useGlobalContext()
  const { dataUser: users, dataRole: roles } = state
  return (
    <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
      <div className='flex items-center'>
        <h1 className='font-semibold text-lg md:text-2xl'>Usuarios</h1>
      </div>

      <AdminUsersTable
        users={users}
        roles={roles}
        handleGetRole={handleGetRole}
        handleDeleteUser={handleDeleteUser}
        handleRoleChange={handleRoleChange}
      />
    </main>
  )
}

export default AdminUsers

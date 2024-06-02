import AdminOrdersTable from '@/components/AdminPanel/AdminOrdersTable'

const AdminOrders = () => {
  return (
    <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
      <div className='flex items-center'>
        <h1 className='font-semibold text-lg md:text-2xl'>Ordenes</h1>
      </div>

      <AdminOrdersTable />
    </main>
  )
}

export default AdminOrders

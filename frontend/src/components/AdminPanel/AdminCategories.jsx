import AdminCategoriesTable from '@/components/AdminPanel/AdminCategoriesTable'
import AddCategoriesDialog from '@/components/AdminPanel/AddCategoriesDialog'
import { useGlobalContext } from '@/context/global.context'

const AdminCategories = () => {
  const { state, handleAddCategory, handleDeleteCategory } = useGlobalContext()
  const { data: category } = state

  return (
    <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
      <div className='flex items-center'>
        <h1 className='font-semibold text-lg md:text-2xl'>Categorías</h1>
        <AddCategoriesDialog />
      </div>
      <AdminCategoriesTable />
    </main>
  )
}

export default AdminCategories

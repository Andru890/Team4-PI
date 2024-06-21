import AdminCategoriesTable from '@/components/AdminPanel/Category/AdminCategoriesTable'
import { useGlobalContext } from '@/context/global.context'

const AdminCategories = () => {
  const { state, handleAddCategory, handleDeleteCategory } = useGlobalContext()
  const { dataCategory: category, data: products } = state
  return (
    <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
      <div className='flex items-center'>
        <h1 className='font-semibold text-lg md:text-2xl'>Categorías</h1>
      </div>
      <AdminCategoriesTable
        products={products}
        categories={category}
        handleAddCategory={handleAddCategory}
        handleDeleteCategory={handleDeleteCategory}
      />
    </main>
  )
}

export default AdminCategories

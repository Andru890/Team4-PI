import ProductTable from '@/components/AdminPanel/Products/AdminProductTable'
import { useGlobalContext } from '@/context/global.context'

const AdminProducts = () => {
  const {
    state,
    handleAddProduct,
    handleDeleteProduct,
    handleUpdateProductStock,
    handleUpdateProductCategory,
  } = useGlobalContext()
  const { data: products, dataCategory: category } = state

  return (
    <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
      <div className='flex items-center'>
        <h1 className='font-semibold text-lg md:text-2xl'>Productos</h1>
      </div>
      <ProductTable
        products={products}
        categories={category}
        handleDeleteProduct={handleDeleteProduct}
        handleUpdateProductStock={handleUpdateProductStock}
        handleUpdateProductCategory={handleUpdateProductCategory}
        handleAddProduct={handleAddProduct}
      />
    </main>
  )
}

export default AdminProducts

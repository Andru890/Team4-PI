import ProductTable from '@/components/AdminPanel/AdminProductTable'
import AddProductDialog from '@/components/AdminPanel/AddProductDialog'
import { useGlobalContext } from '@/context/global.context'

const AdminProducts = () => {
  const { state, handleAddProduct, handleDeleteProduct } = useGlobalContext()
  const { data: products } = state

  return (
    <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
      <div className='flex items-center'>
        <h1 className='font-semibold text-lg md:text-2xl'>Productos</h1>
        <AddProductDialog handleAddProduct={handleAddProduct} />
      </div>
      <ProductTable
        products={products}
        handleDeleteProduct={handleDeleteProduct}
      />
    </main>
  )
}

export default AdminProducts

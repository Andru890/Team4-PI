import AdminFeaturesTable from '@/components/AdminPanel/Features/AdminFeaturesTable'
import { useGlobalContext } from '@/context/global.context'

const AdminFeatures = () => {
  const { state, handleCreateFeature, handleDeleteFeature } = useGlobalContext()
  const { dataFeature: features } = state

  console.log(features)

  return (
    <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
      <div className='flex items-center'>
        <h1 className='font-semibold text-lg md:text-2xl'>Caracteristicas</h1>
      </div>
      <AdminFeaturesTable
        features={features}
        handleDeleteFeature={handleDeleteFeature}
      />
    </main>
  )
}

export default AdminFeatures

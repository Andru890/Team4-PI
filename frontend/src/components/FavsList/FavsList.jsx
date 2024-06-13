import { useGlobalContext } from '@/context/global.context'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import ItemList from '@/components/ItemListContainer/ItemList'

const FavsList = () => {
  const { state, handleClearFavs, handleGetFavs } = useGlobalContext()
  const navigate = useNavigate()

  useEffect(() => {
    handleGetFavs()
  }, [handleGetFavs])

  const productList = state.favs || []

  const clearFavs = () => {
    handleClearFavs()
    toast.success('Lista de favoritos borrada')
  }

  return (
    <section className='w-full flex flex-col items-center justify-center gap-4 p-4'>
      <h1 className='font-semibold text-lg md:text-2xl text-center'>
        Favoritos
      </h1>
      <p className='text-center'>
        Aquí podrás ver tus productos favoritos y comprarlos cuando quieras.
      </p>
      {productList.length > 0 && (
        <button
          className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
          onClick={clearFavs}
        >
          Borrar lista de favoritos
        </button>
      )}
      <div className='w-full'>
        {productList.length > 0 ? (
          <div className='container grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-6 mt-5'>
            <ItemList productList={productList} />
          </div>
        ) : (
          <div className='flex flex-col items-center'>
            <div className='flex flex-col items-center justify-center gap-4'>
              <img
                src='/images/empty-favs.jpg'
                alt='Favoritos vacíos'
                className='w-64 h-64'
              />
              <button
                className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
                onClick={() => navigate('/')}
              >
                Explorar productos
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default FavsList

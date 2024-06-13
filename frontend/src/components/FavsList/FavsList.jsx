import { useGlobalContext } from '@/context/global.context'
import { useEffect } from 'react'
import ItemList from '@/components/ItemListContainer/ItemList'

const FavsList = () => {
  const { state, handleClearFavs, handleGetFavs } = useGlobalContext()

  useEffect(() => {
    handleGetFavs()
  }, [handleGetFavs])

  const productList = state.favs || []

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
          className='clearButton btn btn-secondary'
          onClick={handleClearFavs}
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
              <button className='btn btn-primary'>Explorar productos</button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default FavsList

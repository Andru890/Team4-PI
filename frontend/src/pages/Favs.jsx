import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import FavsList from '@/components/FavsList/FavsList'
const Favs = () => {
  return (
    <>
      <Header />
      <main className='flex flex-1 flex-col items-center justify-center gap-4 p-4 mt-20'>
        <section className='flex flex-1 flex-col items-center justify-center gap-4 p-4'>
          <h1 className='font-semibold text-lg md:text-2xl'>Favoritos</h1>
          <p className='text-center'>
            Aquí podrás ver tus productos favoritos y comprarlos cuando quieras.
          </p>
          <div className='flex flex-col items-center justify-center gap-4'>
            <img
              src='/images/empty-favs.jpg'
              alt='Favoritos vacíos'
              className='w-64 h-64'
            />
            <button className='btn btn-primary'>Explorar productos</button>
          </div>
        </section>
        <section>
          <FavsList />
        </section>
      </main>

      <Footer />
    </>
  )
}

export default Favs

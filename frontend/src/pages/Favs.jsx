import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import FavsList from '@/components/FavsList/FavsList'

const Favs = () => {
  return (
    <>
      <Header />
      <main className='flex flex-col items-center justify-center gap-4 p-4 mt-20'>
        <FavsList />
      </main>
      <Footer />
    </>
  )
}

export default Favs

import CalendarMain from '@/components/Calendar/CalendarMain'
import Videos from '@/components/Login/Videos'
import { ChevrondownIcon } from '@/components/Icons'

const Banner = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('productos')
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className='relative h-[600px] sm:h-[600px] xl:h-full overflow-hidden'>
      <Videos className='absolute inset-0 w-full h-full object-cover object-center z-0' />
      <div className='absolute inset-0 z-10 flex flex-col items-center justify-center text-center'>
        <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 select-none'>
          Alquila el mejor equipo audiovisual
        </h1>
        <p className='text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 select-none'>
          Encuentra el equipo perfecto para tus eventos y proyectos.
        </p>
        <div className='text-left justify-start items-start lg:mt-10'>
          <CalendarMain />
        </div>
      </div>
      <div className='absolute lg:bottom-0 xl:bottom-16 left-1/2 transform -translate-x-1/2 animate-bounce'>
        <button onClick={scrollToProducts} className='focus:outline-none'>
          <ChevrondownIcon className='h-16 w-16 text-white' />
        </button>
      </div>
    </section>
  )
}

export default Banner

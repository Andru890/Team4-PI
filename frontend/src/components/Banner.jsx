import Videos from '@/components/Login/Videos'
import { Button } from './ui/button'

const Banner = () => {
  return (
    <section className='relative h-[400px] sm:h-[500px] lg:h-[700px] overflow-hidden rounded-lg'>
      <Videos className='absolute inset-0 w-full h-full object-cover object-center z-0' />
      <div className='absolute inset-0 z-10 flex flex-col items-center justify-center text-center'>
        <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 select-none'>
          Alquila el mejor equipo audiovisual
        </h1>
        <p className='text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 select-none'>
          Encuentra el equipo perfecto para tus eventos y proyectos.
        </p>
        <Button>Explora aquí</Button>
      </div>
    </section>
  )
}

export default Banner

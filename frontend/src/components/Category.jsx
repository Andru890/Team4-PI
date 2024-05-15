import { Link } from 'react-router-dom'
const Category = () => {
  return (
    <section className='w-full py-12 md:py-24 lg:py-32 bg-slate-200'>
      <div className='container grid max-w-5xl items-center justify-center gap-4 px-4 md:gap-8 md:px-6 lg:grid-cols-2 lg:text-left xl:max-w-6xl xl:gap-10'>
        <div className='space-y-4 md:space-y-6'>
          <div className='space-y-3'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
              Explora nuestras categorías
            </h2>
            <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
              Encuentra todo lo que necesitas para tus proyectos.
            </p>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4 md:gap-8'>
          <div className='relative group overflow-hidden rounded-full'>
            <Link className='absolute inset-0 z-10' href='#'>
              <span className='sr-only'>Cámaras</span>
            </Link>
            <div className='relative group overflow-hidden rounded-full'>
              <img
                alt='Cámaras'
                className='aspect-square object-cover w-full group-hover:scale-105 transition-transform group-hover:brightness-50'
                height={200}
                src='/images/Cameras.jpg'
                width={200}
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity'>
                Cámaras
              </div>
            </div>
          </div>
          <div className='relative group overflow-hidden rounded-full'>
            <Link className='absolute inset-0 z-10' href='#'>
              <span className='sr-only'>Sonido</span>
            </Link>
            <div className='relative group overflow-hidden rounded-full'>
              <img
                alt='Sonido'
                className='aspect-square object-cover w-full group-hover:scale-105 transition-transform group-hover:brightness-50'
                height={200}
                src='/images/Sonidos.jpg'
                width={200}
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity'>
                Sonido
              </div>
            </div>
          </div>
          <div className='relative group overflow-hidden rounded-full'>
            <Link className='absolute inset-0 z-10' href='#'>
              <span className='sr-only'>Luces</span>
            </Link>
            <div className='relative group overflow-hidden rounded-full'>
              <img
                alt='Luces'
                className='aspect-square object-cover w-full group-hover:scale-105 transition-transform group-hover:brightness-50'
                height={200}
                src='/images/Lights.jpg'
                width={200}
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity'>
                Luces
              </div>
            </div>
          </div>
          <div className='relative group overflow-hidden rounded-full'>
            <Link className='absolute inset-0 z-10' href='#'>
              <span className='sr-only'>Accesorios</span>
            </Link>
            <div className='relative group overflow-hidden rounded-full'>
              <img
                alt='Accesorios'
                className='aspect-square object-cover w-full group-hover:scale-105 transition-transform group-hover:brightness-50'
                height={200}
                src='/images/Accessories.jpg'
                width={200}
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity'>
                Accesorios
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Category

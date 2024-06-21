import { CameraIcon, MicIcon, TriangleIcon } from '@/components/Icons'

const Services = () => {
  return (
    <>
      <div className='flex justify-center items-center'>
        <div className='bg-white dark:bg-gray-950 py-12 md:py-20 lg:py-24'>
          <div className='container px-4 md:px-6'>
            <div className='grid gap-8 md:gap-12 lg:gap-16'>
              <div className='text-center'>
                <h1 className='text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl'>
                  Servicios en nuestra tienda de alquiler
                </h1>
                <p className='mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400'>
                  Alquila cámaras, equipos de sonido y accesorios para tus
                  eventos y proyectos.
                </p>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12'>
                <div className='bg-gray-100 dark:bg-gray-800 rounded-lg p-6 md:p-8 flex flex-col items-start gap-4'>
                  <div className='bg-gray-200 dark:bg-gray-700 rounded-full p-3'>
                    <CameraIcon className='w-6 h-6 text-gray-600 dark:text-gray-400' />
                  </div>
                  <h3 className='text-xl font-semibold'>Alquiler de cámaras</h3>
                  <p className='text-gray-500 dark:text-gray-400'>
                    Encuentra la cámara perfecta para tu próximo proyecto.
                    Tenemos una amplia variedad de modelos y marcas.
                  </p>
                </div>
                <div className='bg-gray-100 dark:bg-gray-800 rounded-lg p-6 md:p-8 flex flex-col items-start gap-4'>
                  <div className='bg-gray-200 dark:bg-gray-700 rounded-full p-3'>
                    <MicIcon className='w-6 h-6 text-gray-600 dark:text-gray-400' />
                  </div>
                  <h3 className='text-xl font-semibold'>
                    Alquiler de equipos de sonido
                  </h3>
                  <p className='text-gray-500 dark:text-gray-400'>
                    Asegura una experiencia de audio de alta calidad en tus
                    eventos con nuestros equipos de sonido profesionales.
                  </p>
                </div>
                <div className='bg-gray-100 dark:bg-gray-800 rounded-lg p-6 md:p-8 flex flex-col items-start gap-4'>
                  <div className='bg-gray-200 dark:bg-gray-700 rounded-full p-3'>
                    <TriangleIcon className='w-6 h-6 text-gray-600 dark:text-gray-400' />
                  </div>
                  <h3 className='text-xl font-semibold'>
                    Alquiler de accesorios
                  </h3>
                  <p className='text-gray-500 dark:text-gray-400'>
                    Complementa tus equipos de fotografía y audio con nuestros
                    accesorios de alta calidad.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Services

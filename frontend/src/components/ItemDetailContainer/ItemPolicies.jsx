const ItemPolicies = () => {
  return (
    <div className='w-full bg-gray-100 dark:bg-gray-900 py-12 md:py-16 lg:py-20 mt-20'>
      <div className='container px-4 md:px-6'>
        <div className='mb-8 space-y-2'>
          <h2 className='text-2xl font-bold tracking-tight md:text-3xl'>
            Políticas de Uso de Equipos
          </h2>
          <div className='h-1 w-20 rounded-full bg-gray-900 dark:bg-gray-50' />
        </div>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          <div>
            <h3 className='mb-2 text-xl font-semibold'>
              Uso de Cámaras y Accesorios
            </h3>
            <p className='text-gray-500 dark:text-gray-400'>
              Para mantener nuestras cámaras y accesorios en buen estado, te
              pedimos que los uses con cuidado. Sigue las instrucciones de uso,
              guárdalos en un lugar seguro y límpialos adecuadamente después de
              cada uso.
            </p>
          </div>
          <div>
            <h3 className='mb-2 text-xl font-semibold'>
              Alquiler de Equipos de Audio
            </h3>
            <p className='text-gray-500 dark:text-gray-400'>
              Al alquilar equipos de audio como micrófonos y altavoces,
              asegúrate de seguir las condiciones de uso. Esto incluye la
              correcta instalación, cuidado durante el uso y devolución a
              tiempo. Nos reservamos el derecho de cobrar por cualquier daño.
            </p>
          </div>
          <div>
            <h3 className='mb-2 text-xl font-semibold'>
              Normas para Sistemas de Iluminación
            </h3>
            <p className='text-gray-500 dark:text-gray-400'>
              Usa nuestros sistemas de iluminación de manera segura y eficiente.
              Instálalos correctamente y evita sobrecargas eléctricas. Asegúrate
              de que todo esté apagado y almacenado adecuadamente después de su
              uso.
            </p>
          </div>
          <div>
            <h3 className='mb-2 text-xl font-semibold'>
              Mantenimiento y Devolución de Equipos de Sonido
            </h3>
            <p className='text-gray-500 dark:text-gray-400'>
              Antes y después de usar los equipos de sonido, realiza un
              mantenimiento básico para asegurar que funcionen correctamente.
              Devuélvelos en buenas condiciones y reporta cualquier problema o
              daño.
            </p>
          </div>
          <div>
            <h3 className='mb-2 text-xl font-semibold'>
              Seguridad en el Manejo de Equipos
            </h3>
            <p className='text-gray-500 dark:text-gray-400'>
              La seguridad es primordial. Sigue nuestras recomendaciones para
              evitar riesgos eléctricos y maneja los equipos pesados con
              cuidado. Usa equipo de protección personal cuando sea necesario
              para evitar accidentes.
            </p>
          </div>
          <div>
            <h3 className='mb-2 text-xl font-semibold'>
              Términos Generales de Alquiler
            </h3>
            <p className='text-gray-500 dark:text-gray-400'>
              Al alquilar cualquier equipo, acepta nuestros términos y
              condiciones generales. Esto incluye cumplir con los requisitos de
              alquiler, respetar las políticas de cancelación y asumir la
              responsabilidad de los equipos durante el período de alquiler.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemPolicies

import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const AdminMobileFallback = () => {
  return (
    <div className='fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center z-50 lg:hidden'>
      <div className='bg-white dark:bg-gray-950 p-6 rounded-lg shadow-lg text-center'>
        <h2 className='text-2xl font-bold mb-4'>
          Lo siento, esta funcionalidad no está disponible en dispositivos
        </h2>
        <p className='text-gray-500 dark:text-gray-400 mb-6'>
          Por favor, utiliza una pantalla más grande para acceder a todas las
          funciones de esta aplicación.
        </p>
        <Link to='/' className='button-primary'>
          <Button variant='outline'>Volver</Button>
        </Link>
      </div>
    </div>
  )
}

export default AdminMobileFallback

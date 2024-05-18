import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <div className='max-w-md mx-auto text-center'>
        <h1 className='text-9xl font-bold text-gray-800 mb-4'>404</h1>
        <p className='text-2xl font-semibold text-gray-700 mb-8'>
          Página no encontrada
        </p>
        <p className='text-gray-600 mb-12'>
          Lo sentimos, la página que estás buscando no existe.
        </p>
        <Link
          to='/'
          className='inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300'
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}

export default NotFound

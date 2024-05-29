import { useAuthContext } from '@/context/auth.context'

const Services = () => {
  const { isAuthenticated } = useAuthContext()
  return (
    <div>
      {isAuthenticated
        ? 'El usuario está autenticado'
        : 'El usuario no está autenticado'}
    </div>
  )
}

export default Services

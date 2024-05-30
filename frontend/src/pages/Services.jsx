import { useAuthContext } from '@/context/auth.context'

const Services = () => {
  const { login } = useAuthContext()
  return (
    <div>
      <h1>Services</h1>
      <p>
        {login
          ? 'Estás autenticado y puedes ver esta página.'
          : 'Por favor inicia sesión para ver esta página.'}
      </p>
    </div>
  )
}

export default Services

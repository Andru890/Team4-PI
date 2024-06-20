import { useAuthContext } from '@/context/auth.context'

const Contact = () => {
  const { login } = useAuthContext()
  return (
    <div>
      <h1>Contacto</h1>
      <p>
        {login
          ? 'Estás autenticado y puedes ver esta página.'
          : 'Por favor inicia sesión para ver esta página.'}
      </p>
    </div>
  )
}

export default Contact

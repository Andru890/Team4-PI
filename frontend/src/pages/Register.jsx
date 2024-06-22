import { useNavigate, Link } from 'react-router-dom'
import { useAuthContext } from '@/context/auth.context'
import AuthForm from '@/components/Login/AuthForm'
import Video from '@/components/Login/Videos'
import Logo from '@/components/Login/Logo'
import { routes } from '@/routes/routes'
import { toast, Toaster } from 'sonner'
import confetti from 'canvas-confetti'

const Register = () => {
  const { register } = useAuthContext()
  const navigate = useNavigate()

  const handleRegister = async (formData, buttonRef) => {
    if (formData.password !== formData.confirmPassword) {
      toast.error('Las contraseñas no coinciden')
      throw new Error('Passwords do not match')
    }
    const newUser = {
      name: formData.name,
      lastname: formData.lastname,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      password: formData.password,
    }
    try {
      await register(newUser)
      const buttonPosition = buttonRef.getBoundingClientRect()
      confetti({
        particleCount: 100,
        startVelocity: 30,
        spread: 70,
        origin: {
          x:
            (buttonPosition.left + buttonPosition.right) /
            2 /
            window.innerWidth,
          y: buttonPosition.top / window.innerHeight,
        },
      })
      toast.success('Usuario creado exitosamente!')
      setTimeout(() => {
        navigate(routes.login)
      }, 1000)
    } catch {
      throw new Error(
        `No se pudo crear el usuario con el mail ${formData.email}, ya existe.`
      )
    }
  }

  return (
    <div className='w-full lg:grid lg:grid-cols-3 min-h-screen relative'>
      <div className='hidden bg-gray-100 lg:col-span-2 lg:block dark:bg-gray-800 relative'>
        <div className='absolute top-5 left-5 z-10'>
          <Logo />
        </div>
        <Video />
      </div>
      <div className='flex items-center justify-center py-12 lg:col-span-1'>
        <div className='mx-auto w-[350px] space-y-6'>
          <div className='space-y-2 text-center'>
            <h1 className='text-3xl font-bold'>Registrarse</h1>
            <p className='text-gray-500 dark:text-gray-400'>
              Ingresa tus datos a continuación para crear una cuenta
            </p>
          </div>
          <AuthForm
            isRegister={true}
            onSubmit={handleRegister}
            initialData={{
              name: '',
              lastname: '',
              email: '',
              phone: '',
              city: '',
              password: '',
              confirmPassword: '',
            }}
            buttonText='Registrarse'
          />
          <div className='mt-4 text-center text-sm'>
            ¿Ya tienes una cuenta?{' '}
            <Link className='underline' to={routes.login}>
              Iniciar sesión
            </Link>
          </div>
        </div>
      </div>
      <Toaster richColors />
    </div>
  )
}

export default Register

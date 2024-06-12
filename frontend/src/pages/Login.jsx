// Login.js
import { useNavigate, Link } from 'react-router-dom'
import { useGlobalContext } from '@/context/global.context'
import AuthForm from '@/components/Login/AuthForm'
import Video from '@/components/Login/Videos'
import Logo from '@/components/Login/Logo'
import { routes } from '@/routes/routes'
import { toast, Toaster } from 'sonner'
import confetti from 'canvas-confetti'

const Login = () => {
  const { login } = useGlobalContext()
  const navigate = useNavigate()

  const handleLogin = async (formData, buttonRef) => {
    const { email, password } = formData
    const user = await login(email, password)
    if (user) {
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
      toast.success('Inicio de sesión exitoso!')
      setTimeout(() => {
        navigate(routes.home)
      }, 2000)
    } else {
      toast.error('El correo electrónico o la contraseña son incorrectos')
      throw new Error('Invalid login credentials')
    }
  }

  return (
    <>
      <div className='w-full lg:grid lg:min-h-[600px] lg:grid-cols-3 xl:min-h-[800px]'>
        <div className='hidden bg-gray-100 lg:col-span-2 lg:block dark:bg-gray-800'>
          <div className='absolute top-5 left-5 z-10'>
            <Logo />
          </div>
          <Video />
        </div>
        <div className='flex items-center justify-center py-12'>
          <div className='mx-auto w-[350px] space-y-6'>
            <div className='space-y-2 text-center'>
              <h1 className='text-3xl font-bold'>Iniciar sesión</h1>
              <p className='text-gray-500 dark:text-gray-400'>
                Ingresa tu correo electrónico a continuación para iniciar sesión
                en tu cuenta
              </p>
            </div>
            <AuthForm
              isRegister={false}
              onSubmit={handleLogin}
              initialData={{ email: '', password: '' }}
              buttonText='Iniciar sesión'
            />
            <div className='mt-4 text-center text-sm'>
              ¿No tienes una cuenta?{' '}
              <Link className='underline' to={routes.register}>
                Regístrate
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Toaster richColors />
    </>
  )
}

export default Login

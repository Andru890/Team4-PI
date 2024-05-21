import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { routes } from '@/routes/routes'
import { MailIcon, LockIcon } from '@/components/Icons'
import Video from '@/components/Login/Videos'
import Logo from '@/components/Login/Logo'

const Login = () => {
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
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='email'>Correo electrónico</Label>
                <div className='relative'>
                  <MailIcon className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                  <Input
                    className='pl-10'
                    id='email'
                    placeholder='ejemplo@dominio.com'
                    required
                    type='email'
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Contraseña</Label>
                  <Link
                    className='ml-auto inline-block text-sm underline'
                    href='#'
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <div className='relative'>
                  <LockIcon className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                  <Input
                    className='pl-10'
                    id='password'
                    required
                    type='password'
                    placeholder='Ingresa tu contraseña'
                  />
                </div>
              </div>
              <Button className='w-full' type='submit'>
                Iniciar sesión
              </Button>
            </div>
            <div className='mt-4 text-center text-sm'>
              ¿No tienes una cuenta?{' '}
              <Link className='underline' to={routes.register}>
                Regístrate
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login

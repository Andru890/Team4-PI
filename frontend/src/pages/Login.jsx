import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { routes } from '@/routes/routes'

const Login = () => {
  return (
    <>
      <div className='w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[900px]'>
        <div className='hidden bg-gray-100 lg:block dark:bg-gray-800'>
          <span className='h-full w-full object-cover rounded-md bg-muted' />
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
                <Input
                  id='email'
                  placeholder='ejemplo@dominio.com'
                  required
                  type='email'
                />
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
                <Input id='password' required type='password' />
              </div>
              <Button className='w-full' type='submit'>
                Iniciar sesión
              </Button>
            </div>
            <div className='mt-4 text-center text-sm'>
              ¿No tienes una cuenta?
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

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { routes } from '@/routes/routes'
import { MailIcon, LockIcon, UserIcon } from '@/components/Icons'
import Video from '@/components/Login/Videos'

const Register = () => {
  return (
    <div className='w-full lg:grid lg:min-h-[600px] lg:grid-cols-3 xl:min-h-[800px]'>
      <div className='hidden bg-gray-100 lg:col-span-2 lg:block dark:bg-gray-800'>
        <Video />
      </div>
      <div className='flex items-center justify-center py-12'>
        <div className='mx-auto w-[350px] space-y-6'>
          <div className='space-y-2 text-center'>
            <h1 className='text-3xl font-bold'>Registrarse</h1>
            <p className='text-gray-500 dark:text-gray-400'>
              Ingresa tus datos a continuación para crear una cuenta
            </p>
          </div>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Nombre</Label>
              <div className='relative'>
                <UserIcon className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                <Input
                  className='pl-10'
                  id='name'
                  placeholder='Ingresa tu nombre'
                  required
                />
              </div>
            </div>
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
              </div>
              <div className='relative'>
                <LockIcon className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                <Input
                  className='pl-10'
                  id='password'
                  required
                  type='password'
                />
              </div>
            </div>
            <Button className='w-full' type='submit'>
              Registrarse
            </Button>
          </div>
          <div className='mt-4 text-center text-sm'>
            ¿Ya tienes una cuenta?
            <Link className='underline' to={routes.login}>
              Iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register

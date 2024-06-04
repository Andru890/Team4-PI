import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, Toaster } from 'sonner'
import confetti from 'canvas-confetti'
import { useGlobalContext } from '@/context/global.context'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { routes } from '@/routes/routes'
import {
  MailIcon,
  LockIcon,
  UserIcon,
  PhoneIcon,
  GlobeIcon,
} from '@/components/Icons'
import Video from '@/components/Login/Videos'
import Logo from '@/components/Login/Logo'

const Register = () => {
  const buttonRef = useRef(null)
  const { handleCreateUser } = useGlobalContext()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('Formulario enviado', formData)
    if (formData.password !== formData.confirmPassword) {
      toast.error('Las contraseñas no coinciden')
      return
    }
    try {
      const newUser = {
        name: formData.name,
        lastname: formData.lastname,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        password: formData.password,
      }
      const user = await handleCreateUser(newUser)
      if (user) {
        const buttonPosition = buttonRef.current.getBoundingClientRect()
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
      } else {
        toast.error(
          `No se pudo crear el usuario con el mail ${formData.email} ya exsite`
        )
      }
    } catch (error) {
      toast.error('Error al crear el usuario')
    }
  }

  return (
    <div className='w-full lg:grid lg:min-h-[600px] lg:grid-cols-3 xl:min-h-[800px] relative'>
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
          <form onSubmit={handleSubmit}>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='name'>Nombre</Label>
                <div className='relative'>
                  <UserIcon className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                  <Input
                    className='pl-10'
                    id='name'
                    name='name'
                    placeholder='Ingresa tu nombre'
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='lastname'>Apellido</Label>
                <div className='relative'>
                  <UserIcon className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                  <Input
                    className='pl-10'
                    id='lastname'
                    name='lastname'
                    placeholder='Ingresa tu apellido'
                    required
                    value={formData.lastname}
                    onChange={handleChange}
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
                    name='email'
                    placeholder='ejemplo@dominio.com'
                    required
                    type='email'
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='phone'>Teléfono</Label>
                <div className='relative'>
                  <PhoneIcon className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                  <Input
                    className='pl-10'
                    id='phone'
                    name='phone'
                    placeholder='Ingresa tu teléfono'
                    required
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='city'>País</Label>
                <div className='relative'>
                  <GlobeIcon className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                  <Input
                    className='pl-10'
                    id='city'
                    name='city'
                    placeholder='Ingresa tu país'
                    required
                    value={formData.city}
                    onChange={handleChange}
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
                    name='password'
                    required
                    type='password'
                    placeholder='Ingresa tu contraseña'
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <div className='flex items-center'>
                  <Label htmlFor='confirmPassword'>Repetir contraseña</Label>
                </div>
                <div className='relative'>
                  <LockIcon className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                  <Input
                    className='pl-10'
                    id='confirmPassword'
                    name='confirmPassword'
                    required
                    type='password'
                    placeholder='Repite tu contraseña'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <Button className='w-full' type='submit' ref={buttonRef}>
                Registrarse
              </Button>
            </div>
          </form>
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

// AuthForm.js
import { useState, useRef } from 'react'
import { toast } from 'sonner'
import confetti from 'canvas-confetti'
import { useNavigate } from 'react-router-dom'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  MailIcon,
  LockIcon,
  UserIcon,
  PhoneIcon,
  GlobeIcon,
} from '@/components/Icons'

// Componente Loader
const Loader = () => (
  <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
    <div className='loader'>Cargando...</div>
  </div>
)

const AuthForm = ({ isRegister, onSubmit, initialData, buttonText }) => {
  const buttonRef = useRef(null)
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialData)
  const [loading, setLoading] = useState(false)
  const [redirecting, setRedirecting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      await onSubmit(formData, buttonRef.current)
      setRedirecting(true)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error('Error al procesar la solicitud')
    }
  }

  return (
    <>
      {loading && <Loader />}
      {redirecting ? (
        <div className='text-center mt-4 text-lg'>
          <img src='/loading.gif' alt='Loading...' />
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className='space-y-4'>
            {isRegister && (
              <>
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
              </>
            )}
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
            {isRegister && (
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
            )}
            <Button
              className='w-full'
              type='submit'
              ref={buttonRef}
              disabled={loading}
            >
              {loading ? 'Cargando...' : buttonText}
            </Button>
          </div>
        </form>
      )}
    </>
  )
}

export default AuthForm

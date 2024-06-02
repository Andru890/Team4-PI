import { useForm } from 'react-hook-form'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <>
      <Header />
      <div className='flex justify-center items-center h-screen'>
        <div className='max-w-md mx-auto space-y-8 px-4'>
          <div className='space-y-2'>
            <h2 className='text-3xl font-bold'>Contáctanos</h2>
            <p className='text-gray-500 dark:text-gray-400'>
              Llena el formulario a continuación y nos pondremos en contacto
              contigo a la brevedad.
            </p>
          </div>
          <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='name'>Nombre</Label>
                <Input
                  {...register('name', { required: 'El nombre es requerido' })}
                  id='name'
                  placeholder='Ingresa tu nombre'
                  aria-label=''
                />
                {errors.name && (
                  <p className='text-red-500'>{errors.name.message}</p>
                )}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='email'>Correo electrónico</Label>
                <Input
                  {...register('email', {
                    required: 'El email es requerido',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: 'Dirección de correo electrónico inválida',
                    },
                  })}
                  id='email'
                  type='email'
                  placeholder='Ingresa tu correo electrónico'
                />
                {errors.email && (
                  <p className='text-red-500'>{errors.email.message}</p>
                )}
              </div>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='subject'>Asunto</Label>
              <Input
                {...register('subject', { required: 'El asunto es requerido' })}
                id='subject'
                placeholder='Escribe el asunto'
                aria-label=''
              />
              {errors.subject && (
                <p className='text-red-500'>{errors.subject.message}</p>
              )}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='message'>Mensaje</Label>
              <Textarea
                {...register('message', {
                  required: 'El mensaje es requerido',
                })}
                id='message'
                placeholder='Escribe tu mensaje'
                className='min-h-[120px]'
              />
              {errors.message && (
                <p className='text-red-500'>{errors.message.message}</p>
              )}
            </div>
            <Button type='submit' className='w-full'>
              Enviar mensaje
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Contact

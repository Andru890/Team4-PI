import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { PhoneIcon } from '@/components/Icons'
import { toast } from 'sonner'

export default function Component() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [showSuccessNotification, setShowSuccessNotification] = useState(false)

  const handleMessageChange = (e) => {
    if (e.target.value.length <= 300) {
      setMessage(e.target.value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      const phoneNumber = '56954205188'
      const whatsappMessage = `Hola, soy ${name}. Mi correo es ${email}. ${message}`
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`
      window.open(url, '_blank')

      setShowSuccessNotification(true)
      setName('')
      setEmail('')
      setMessage('')
      toast.success('¡Mensaje enviado con éxito!')
    } catch (error) {
      toast.error('Error al enviar el mensaje. Por favor, inténtalo de nuevo.')
    }
  }

  return (
    <div className='fixed bottom-4 right-4 z-50'>
      <div
        className={`bg-[#25D366] rounded-full p-3 cursor-pointer transition-all duration-300 ${
          isOpen ? 'scale-125' : ''
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <PhoneIcon className='w-6 h-6 text-white' />
      </div>
      {isOpen && (
        <div className='bg-white rounded-lg shadow-lg p-4 mt-4 w-80 max-w-full'>
          <form onSubmit={handleSubmit}>
            <div className='space-y-4'>
              <div>
                <Label htmlFor='name'>Nombre</Label>
                <Input
                  id='name'
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor='email'>Correo electrónico</Label>
                <Input
                  id='email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor='message'>Mensaje</Label>
                <Textarea
                  id='message'
                  value={message}
                  onChange={handleMessageChange}
                  rows={4}
                  required
                  className='resize-none'
                />
                <div className='text-right text-gray-500'>
                  {message.length}/300
                </div>
              </div>
              <Button type='submit'>Enviar mensaje</Button>
            </div>
          </form>
          {showSuccessNotification && (
            <div className='bg-green-500 text-white p-2 rounded-md mt-4 text-center'>
              ¡Mensaje enviado con éxito!
            </div>
          )}
        </div>
      )}
    </div>
  )
}

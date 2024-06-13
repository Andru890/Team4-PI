import React, { useState } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { StarIcon } from '@/components/Icons/'

const ItemReviews = () => {
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')

  const handleStarClick = (index) => {
    setRating(index + 1)
  }

  const handleTextareaChange = (event) => {
    if (event.target.value.length <= 300) {
      setReview(event.target.value)
    }
  }

  return (
    <div className='bg-white dark:bg-gray-950 rounded-lg p-6 max-w-2xl mx-auto'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-2xl font-bold'>Reseñas del producto</h2>
        <div className='flex items-center gap-1'>
          <StarIcon className='w-5 h-5 fill-blue-400' />
          <StarIcon className='w-5 h-5 fill-blue-400' />
          <StarIcon className='w-5 h-5 fill-blue-400' />
          <StarIcon className='w-5 h-5 fill-muted stroke-muted-foreground' />
          <StarIcon className='w-5 h-5 fill-muted stroke-muted-foreground' />
          <span className='text-gray-500 dark:text-gray-400 ml-2'>4.2</span>
        </div>
      </div>
      <div className='grid gap-4'>
        <div className='flex items-start gap-4'>
          <Avatar className='w-10 h-10 border'>
            <AvatarImage src='/placeholder-user.jpg' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='grid gap-2'>
            <div className='flex items-center gap-2'>
              <div className='flex items-center gap-0.5'>
                <StarIcon className='w-4 h-4 fill-blue-400' />
                <StarIcon className='w-4 h-4 fill-blue-400' />
                <StarIcon className='w-4 h-4 fill-blue-400' />
                <StarIcon className='w-4 h-4 fill-muted stroke-muted-foreground' />
                <StarIcon className='w-4 h-4 fill-muted stroke-muted-foreground' />
              </div>
              <span className='text-sm text-gray-500 dark:text-gray-400'>
                Hace 2 días
              </span>
            </div>
            <div className='text-sm leading-loose text-gray-500 dark:text-gray-400'>
              <p>
                El equipo de cámaras y luces que alquilé fue excelente. Superó
                mis expectativas en calidad y rendimiento.
              </p>
            </div>
          </div>
        </div>
        <div className='flex items-start gap-4'>
          <Avatar className='w-10 h-10 border'>
            <AvatarImage src='/placeholder-user.jpg' />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className='grid gap-2'>
            <div className='flex items-center gap-2'>
              <div className='flex items-center gap-0.5'>
                <StarIcon className='w-4 h-4 fill-blue-400' />
                <StarIcon className='w-4 h-4 fill-blue-400' />
                <StarIcon className='w-4 h-4 fill-blue-400' />
                <StarIcon className='w-4 h-4 fill-blue-400' />
                <StarIcon className='w-4 h-4 fill-muted stroke-muted-foreground' />
              </div>
              <span className='text-sm text-gray-500 dark:text-gray-400'>
                Hace 1 semana
              </span>
            </div>
            <div className='text-sm leading-loose text-gray-500 dark:text-gray-400'>
              <p>
                El sistema de sonido que alquilé fue impresionante. Tenía una
                calidad de audio excepcional y fue fácil de configurar.
              </p>
            </div>
          </div>
        </div>
        <div className='flex items-start gap-4'>
          <Avatar className='w-10 h-10 border'>
            <AvatarImage src='/placeholder-user.jpg' />
            <AvatarFallback>EM</AvatarFallback>
          </Avatar>
          <div className='grid gap-2'>
            <div className='flex items-center gap-2'>
              <div className='flex items-center gap-0.5'>
                <StarIcon className='w-4 h-4 fill-blue-400' />
                <StarIcon className='w-4 h-4 fill-blue-400' />
                <StarIcon className='w-4 h-4 fill-muted stroke-muted-foreground' />
                <StarIcon className='w-4 h-4 fill-muted stroke-muted-foreground' />
                <StarIcon className='w-4 h-4 fill-muted stroke-muted-foreground' />
              </div>
              <span className='text-sm text-gray-500 dark:text-gray-400'>
                Hace 3 días
              </span>
            </div>
            <div className='text-sm leading-loose text-gray-500 dark:text-gray-400'>
              <p>
                Los accesorios de iluminación que alquilé eran buenos, pero
                esperaba un poco más de calidad. Aún así, cumplieron su función.
              </p>
            </div>
          </div>
        </div>
        <Separator />
        <div className='grid gap-2'>
          <Label htmlFor='review'>Deja un comentario</Label>
          <Textarea
            id='review'
            placeholder='Escribe tu comentario aquí...'
            rows={5}
            value={review}
            onChange={handleTextareaChange}
            maxLength={300}
            limitReachedClassName='text-red-500'
            className='resize-none'
          />
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-0.5'>
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  className={`w-5 h-5 cursor-pointer ${index < rating ? 'fill-blue-400' : 'fill-muted stroke-muted-foreground'}`}
                  onClick={() => handleStarClick(index)}
                />
              ))}
            </div>
            <Button size='sm'>Enviar comentario</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemReviews

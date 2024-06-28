import { useState, useEffect } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { StarIcon } from '@/components/Icons/'
import { useGlobalContext } from '@/context/global.context'
import { useAuthContext } from '@/context/auth.context'
import { toast, Toaster } from 'sonner'

const ItemReviews = ({ productId }) => {
  const {
    state,
    handleGetQualifyByProduct,
    handleAddQualify,
    handleGetReservationsByUser,
  } = useGlobalContext()
  const { getUserInfoFromToken } = useAuthContext()
  const [user, setUser] = useState(null)
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  const [reviews, setReviews] = useState([])
  const [reservationId, setReservationId] = useState()
  const [averageRating, setAverageRating] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = getUserInfoFromToken()
      if (userInfo && userInfo.email) {
        setUser(userInfo)
      } else {
        console.error('User not found in token')
      }
    }

    fetchUser()
  }, [getUserInfoFromToken])

  useEffect(() => {
    if (productId) {
      const fetchReviews = async () => {
        await handleGetQualifyByProduct(productId)
      }
      fetchReviews()
    }
  }, [productId, handleGetQualifyByProduct])

  useEffect(() => {
    const fetchReservations = async () => {
      if (user?.email) {
        try {
          const reservations = await handleGetReservationsByUser(user.email)
          const reservation = reservations.find((res) =>
            res.products.some((product) => {
              return product.id === productId
            })
          )
          if (reservation) {
            setReservationId(reservation.id)
            console.log('Matching Reservation ID:', reservation.id)
          } else {
            console.error('No matching reservation found for the product.')
          }
        } catch (error) {
          console.error('Error fetching reservations:', error)
        }
      }
    }
    fetchReservations()
  }, [user, productId, handleGetReservationsByUser])

  useEffect(() => {
    if (state.dataQualify) {
      setReviews(state.dataQualify)
      calculateAverageRating(state.dataQualify)
    }
  }, [state.dataQualify])

  const calculateAverageRating = (reviews) => {
    if (reviews.length > 0) {
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      )
      const average = totalRating / reviews.length
      setAverageRating(average.toFixed(1))
    } else {
      setAverageRating(0)
    }
  }

  const handleStarClick = (index) => {
    setRating(index + 1)
  }

  const handleTextareaChange = (event) => {
    if (event.target.value.length <= 300) {
      setReview(event.target.value)
    }
  }

  const handleSubmitReview = async () => {
    if (!rating) {
      setError('Por favor, escribe un comentario.')
      return
    }
    if (!review) {
      setError('Por favor, selecciona una puntuación')
      return
    }

    setError('')
    console.log('Submit Review:', {
      review,
      rating,
      productId,
      reservationId,
    })
    if (review && rating && productId && reservationId) {
      try {
        await handleAddQualify(
          user.email,
          productId,
          reservationId,
          rating,
          review
        )
        setReview('')
        setRating(0)
        await handleGetQualifyByProduct(productId)
      } catch (error) {
        console.error('Error adding qualify:', error)
        toast.error('El usuario no puede calificar la reserva') // Muestra el mensaje de error con toast
      }
    } else {
      console.error('Review, rating, productId, and reservationId are required')
    }
  }

  if (!user) {
    return <p>Por favor inicia sesión para dejar una reseña.</p>
  }

  return (
    <div className='bg-white dark:bg-gray-950 rounded-lg p-6 max-w-2xl mx-auto'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-2xl font-bold mr-2'>Reseñas del producto</h2>
        <div className='flex items-center gap-1'>
          {[...Array(5)].map((_, index) => (
            <StarIcon
              key={index}
              className={`w-5 h-5 ${
                index < Math.round(averageRating)
                  ? 'fill-blue-400'
                  : 'fill-muted stroke-muted-foreground'
              }`}
            />
          ))}
          <span className='text-gray-500 dark:text-gray-400 ml-2'>
            {averageRating}
          </span>
        </div>
      </div>
      <div className='grid gap-4'>
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className='flex items-start gap-4'>
              <Avatar className='w-10 h-10 border'>
                <AvatarImage src={review.user.imageUrl} />
                <AvatarFallback>{review.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className='grid gap-2'>
                <div className='flex items-center gap-2'>
                  <div className='flex items-center gap-0.5'>
                    {[...Array(5)].map((_, index) => (
                      <StarIcon
                        key={index}
                        className={`w-4 h-4 ${index < review.rating ? 'fill-blue-400' : 'fill-muted stroke-muted-foreground'}`}
                      />
                    ))}
                  </div>
                  <span className='text-sm text-gray-500 dark:text-gray-400'>
                    Hace{' '}
                    {Math.round(
                      (Date.now() - new Date(review.date).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}{' '}
                    días
                  </span>
                </div>
                <div className='text-sm leading-loose text-gray-500 dark:text-gray-400'>
                  <p>{review.coment}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No hay reseñas aún.</p>
        )}
        <Separator />
        <div className='grid gap-2'>
          <Label htmlFor='review'>Deja un comentario</Label>
          <div className='relative'>
            <Textarea
              id='review'
              placeholder='Escribe tu comentario aquí...'
              rows={5}
              value={review}
              onChange={handleTextareaChange}
              maxLength={300}
              className='resize-none'
            />
            <span className='absolute bottom-2 right-2 text-sm text-gray-500'>
              {review.length}/300
            </span>
          </div>
          {error && <p className='text-sm text-red-500'>{error}</p>}
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
            <Button size='sm' onClick={handleSubmitReview}>
              Enviar comentario
            </Button>
          </div>
        </div>
      </div>
      <Toaster
        position='top-right'
        reverseOrder={false}
        gutter={8}
        containerClassName=''
        containerStyle={{}}
        toastOptions={{}}
      />
    </div>
  )
}

export default ItemReviews

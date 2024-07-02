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
  const { state, handleGetQualifyByProduct, handleAddQualify } =
    useGlobalContext()
  const { getUserInfoFromToken } = useAuthContext()
  const { reservations } = state
  const [user, setUser] = useState(null)
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  const [reviews, setReviews] = useState([])
  const [reservationId, setReservationId] = useState()
  const [averageRating, setAverageRating] = useState(0)
  const [error, setError] = useState('')
  const [hasReservation, setHasReservation] = useState(false)
  const [hasReviewed, setHasReviewed] = useState(false)
  const [userHasReviewedProduct, setUserHasReviewedProduct] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = getUserInfoFromToken()
      if (userInfo && userInfo.email) {
        setUser(userInfo)
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
          const reservation = reservations.find((res) =>
            res.products.some((product) => {
              return product.id === productId
            })
          )
          if (reservation) {
            setReservationId(reservation.id)
            setHasReservation(true)
            const userReview = reviews.find(
              (review) =>
                review.reservationId === reservation.id &&
                review.user.email === user.email
            )
            setHasReviewed(!!userReview)
          } else {
            setHasReservation(false)
          }
        } catch (error) {
          console.error('Error fetching reservations:', error)
        }
      }
    }
    fetchReservations()
  }, [user, productId, reservations, reviews])

  useEffect(() => {
    if (state.dataQualify) {
      setReviews(state.dataQualify)
      calculateAverageRating(state.dataQualify)

      // Check if the user has already reviewed the product
      if (user) {
        const productReview = state.dataQualify.find(
          (review) => review.user.email === user.email
        )
        setUserHasReviewedProduct(!!productReview)
      }
    }
  }, [state.dataQualify, user])

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
      toast.error('Por favor, selecciona una puntuación.')
      return
    }
    if (!review) {
      toast.error('Por favor, escribe un comentario.')
      return
    }
    if (userHasReviewedProduct) {
      toast.error('Ya has dejado una reseña para este producto.')
      return
    }
    if (hasReviewed) {
      toast.error('Ya has dejado una reseña para esta reserva.')
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
        toast.error('El usuario no puede calificar la reserva')
      }
    } else {
      console.error('Review, rating, productId, and reservationId are required')
      toast.error(
        'Se requiere comentario, puntuación, ID del producto y ID de la reserva'
      )
    }
  }

  if (!user) {
    return null
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
                        className={`w-4 h-4 ${
                          index < review.rating
                            ? 'fill-blue-400'
                            : 'fill-muted stroke-muted-foreground'
                        }`}
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
        {user ? (
          hasReservation ? (
            hasReviewed || userHasReviewedProduct ? (
              <p className='text-sm text-gray-500'>
                Ya has dejado una reseña para esta reserva o producto.
              </p>
            ) : (
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
                  <Button
                    size='sm'
                    onClick={handleSubmitReview}
                    disabled={
                      !hasReservation || hasReviewed || userHasReviewedProduct
                    }
                  >
                    Enviar comentario
                  </Button>
                </div>
              </div>
            )
          ) : (
            <p className='text-sm text-gray-500'>
              Debes tener una reserva para dejar una reseña y calificar este
              producto.
            </p>
          )
        ) : (
          <p className='text-sm text-gray-500'>
            Por favor inicia sesión para dejar una reseña.
          </p>
        )}
      </div>
      <Toaster
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

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '@/context/global.context'
import { useAuthContext } from '@/context/auth.context'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { Calendar } from '@/components/ui/calendar'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { getUserByEmail } from '@/services/userAPI'

const ReservationPage = () => {
  const { itemId } = useParams()
  const navigate = useNavigate()
  const { state, handleGetProductById } = useGlobalContext()
  const { productSelected } = state
  const { logout, handleUpdateUser, getUserInfoFromToken, isAuthenticated } =
    useAuthContext()

  const [user, setUser] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [isReserved, setIsReserved] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', {
        state: { from: `/reservation/${itemId}` },
      })
    } else {
      handleGetProductById(itemId)
      const fetchUser = async () => {
        const userInfo = getUserInfoFromToken()
        if (userInfo && userInfo.email) {
          try {
            const userData = await getUserByEmail(userInfo.email)
            setUser(userData)
          } catch (error) {
            console.error('Error fetching user data:', error)
          }
        }
      }
      fetchUser()
    }
  }, [
    isAuthenticated,
    itemId,
    handleGetProductById,
    navigate,
    getUserInfoFromToken,
  ])

  const handleReservation = () => {
    if (startDate && endDate) {
      setIsReserved(true)
    }
  }

  return (
    <>
      <Header />
      <div className='container mx-auto py-12 mt-20 h-full w-full'>
        {isReserved ? (
          <p className='text-center text-green-500'>Reserva exitosa!</p>
        ) : (
          <>
            <div className='grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6'>
              <div className='grid gap-4 md:gap-10 items-start'>
                <div className='grid gap-4'>
                  <h1 className='font-bold text-3xl'>
                    {productSelected?.name || 'Nombre del Producto'}
                  </h1>
                  <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-0.5'>
                      <span>Disponible para retiro en Oficina Central</span>
                    </div>
                  </div>
                  <div className='grid gap-4'>
                    <div className='grid grid-cols-2 gap-4'>
                      <img
                        src={productSelected?.images?.[0] || '/placeholder.svg'}
                        alt='Imagen 1'
                        width={600}
                        height={400}
                        className='aspect-video object-cover rounded-lg'
                      />
                      <img
                        src={productSelected?.images?.[1] || '/placeholder.svg'}
                        alt='Imagen 2'
                        width={600}
                        height={400}
                        className='aspect-video object-cover rounded-lg'
                      />
                    </div>
                    <div className='grid grid-cols-3 gap-4'>
                      <img
                        src={productSelected?.images?.[2] || '/placeholder.svg'}
                        alt='Imagen 3'
                        width={600}
                        height={400}
                        className='aspect-video object-cover rounded-lg'
                      />
                      <img
                        src={productSelected?.images?.[3] || '/placeholder.svg'}
                        alt='Imagen 4'
                        width={600}
                        height={400}
                        className='aspect-video object-cover rounded-lg'
                      />
                      <img
                        src={productSelected?.images?.[4] || '/placeholder.svg'}
                        alt='Imagen 5'
                        width={600}
                        height={400}
                        className='aspect-video object-cover rounded-lg'
                      />
                    </div>
                  </div>
                  <div className='grid gap-4 text-sm leading-loose'>
                    <p>
                      {productSelected?.description ||
                        'Descripción del Producto'}
                    </p>
                  </div>
                  <div className='grid gap-4'>
                    <p className='text-green-600 dark:text-gray-400 text-l'>
                      Stock Disponible: {productSelected?.stock}
                    </p>
                  </div>
                </div>
              </div>
              <div className='grid gap-6'>
                <Card>
                  <CardHeader>
                    <CardTitle>Resumen de la Reserva</CardTitle>
                  </CardHeader>
                  <CardContent className='grid gap-4'>
                    <div className='grid gap-2'>
                      <Label htmlFor='name' className='text-base'>
                        Nombre
                      </Label>
                      <Input
                        id='name'
                        value={user?.name || ''}
                        placeholder='Nombre de usuario real'
                        disabled
                      />
                    </div>
                    <div className='grid gap-2'>
                      <Label htmlFor='lastname' className='text-base'>
                        Apellido
                      </Label>
                      <Input
                        id='lastname'
                        value={user?.lastname || ''}
                        placeholder='Apellido del usuario'
                        disabled
                      />
                    </div>
                    <div className='grid gap-2'>
                      <Label htmlFor='email' className='text-base'>
                        Correo Electrónico
                      </Label>
                      <Input
                        id='email'
                        type='email'
                        value={user?.email || ''}
                        placeholder='Correo Electrónico'
                        disabled
                      />
                    </div>
                    <div className='grid gap-2'>
                      <Label htmlFor='dates' className='text-base'>
                        Fechas
                      </Label>
                      <div className='flex gap-2'>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant='outline'
                              className='flex-col items-start w-full h-auto'
                            >
                              <span className='font-semibold uppercase text-[0.65rem]'>
                                Fecha de alquiler
                              </span>
                              <span className='font-normal'>4/2/2024</span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className='p-0 max-w-[276px]'>
                            <Calendar />
                          </PopoverContent>
                        </Popover>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant='outline'
                              className='flex-col items-start w-full h-auto'
                            >
                              <span className='font-semibold uppercase text-[0.65rem]'>
                                Fecha devolución
                              </span>
                              <span className='font-normal'>10/2/2024</span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className='p-0 max-w-[276px]'>
                            <Calendar />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <div className='grid gap-2'></div>
                    <div className='grid gap-2'>
                      <Label htmlFor='total' className='text-base'>
                        Total
                      </Label>
                      <div className='text-4xl font-bold'>
                        ${productSelected?.price} / Alquiler
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      size='lg'
                      className='w-full'
                      onClick={handleReservation}
                    >
                      Confirmar Reserva
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  )
}

export default ReservationPage

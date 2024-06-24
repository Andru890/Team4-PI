import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '@/context/global.context'
import { useAuthContext } from '@/context/auth.context'
// import { DateRangePicker } from 'react-dates'
// import 'react-dates/lib/css/_datepicker.css'

const ReservationPage = () => {
  const { itemId } = useParams()
  const navigate = useNavigate()
  const { state, handleGetProductById } = useGlobalContext()
  const { productSelected } = state
  const { isAuthenticated } = useAuthContext()
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [focusedInput, setFocusedInput] = useState(null)
  const [isReserved, setIsReserved] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', {
        state: { from: `/reservation/${itemId}` },
      })
    } else {
      handleGetProductById(itemId)
    }
  }, [isAuthenticated, itemId, handleGetProductById, navigate])

  const handleReservation = () => {
    if (startDate && endDate) {
      // Implementar lógica de reserva aquí
      setIsReserved(true)
    }
  }

  return (
    <div className='container mx-auto py-12'>
      {isReserved ? (
        <p className='text-center text-green-500'>Reserva exitosa!</p>
      ) : (
        <>
          <h1 className='text-3xl font-bold mb-4'>
            Reservar {productSelected?.name}
          </h1>
          {/* <DateRangePicker
            startDate={startDate}
            startDateId='your_unique_start_date_id'
            endDate={endDate}
            endDateId='your_unique_end_date_id'
            onDatesChange={({ startDate, endDate }) => {
              setStartDate(startDate)
              setEndDate(endDate)
            }}
            focusedInput={focusedInput}
            onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
            isOutsideRange={(day) => false} // Aquí deberías implementar la lógica para fechas no disponibles
          /> */}
          <button
            className='mt-8 bg-blue-500 text-white py-2 px-4 rounded'
            onClick={handleReservation}
          >
            Confirmar Reserva
          </button>
        </>
      )}
    </div>
  )
}

export default ReservationPage

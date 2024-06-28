import { useState, useEffect } from 'react'
import { CalendarIcon } from '@radix-ui/react-icons'
import { addDays, format, isBefore, endOfDay } from 'date-fns'
import { es } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { useGlobalContext } from '@/context/global.context'

export default function ItemCalendar({ className, productId }) {
  const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 0),
  })

  const { state, handleGetReservations } = useGlobalContext()
  const [disabledDates, setDisabledDates] = useState([])

  useEffect(() => {
    handleGetReservations()
  }, [handleGetReservations])

  useEffect(() => {
    if (state.reservations) {
      const reservations = state.reservations.filter((reservation) =>
        reservation.products.some((product) => product.id === productId)
      )

      const dates = []
      reservations.forEach((reservation) => {
        const startDate = new Date(reservation.dateIn)
        const endDate = new Date(reservation.dateOut)
        for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
          dates.push(new Date(d))
        }
      })

      setDisabledDates(dates)
    }
  }, [state.reservations, productId])

  const isDisabled = (date) => {
    const result =
      isBefore(date, endOfDay(new Date())) ||
      disabledDates.some(
        (disabledDate) =>
          format(disabledDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      )

    return result
  }

  return (
    <div className={cn('container mx-auto p-4 mt-20', className)}>
      <h2 className='text-2xl font-bold mb-2'>Selecciona un rango de fechas</h2>
      <p className='text-gray-600 mb-4'>
        Por favor elige una fecha de inicio y una fecha de fin para tu
        selección.
      </p>
      <div className={cn('grid gap-2 mt-4 ', className)}>
        <Button
          id='date'
          variant={'outline'}
          className={cn(
            'w-[300px] justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4 ' />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, 'LLL dd, y')} -{' '}
                {format(date.to, 'LLL dd, y')}
              </>
            ) : (
              format(date.from, 'LLL dd, y')
            )
          ) : (
            <span>Selecciona una fecha</span>
          )}
        </Button>

        <Calendar
          className='w-full mt-4 p-4 items-center justify-center flex flex-col'
          locale={es}
          initialFocus
          mode='range'
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
          disabled={isDisabled}
        />
      </div>
    </div>
  )
}

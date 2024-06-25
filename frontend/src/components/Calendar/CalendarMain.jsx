import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { es } from 'date-fns/locale'
import { addDays, format, isBefore, endOfDay, startOfToday } from 'date-fns'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { SearchIcon } from '@/components/Icons'
import { useGlobalContext } from '@/context/global.context'
import { toast } from 'sonner'

const debounce = (func, delay) => {
  let timeoutId
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

const CalendarMain = () => {
  const { state, handleGetReservations } = useGlobalContext()
  const [disabledDates, setDisabledDates] = useState([])
  const { data: products } = state
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [isStartDatePickerOpen, setIsStartDatePickerOpen] = useState(false)
  const [isEndDatePickerOpen, setIsEndDatePickerOpen] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])

  const debouncedSearch = useCallback(
    debounce((term) => {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term)
      )
      setFilteredProducts(filtered.slice(0, 6))
      setShowDropdown(term.length > 0 && filtered.length > 0)
    }, 500),
    [products]
  )

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase()
    setSearchTerm(term)
    debouncedSearch(term)
  }

  const handleProductClick = (productName) => {
    setSearchTerm(productName)
    setShowDropdown(false)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()

    if (!startDate && !endDate) {
      toast.error('Por favor, seleccione las fechas de arriendo y devolución')
      return
    }

    if (!startDate) {
      toast.error('Por favor, seleccione la fecha de arriendo')
      return
    }

    if (!endDate) {
      toast.error('Por favor, seleccione la fecha de devolución')
      return
    }

    if (startDate >= endDate) {
      toast.error(
        'La fecha de devolución debe ser posterior a la fecha de arriendo'
      )
      return
    }

    const product = products.find(
      (product) => product.name.toLowerCase() === searchTerm.toLowerCase()
    )

    if (product) {
      navigate(`/product/${product.id}`)
    } else {
      toast.error('Producto no encontrado')
    }
  }

  const today = startOfToday()

  useEffect(() => {
    handleGetReservations()
  }, [handleGetReservations])

  useEffect(() => {
    if (state.reservations) {
      const reservations = state.reservations.filter((reservation) =>
        reservation.products.some((product) => product.id === products.id)
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
  }, [state.reservations, products.id])

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
    <div className='max-w-4xl mx-auto p-8 bg-white lg:rounded-full md:rounded-lg shadow'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <form
          onSubmit={handleSearchSubmit}
          className='relative flex items-center col-span-1 md:col-span-2 lg:col-span-1'
        >
          <SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400' />
          <Input
            className='w-full bg-white shadow-none appearance-none pl-8 text-gray-500 lg:rounded-full'
            placeholder='Buscar productos...'
            type='search'
            value={searchTerm}
            onChange={handleSearch}
          />
          {showDropdown && (
            <div
              ref={dropdownRef}
              className='absolute z-10 left-0 right-0 top-full mt-2 bg-white shadow-lg rounded-md dark:bg-gray-800 lg:rounded-lg max-h-60 overflow-y-auto'
            >
              {filteredProducts.length > 0 ? (
                <ul>
                  {filteredProducts.map((product) => (
                    <li
                      key={product.id}
                      className='px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
                      onClick={() => handleProductClick(product.name)}
                    >
                      {product.name}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          )}
        </form>
        <Popover open={isStartDatePickerOpen}>
          <PopoverTrigger asChild>
            <Input
              className='text-left text-gray-500 lg:rounded-full'
              placeholder='Fecha de alquiler'
              value={
                startDate
                  ? startDate.toLocaleDateString()
                  : 'Fecha de alquiler...'
              }
              readOnly
              onClick={() => setIsStartDatePickerOpen(true)}
            />
          </PopoverTrigger>
          <PopoverContent className='p-0 max-w-[276px]'>
            <Calendar
              locale={es}
              mode='single'
              onSelect={(date) => {
                if (!isBefore(date, today)) {
                  setStartDate(date)
                  setIsStartDatePickerOpen(false)
                } else {
                  toast.error('No puede seleccionar una fecha anterior a hoy')
                }
              }}
              disabled={isDisabled}
            />
          </PopoverContent>
        </Popover>
        <Popover open={isEndDatePickerOpen}>
          <PopoverTrigger asChild>
            <Input
              className='text-left text-gray-500 lg:rounded-full'
              value={
                endDate
                  ? endDate.toLocaleDateString()
                  : 'Fecha de devolución...'
              }
              placeholder='Fecha de devolución'
              readOnly
              onClick={() => setIsEndDatePickerOpen(true)}
            />
          </PopoverTrigger>
          <PopoverContent className='p-0 max-w-[276px]'>
            <Calendar
              locale={es}
              mode='single'
              onSelect={(date) => {
                if (!isBefore(date, today)) {
                  setEndDate(date)
                  setIsEndDatePickerOpen(false)
                } else {
                  toast.error('No puede seleccionar una fecha anterior a hoy')
                }
              }}
              disabled={isDisabled}
            />
          </PopoverContent>
        </Popover>
        <Button
          type='submit'
          className='text-white lg:rounded-full col-span-1 md:col-span-2 lg:col-span-1'
          onClick={handleSearchSubmit}
        >
          Buscar
        </Button>
      </div>
    </div>
  )
}

export default CalendarMain

import { useState } from 'react'
import { es } from 'date-fns/locale'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'

const CalendarMain = () => {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isStartDatePickerOpen, setIsStartDatePickerOpen] = useState(false)
  const [isEndDatePickerOpen, setIsEndDatePickerOpen] = useState(false)
  return (
    <div className='max-w-4xl mx-auto p-8 bg-white rounded-full shadow'>
      <div className='grid grid-cols-4 gap-4'>
        <Input
          className='rounded-full'
          type='search'
          placeholder='Buscar producto...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Popover open={isStartDatePickerOpen}>
          <PopoverTrigger asChild>
            <Input
              className='text-left text-gray-500 rounded-full'
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
                setStartDate(date)
                setIsStartDatePickerOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
        <Popover open={isEndDatePickerOpen}>
          <PopoverTrigger asChild>
            <Input
              className='text-left text-gray-500 rounded-full'
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
                setEndDate(date)
                setIsEndDatePickerOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
        <Button className=' text-white rounded-full'>Buscar</Button>
      </div>
    </div>
  )
}

export default CalendarMain

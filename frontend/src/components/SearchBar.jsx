import { Input } from '@/components/ui/input'
import { SearchIcon } from '@/components/Icons'

const SearchBar = () => {
  return (
    <section className='mt-24 w-full bg-gray-100 py-8 dark:bg-gray-800'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='flex items-center justify-center'>
          <div className='w-full max-w-md'>
            <SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400' />
            <Input
              className='w-full rounded-md border bg-white  border-gray-300 px-4 py-2 focus:border-gray-500 focus:outline-none dark:border-gray-600 dark:bg-gray-950 dark:text-gray-50'
              placeholder='Buscar...'
              type='search'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default SearchBar

const useLoader = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex items-center justify-center space-x-2'>
        <div className='w-6 h-6 rounded-full bg-gray-900 dark:bg-gray-50 animate-bounce' />
        <div className='w-6 h-6 rounded-full bg-gray-900 dark:bg-gray-50 animate-bounce delay-100' />
        <div className='w-6 h-6 rounded-full bg-gray-900 dark:bg-gray-50 animate-bounce delay-200' />
      </div>
    </div>
  )
}

export default useLoader

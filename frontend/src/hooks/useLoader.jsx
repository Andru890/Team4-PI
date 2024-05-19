const useLoader = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='loader'>
        <span className='loader-dot'></span>
        <span className='loader-dot'></span>
        <span className='loader-dot'></span>
        <span className='loader-dot'></span>
      </div>
    </div>
  )
}

export default useLoader

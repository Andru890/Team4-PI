import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <>
      <Link to='/'>
        <div className='flex items-center gap-2'>
          <img
            src='https://res.cloudinary.com/wilsondelcanto-dev/image/upload/v1717985268/xprasaudvxzaamytncli.png'
            alt=''
            height={120}
            width={120}
          />
          <span className='text-3xl text-primary font-semibold'>
            VisualStudio Service
          </span>
        </div>
      </Link>
    </>
  )
}

export default Logo

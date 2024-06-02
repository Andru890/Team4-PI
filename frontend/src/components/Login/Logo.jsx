import { CameraLogo } from '@/components/Icons'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <>
      <Link to='/' className='flex items-center gap-2'>
        <div className='flex items-center gap-2'>
          <CameraLogo className='h-8 w-8' />
          <span className='text-xl text-primary font-semibold'>
            VisualStudio Service
          </span>
        </div>
      </Link>
    </>
  )
}

export default Logo

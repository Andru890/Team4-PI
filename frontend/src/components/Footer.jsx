import {
  TwitterIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  CameraIcon,
} from '@/components/Icons'
const Footer = () => {
  return (
    <footer className='bg-gray-100 p-6 md:py-12 w-full dark:bg-gray-800'>
      <div className='container max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-center'>
        <div className='flex items-center justify-start gap-2'>
          <div className='flex items-center gap-2'>
            <CameraIcon className='h-6 w-6' />
            <span className='text-lg text-primary font-semibold'>
              VisualStudio Service
            </span>
          </div>
        </div>

        <p className='text-sm text-center text-gray-500 dark:text-gray-400'>
          © 2024 Copyright: visualstudioservice.com
        </p>
        <div className='flex items-center justify-end gap-2'>
          <a href='#' rel='noopener noreferrer' target='_blank'>
            <TwitterIcon className='h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50' />
          </a>
          <a href='#' rel='noopener noreferrer' target='_blank'>
            <FacebookIcon className='h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50' />
          </a>
          <a href='#' rel='noopener noreferrer' target='_blank'>
            <InstagramIcon className='h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50' />
          </a>
          <a href='#' rel='noopener noreferrer' target='_blank'>
            <LinkedinIcon className='h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50' />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

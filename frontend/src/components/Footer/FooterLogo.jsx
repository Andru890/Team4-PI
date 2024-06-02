import { CameraLogo } from '@/components/Icons'

const FooterLogo = () => (
  <div className='flex items-center justify-start gap-2'>
    <div className='flex items-center gap-2'>
      <CameraLogo className='h-6 w-6' />
      <span className='text-lg text-primary font-semibold'>
        VisualStudio Service
      </span>
    </div>
  </div>
)

export default FooterLogo

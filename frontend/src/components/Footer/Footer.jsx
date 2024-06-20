import {
  TwitterIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from '@/components/Icons'
import SocialIcon from '@/components/Footer/SocialIcon'
import FooterLogo from '@/components/Footer/FooterLogo'
import Copyright from '@/components/Footer/Copyright'

const Footer = () => {
  return (
    <footer className='bg-primary-foreground p-6 md:py-12 w-full dark:bg-gray-800'>
      <div className='container max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-center'>
        <FooterLogo />
        <Copyright />
        <div className='flex items-center justify-end gap-2'>
          <SocialIcon IconComponent={TwitterIcon} href='https://twitter.com' />
          <SocialIcon
            IconComponent={FacebookIcon}
            href='https://facebook.com'
          />
          <SocialIcon
            IconComponent={InstagramIcon}
            href='https://www.instagram.com'
          />
          <SocialIcon
            IconComponent={LinkedinIcon}
            href='https://www.linkedin.com'
          />
        </div>
      </div>
    </footer>
  )
}

export default Footer

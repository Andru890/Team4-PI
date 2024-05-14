import { Link } from 'react-router-dom'
const SocialIcon = ({ IconComponent, href }) => (
  <Link to={href} rel='noopener noreferrer' target='_blank'>
    <IconComponent className='h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50' />
  </Link>
)

export default SocialIcon

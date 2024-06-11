import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <>
      <Link to='/'>
        <div className='flex items-center gap-2'>
          <img
            src='/logoimg2.png'
            alt='logotipo de la empresa que representa la imagen'
            height={100}
            width={90}
          />
          <img
            src='/isotipo2.png'
            alt='isotipo de la empresa que representa el nombre'
            height={100}
            width={180}
          />
        </div>
      </Link>
    </>
  )
}

export default Logo

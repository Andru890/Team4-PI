import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  XIcon,
  LinkedinIcon,
  WhatsappIcon,
} from 'react-share'

const ItemShare = ({ product }) => {
  const shareUrl = window.location.href
  const shareImage = product.images[0] ? product.images[0] : '/placeholder.svg'
  const shareDescription = product.description
  return (
    <div className='flex items-center gap-4'>
      <FacebookShareButton
        url={shareUrl}
        quote={`¡No te pierdas este increíble producto! ${product.name}  😍✨ ${shareDescription}`}
        hashtag='#AlquilaAhora #Ofertas'
        description={shareDescription}
        media={shareImage}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton
        url={shareUrl}
        title={`¡No te pierdas este increíble producto! ${product.name} 😍✨ ${shareDescription}`}
        hashtags={['AlquilaAhora', 'Ofertas']}
        description={shareDescription}
        media={shareImage}
      >
        <XIcon size={32} round />
      </TwitterShareButton>
      <LinkedinShareButton
        url={shareUrl}
        title={`¡No te pierdas este increíble producto! ${product.name} 😍✨ ${shareDescription}`}
        summary='Descubre nuestras ofertas y productos destacados en nuestra tienda en línea.'
        source='TuTiendaOnline'
        description={shareDescription}
        media={shareImage}
      >
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <WhatsappShareButton
        url={shareUrl}
        title={`¡No te pierdas este increíble producto! ${product.name} 😍✨ ${shareDescription}`}
        separator=' - '
        description={shareDescription}
        media={shareImage}
      >
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
    </div>
  )
}

export default ItemShare

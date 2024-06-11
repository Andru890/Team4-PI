const FooterLogo = () => (
  <div className='flex items-center justify-start gap-2'>
    <div className='flex items-center gap-2'>
      <img
        src='/logoimg.png'
        alt='logotipo de la empresa que representa la imagen'
        height={100}
        width={90}
      />
      <img
        src='/isotipo.png'
        alt='isotipo de la empresa que representa el nombre'
        height={100}
        width={120}
      />
    </div>
  </div>
)

export default FooterLogo

const Videos = () => {
  const videos = [
    'https://assets.mixkit.co/videos/preview/mixkit-close-shot-on-a-dslr-camera-44076-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-equipment-for-video-and-photography-in-a-close-shot-44061-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-photographer-adjusting-his-camera-before-a-photo-shoot-44060-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-close-shot-photographic-equipment-44051-large.mp4',
  ]

  // recorrer arrays de videos
  const randomVideo = videos[Math.floor(Math.random() * videos.length)]

  return (
    <div className='relative h-screen'>
      <video autoPlay muted loop className='h-full w-full object-cover'>
        <source src={randomVideo} type='video/webm' />
      </video>
      <div className='absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-60'></div>
    </div>
  )
}

export default Videos

const Videos = () => {
  const videos = [
    'https://assets.mixkit.co/videos/preview/mixkit-close-shot-on-a-dslr-camera-44076-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-equipment-for-video-and-photography-in-a-close-shot-44061-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-photographer-adjusting-his-camera-before-a-photo-shoot-44060-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-close-shot-photographic-equipment-44051-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-vlogger-recording-with-his-camera-41269-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-view-of-a-camera-lens-held-by-a-photographer-50635-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-professional-photographer-taking-a-picture-of-48628-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-professional-camera-lens-46351-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-photographer-in-nature-2482-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-camera-lens-in-motion-2379-large.mp4',
  ]

  // recorrer arrays de videos
  const randomVideo = videos[Math.floor(Math.random() * videos.length)]

  return (
    <div className='relative h-full'>
      <video autoPlay muted loop className='h-full w-full object-cover'>
        <source src={randomVideo} type='video/webm' />
      </video>
      <div className='absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-70'></div>
    </div>
  )
}

export default Videos

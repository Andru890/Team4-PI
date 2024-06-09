import { useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'

const useCloudinary = () => {
  const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUD_PRESET
  const [isUploading, setIsUploading] = useState(false)

  const uploadImage = async (imageFile) => {
    if (!imageFile) return ''

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', imageFile)
      formData.append('upload_preset', UPLOAD_PRESET)
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      )
      return res.data.secure_url
    } catch (error) {
      console.error(error)
      toast.error('Error al subir la imagen')
      return ''
    } finally {
      setIsUploading(false)
    }
  }

  return { uploadImage, isUploading }
}

export default useCloudinary

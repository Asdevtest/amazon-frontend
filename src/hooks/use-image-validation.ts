import { useEffect, useState } from 'react'

export const useImageValidation = (file: string) => {
  const [isValidImage, setIsValidImage] = useState(true)

  useEffect(() => {
    const image = new Image()
    image.src = file

    image.onload = () => {
      setIsValidImage(true)
    }

    image.onerror = () => {
      setIsValidImage(false)
    }

    return () => {
      image.onload = null
      image.onerror = null
    }
  }, [file])

  return isValidImage ? file : '/assets/img/no-photo.jpg'
}

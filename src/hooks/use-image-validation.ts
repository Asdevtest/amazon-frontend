import { useEffect, useState } from 'react'

import { checkIsImageLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { validateImage } from '@utils/validate-image'

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

  return isValidImage ? file : '/assets/img/defaultImage.png'
}

export const useImagesValidation = (files: string[]) => {
  const [items, setItems] = useState<string[]>([])

  useEffect(() => {
    const fetchUrls = async () => {
      const urls = await Promise.all(
        files.map(async file => {
          const generateUrl = getAmazonImageUrl(file, true)

          if (!checkIsImageLink(file)) {
            return generateUrl
          }

          const isValid = await validateImage(generateUrl)

          return isValid ? generateUrl : '/assets/img/defaultImage.png'
        }),
      )
      setItems(urls)
    }

    fetchUrls()
  }, [files])

  return items
}

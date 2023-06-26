import { useState, ChangeEvent, SyntheticEvent } from 'react'

export const useAddPaymentMethodIcon = () => {
  const [imageUrl, setImageUrl] = useState<string>('')
  const [imageName, setImageName] = useState<string>('')

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    const reader = new FileReader()

    if (file) {
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e?.target && e?.target?.result) {
          setImageUrl(e.target.result.toString())
          setImageName(file.name)
        }
      }

      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = (event: SyntheticEvent) => {
    event.preventDefault()

    setImageUrl('')
    setImageName('')
  }

  return { imageUrl, imageName, onImageUpload: handleImageUpload, onRemoveImage: handleRemoveImage }
}

import { FC, memo } from 'react'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { useStyles } from './chat-info-photos.style'

interface ChatInfoPhotosProps {
  photos?: string[]
  onClickOpenPreview: (photoIndex: number) => void
}

export const ChatInfoPhotos: FC<ChatInfoPhotosProps> = memo(props => {
  const { photos, onClickOpenPreview } = props

  const { classes: styles } = useStyles()

  return (
    <>
      {photos?.map((photo, photoIndex) => (
        <img
          key={photo}
          className={styles.image}
          src={getAmazonImageUrl(photo, true)}
          loading="lazy"
          onError={e => ((e.target as HTMLImageElement).src = '/assets/img/no-photo.jpg')}
          onClick={() => onClickOpenPreview(photoIndex)}
        />
      ))}
    </>
  )
})

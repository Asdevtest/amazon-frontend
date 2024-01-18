import { FC, useState } from 'react'

import { Box } from '@mui/material'

import { useStyles } from '@components/chat/chat/chat-messages-list/chat-messages/images-tile/images-tile.style'
import { ImageModal } from '@components/modals/image-modal/image-modal'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

interface ImagesTileProps {
  images: string[]
}

export const ImagesTile: FC<ImagesTileProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isShowImagePreview, setIsShowImagePreview] = useState(false)

  const { classes: styles, cx } = useStyles()

  const handlePreview = (index: number) => {
    setSelectedImage(index)
    setIsShowImagePreview(true)
  }

  return (
    <>
      <Box
        className={cx(styles.root, styles[`imageTile${images.length > 6 ? 6 : images.length}` as keyof typeof styles])}
      >
        {images.slice(0, 6).map((el, index) => (
          <Box key={index} onClick={() => handlePreview(index)}>
            <img className={styles.image} src={getAmazonImageUrl(el, true)} alt={index.toString()} loading="lazy" />
          </Box>
        ))}

        {images.length > 6 && (
          <button className={styles.overlay} onClick={() => handlePreview(5)}>
            <p>+{images.length - 6}</p>
          </button>
        )}
      </Box>

      {isShowImagePreview && (
        <ImageModal
          showPreviews
          isOpenModal={isShowImagePreview}
          handleOpenModal={() => setIsShowImagePreview(prevState => !prevState)}
          files={images}
          currentFileIndex={selectedImage}
          handleCurrentFileIndex={setSelectedImage}
        />
      )}
    </>
  )
}

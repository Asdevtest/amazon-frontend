import { cx } from '@emotion/css'
import { Box } from '@mui/material'

import React, { FC, useState } from 'react'

import { useClassNames } from '@components/chat/chat/chat-messages-list/chat-messages/images-tile/images-tile.styles'
import { BigImagesModal } from '@components/modals/big-images-modal'

interface ImagesTileProps {
  images: string[]
  controls?: (imageIndex?: number, image?: string) => React.ReactNode
}

export const ImagesTile: FC<ImagesTileProps> = props => {
  const { images, controls } = props
  const [selectedImage, setSelectedImage] = useState(0)
  const [isShowImagePreview, setIsShowImagePreview] = useState(false)

  const { classes: styles } = useClassNames()

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
            <img className={styles.image} src={el} srcSet={el} alt={index.toString()} loading="lazy" />
          </Box>
        ))}

        {images.length > 6 && (
          <button className={styles.overlay} onClick={() => handlePreview(5)}>
            <p>+{images.length - 6}</p>
          </button>
        )}
      </Box>

      <BigImagesModal
        showPreviews
        openModal={isShowImagePreview}
        setOpenModal={() => setIsShowImagePreview(prevState => !prevState)}
        images={images}
        imgIndex={selectedImage}
        setImageIndex={setSelectedImage}
        controls={controls}
      />
    </>
  )
}

import { FC, useState } from 'react'

import { ImageModal } from '@components/modals/image-modal/image-modal'
import { VideoPreloader } from '@components/shared/video-player/video-preloader'

import { checkIsVideoLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { useStyles } from './images-tile.style'

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
      <div
        className={cx(styles.root, styles[`imageTile${images.length > 6 ? 6 : images.length}` as keyof typeof styles])}
      >
        {images.slice(0, 6).map((el, index) => (
          <div key={index} className={styles.imageWrapper} onClick={() => handlePreview(index)}>
            {checkIsVideoLink(el) ? (
              <VideoPreloader wrapperClassName={styles.image} videoSource={getAmazonImageUrl(el)} />
            ) : (
              <img className={styles.image} src={getAmazonImageUrl(el, true)} alt={index.toString()} loading="lazy" />
            )}
          </div>
        ))}

        {images.length > 6 && (
          <button className={styles.overlay} onClick={() => handlePreview(5)}>
            <p>+{images.length - 6}</p>
          </button>
        )}
      </div>

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

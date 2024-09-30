import { FC, memo, useRef, useState } from 'react'

import { SlideshowGalleryModal } from '@components/modals/slideshow-gallery-modal'
import { VideoPreloader } from '@components/shared/video-preloader'

import { checkIsVideoLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { useStyles } from './media-files.style'

interface MediaFilesProps {
  mediaFiles: string[]
}

export const MediaFiles: FC<MediaFilesProps> = memo(({ mediaFiles }) => {
  const { classes: styles, cx } = useStyles()

  const [isShowImagePreview, setIsShowImagePreview] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<number>(0)

  const handlePreview = (index: number) => {
    setSelectedImage(index)
    setIsShowImagePreview(true)
  }

  return (
    <>
      <div
        className={cx(
          styles.root,
          styles[`imageTile${mediaFiles.length > 6 ? 6 : mediaFiles.length}` as keyof typeof styles],
        )}
      >
        {mediaFiles.slice(0, 6).map((el, index) => (
          <div key={index} className={styles.imageWrapper} onClick={() => handlePreview(index)}>
            {checkIsVideoLink(el) ? (
              <VideoPreloader wrapperClassName={styles.image} videoSource={getAmazonImageUrl(el)} />
            ) : (
              <img
                className={styles.image}
                src={getAmazonImageUrl(el, true)}
                alt={index.toString()}
                loading="lazy"
                onError={e => ((e.target as HTMLImageElement).src = '/assets/img/no-photo.jpg')}
              />
            )}
          </div>
        ))}

        {mediaFiles.length > 6 && (
          <button className={styles.overlay} onClick={() => handlePreview(5)}>
            <p>+{mediaFiles.length - 6}</p>
          </button>
        )}
      </div>

      {isShowImagePreview ? (
        <SlideshowGalleryModal
          openModal={isShowImagePreview}
          files={mediaFiles}
          currentFileIndex={selectedImage as unknown as number}
          onOpenModal={() => setIsShowImagePreview(!isShowImagePreview)}
          onCurrentFileIndex={setSelectedImage}
        />
      ) : null}
    </>
  )
})

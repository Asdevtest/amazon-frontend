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
  if (mediaFiles.length === 0) {
    return null
  }

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
          styles[`wrapperSize${mediaFiles.length >= 6 ? 6 : mediaFiles.length}` as keyof typeof styles],
        )}
      >
        {mediaFiles.slice(0, 6).map((el, index) => {
          if (checkIsVideoLink(el)) {
            return <VideoPreloader key={index} wrapperClassName={styles.image} videoSource={getAmazonImageUrl(el)} />
          } else {
            return (
              <img
                key={index}
                className={styles.image}
                src={getAmazonImageUrl(el, true)}
                alt={index.toString()}
                loading="lazy"
                onError={e => ((e.target as HTMLImageElement).src = '/assets/img/no-photo.jpg')}
              />
            )
          }
        })}

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
          currentFileIndex={selectedImage}
          onOpenModal={() => setIsShowImagePreview(!isShowImagePreview)}
          onCurrentFileIndex={setSelectedImage}
        />
      ) : null}
    </>
  )
})

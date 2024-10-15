import { FC, memo, useCallback, useState } from 'react'

import { SlideshowGalleryModal } from '@components/modals/slideshow-gallery-modal'
import { CustomButton } from '@components/shared/custom-button'
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

  const onClickOpenPreview = useCallback((index: number) => {
    setSelectedImage(index)
    setIsShowImagePreview(true)
  }, [])

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
            return (
              <VideoPreloader
                key={index}
                videoSource={getAmazonImageUrl(el)}
                onClick={() => onClickOpenPreview(index)}
              />
            )
          } else {
            return (
              <img
                key={index}
                src={getAmazonImageUrl(el, true)}
                loading="lazy"
                onError={e => ((e.target as HTMLImageElement).src = '/assets/img/no-photo.jpg')}
                onClick={() => onClickOpenPreview(index)}
              />
            )
          }
        })}

        {mediaFiles.length > 6 ? (
          <CustomButton className={styles.overlay} onClick={() => onClickOpenPreview(5)}>
            <p>{`+${mediaFiles.length - 6}`}</p>
          </CustomButton>
        ) : null}
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

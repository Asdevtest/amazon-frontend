import { FC, memo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { SlideshowGalleryModal } from '@components/modals/slideshow-gallery-modal'
import { VideoPreloader } from '@components/shared/video-preloader'

import { checkIsVideoLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { isString } from '@typings/guards'
import { UploadFileType } from '@typings/shared/upload-file'

import { useStyles } from './media-files-tab.style'

interface MediaFilesTabProps {
  slides: UploadFileType[]
  isTransitioning: boolean
}

export const MediaFilesTab: FC<MediaFilesTabProps> = memo(({ slides, isTransitioning }) => {
  const { classes: styles, cx } = useStyles()

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [showImageModal, setShowImageModal] = useState(false)
  const handleChangeCurrentSlideIndex = (slideIndex: number) => {
    setCurrentSlideIndex(slideIndex)
    setShowImageModal(!showImageModal)
  }

  return (
    <>
      <div className={cx(styles.slides, { [styles.slidesTransition]: isTransitioning })}>
        {slides.length > 0 ? (
          slides.map((slide, index) => {
            const currentVideoSlide = getAmazonImageUrl(slide)
            const currentImageSlide = isString(slide) ? getAmazonImageUrl(slide, false) : slide?.data_url

            return (
              <div key={index} className={styles.slide} onClick={() => handleChangeCurrentSlideIndex(index)}>
                {checkIsVideoLink(slide) ? (
                  <VideoPreloader videoSource={currentVideoSlide} />
                ) : (
                  <img src={currentImageSlide} alt={`Slide-${index + 1}`} className={styles.image} />
                )}
              </div>
            )
          })
        ) : (
          <p className={styles.noPhotos}>{t(TranslationKey['No photos'])}</p>
        )}
      </div>

      {showImageModal ? (
        <SlideshowGalleryModal
          files={slides}
          currentFileIndex={currentSlideIndex}
          openModal={showImageModal}
          onOpenModal={() => setShowImageModal(!showImageModal)}
          onCurrentFileIndex={setCurrentSlideIndex}
        />
      ) : null}
    </>
  )
})

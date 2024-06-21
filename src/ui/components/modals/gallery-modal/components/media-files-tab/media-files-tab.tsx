import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { SlideshowGalleryModal } from '@components/modals/slideshow-gallery-modal'
import { VideoPreloader } from '@components/shared/video-preloader'

import { checkIsVideoLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { isString } from '@typings/guards'
import { UploadFileType } from '@typings/shared/upload-file'

import { useStyles } from './media-files-tab.style'

import { Arrows } from '../arrows'

import { useMediaFilesTab } from './use-media-files-tab'

interface MediaFilesTabProps {
  slides: UploadFileType[]
}

export const MediaFilesTab: FC<MediaFilesTabProps> = memo(({ slides }) => {
  const { classes: styles, cx } = useStyles()

  const {
    currentPage,
    currentSlideIndex,
    showImageModal,
    isTransitioning,
    totalSlides,
    setShowImageModal,
    setIsTransitioning,
    setCurrentSlideIndex,
    checkIsFileOnCurrentPage,
    onChangePage,
    onToggleImageModal,
  } = useMediaFilesTab(slides)

  return (
    <>
      <div className={cx(styles.slides, { [styles.slidesTransition]: isTransitioning })}>
        {slides.length > 0 ? (
          slides.map((slide, index) => {
            const currentlide = isString(slide) ? getAmazonImageUrl(slide, false) : slide?.data_url

            return (
              <div
                key={index}
                className={cx(styles.slide, { [styles.showSlide]: checkIsFileOnCurrentPage(index) })}
                onClick={() => onToggleImageModal(index)}
              >
                {checkIsVideoLink(slide) ? (
                  <VideoPreloader videoSource={currentlide} />
                ) : (
                  <img src={currentlide} alt={`Slide-${index + 1}`} className={styles.image} />
                )}
              </div>
            )
          })
        ) : (
          <p className={styles.noPhotos}>{t(TranslationKey['No photos'])}</p>
        )}
      </div>

      <Arrows
        currentPage={currentPage}
        pageСount={totalSlides}
        isTransitioning={isTransitioning}
        setIsTransitioning={setIsTransitioning}
        onChangePage={onChangePage}
      />

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

import { FC, memo } from 'react'

import { ImageModal } from '@components/modals/image-modal/image-modal'

import { IUploadFile } from '@typings/upload-file'

import { useStyles } from './slideshow-gallery.style'

import { EmptyFile, MainSlide, Previews } from './components'
import { DEFAULT_QUANTITY_SLIDES, MIN_FILES_IN_ARRAY, NOT_GAP } from './slideshow-gallery.constants'
import { useSlideshowGallery } from './use-slideshow-gallery'

interface SlideshowGalleryProps {
  files: Array<string | IUploadFile>
  slidesToShow?: number
  hiddenPreviews?: boolean
  leftPreviews?: boolean
  customGapBetweenSlideAndPreviews?: number

  isEditable?: boolean
  withoutMakeMainImage?: boolean
  onChangeImagesForLoad?: (array: Array<string | IUploadFile>) => void
}

export const SlideshowGallery: FC<SlideshowGalleryProps> = memo(props => {
  const {
    files,
    slidesToShow = DEFAULT_QUANTITY_SLIDES,
    hiddenPreviews = false,
    leftPreviews = false,
    customGapBetweenSlideAndPreviews = NOT_GAP,

    isEditable = false,
    withoutMakeMainImage = false,
    onChangeImagesForLoad,
  } = props

  if (slidesToShow <= 0) {
    throw Error('The specified number of slides to show in the SlideshowGallery component must be a positive integer.')
  }

  const { classes: styles, cx } = useStyles()

  const {
    mediaFiles,
    currentMediaFileIndex,
    setCurrentMediaFileIndex,

    isTransitioning,
    setIsTransitioning,

    openImageModal,
    onOpenImageModal,
  } = useSlideshowGallery(files)

  const isOneSlide = slidesToShow === MIN_FILES_IN_ARRAY || mediaFiles.length === MIN_FILES_IN_ARRAY
  const isMediaFilesVisible = mediaFiles.length !== 0 && slidesToShow > 0

  return (
    <>
      {isMediaFilesVisible ? (
        <div
          className={cx(styles.wrapper, { [styles.leftPreviews]: leftPreviews })}
          style={{ gap: customGapBetweenSlideAndPreviews }}
        >
          <MainSlide
            slidesToShow={slidesToShow}
            mediaFiles={mediaFiles}
            currentMediaFileIndex={currentMediaFileIndex}
            isTransitioning={isTransitioning}
            onOpenImageModal={onOpenImageModal}
          />

          <Previews
            hiddenPreviews={hiddenPreviews || isOneSlide}
            slidesToShow={slidesToShow}
            mediaFiles={mediaFiles}
            currentMediaFileIndex={currentMediaFileIndex}
            setCurrentMediaFileIndex={setCurrentMediaFileIndex}
            isTransitioning={isTransitioning}
            setIsTransitioning={setIsTransitioning}
          />
        </div>
      ) : (
        <EmptyFile slidesToShow={slidesToShow} />
      )}

      {openImageModal && (
        <ImageModal
          isRequestResult
          showPreviews
          files={mediaFiles}
          currentFileIndex={currentMediaFileIndex}
          handleCurrentFileIndex={setCurrentMediaFileIndex}
          isOpenModal={openImageModal}
          handleOpenModal={onOpenImageModal}
          isEditable={isEditable}
          withoutMakeMainImage={withoutMakeMainImage}
          onChangeImagesForLoad={onChangeImagesForLoad}
        />
      )}
    </>
  )
})

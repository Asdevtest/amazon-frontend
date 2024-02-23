import { FC, memo } from 'react'

import { SlideshowGalleryModal } from '@components/modals/slideshow-gallery-modal'

import { IRequestMedia } from '@typings/models/requests/request-media'
import { UploadFileType } from '@typings/shared/upload-file'

import { Gallery } from './components'
import { DEFAULT_QUANTITY_SLIDES } from './slideshow-gallery.constants'
import { useSlideshowGallery } from './use-slideshow-gallery'

interface SlideshowGalleryProps {
  files: IRequestMedia[] | UploadFileType[]
  slidesToShow?: number
  hiddenPreviews?: boolean
  leftPreviews?: boolean
  customGapBetweenSlideAndPreviews?: number
  isEditable?: boolean
  withoutMakeMainImage?: boolean
  onChangeImagesForLoad?: (files: IRequestMedia[] | UploadFileType[]) => void
}

export const SlideshowGallery: FC<SlideshowGalleryProps> = memo(props => {
  const {
    files,
    slidesToShow = DEFAULT_QUANTITY_SLIDES,
    hiddenPreviews = false,
    leftPreviews = false,
    customGapBetweenSlideAndPreviews,
    isEditable = false,
    withoutMakeMainImage = false,
    onChangeImagesForLoad,
  } = props

  if (slidesToShow && slidesToShow <= 0) {
    throw Error('The specified number of slides to show in the SlideshowGallery component must be a positive integer.')
  }

  const {
    mediaFiles,
    currentMediaFileIndex,
    setCurrentMediaFileIndex,

    isTransitioning,
    setIsTransitioning,

    openImageModal,
    onOpenImageModal,
  } = useSlideshowGallery(files)

  return (
    <>
      <Gallery
        hiddenPreviews={hiddenPreviews}
        leftPreviews={leftPreviews}
        customGapBetweenSlideAndPreviews={customGapBetweenSlideAndPreviews}
        slidesToShow={slidesToShow}
        mediaFiles={mediaFiles}
        currentMediaFileIndex={currentMediaFileIndex}
        isTransitioning={isTransitioning}
        setCurrentMediaFileIndex={setCurrentMediaFileIndex}
        setIsTransitioning={setIsTransitioning}
        onOpenImageModal={onOpenImageModal}
      />

      {openImageModal && (
        <SlideshowGalleryModal
          isEditable={isEditable}
          withoutMakeMainImage={withoutMakeMainImage}
          files={files}
          currentFileIndex={currentMediaFileIndex}
          isOpenModal={openImageModal}
          onCurrentFileIndex={setCurrentMediaFileIndex}
          onOpenModal={onOpenImageModal}
          onChangeImagesForLoad={onChangeImagesForLoad}
        />
      )}
    </>
  )
})

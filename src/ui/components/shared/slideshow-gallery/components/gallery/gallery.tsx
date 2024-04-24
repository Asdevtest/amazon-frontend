import { Dispatch, FC, SetStateAction, memo } from 'react'

import { UploadFileType } from '@typings/shared/upload-file'

import { useStyles } from './gallery.style'

import { DEFAULT_QUANTITY_SLIDES, MIN_FILES_IN_ARRAY } from '../../slideshow-gallery.constants'
import { EmptyFile } from '../empty-file'
import { MainSlide } from '../main-slide'
import { Previews } from '../previews'

interface GalleryProps {
  mediaFiles: UploadFileType[]
  currentMediaFileIndex: number
  isTransitioning: boolean
  setCurrentMediaFileIndex: Dispatch<SetStateAction<number>>
  setIsTransitioning: Dispatch<SetStateAction<boolean>>
  onOpenImageModal: () => void
  slidesToShow?: number
  isModalSize?: boolean
  hiddenPreviews?: boolean
  leftPreviews?: boolean
  customGapBetweenSlideAndPreviews?: number
}

export const Gallery: FC<GalleryProps> = memo(props => {
  const {
    mediaFiles,
    currentMediaFileIndex,
    isTransitioning,
    setCurrentMediaFileIndex,
    setIsTransitioning,
    onOpenImageModal,
    slidesToShow = DEFAULT_QUANTITY_SLIDES,
    isModalSize,
    hiddenPreviews,
    leftPreviews,
    customGapBetweenSlideAndPreviews,
  } = props
  const { classes: styles, cx } = useStyles()

  const isOneSlide = slidesToShow === MIN_FILES_IN_ARRAY || mediaFiles.length === MIN_FILES_IN_ARRAY
  const isMediaFilesVisible = mediaFiles.length !== 0 && slidesToShow > 0

  return isMediaFilesVisible ? (
    <div
      className={cx(styles.wrapper, { [styles.leftPreviews]: leftPreviews })}
      style={{ gap: customGapBetweenSlideAndPreviews }}
    >
      <MainSlide
        isModalSize={isModalSize}
        slidesToShow={slidesToShow}
        mediaFile={mediaFiles[currentMediaFileIndex]}
        currentMediaFileIndex={currentMediaFileIndex}
        isTransitioning={isTransitioning}
        onOpenImageModal={onOpenImageModal}
      />

      <Previews
        isModalSize={isModalSize}
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
    <EmptyFile slidesToShow={slidesToShow} isModalSize={isModalSize} />
  )
})

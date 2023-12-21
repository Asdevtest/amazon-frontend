import { FC, memo } from 'react'

import { IUploadFile } from '@typings/upload-file'

import { useStyles } from './slideshow-gallery.style'

import { MainSlide } from './main-slide'
import { Previews } from './previews'
import { useSlideshowGallery } from './use-slideshow-gallery'

interface SlideshowGalleryProps {
  files: Array<string | IUploadFile>
  slidesToShow?: number
  showPreviews?: boolean
  leftPreviews?: boolean
}

export const SlideshowGallery: FC<SlideshowGalleryProps> = memo(props => {
  const { files, slidesToShow = 4, showPreviews = false, leftPreviews = false } = props

  const { classes: styles, cx } = useStyles()

  const {
    mediaFiles,
    currentMediaFileIndex,
    setCurrentMediaFileIndex,

    isTransitioning,
    setIsTransitioning,
  } = useSlideshowGallery(files)

  return (
    <div className={cx(styles.wrapper, { [styles.reverse]: leftPreviews })}>
      <MainSlide
        mediaFiles={mediaFiles}
        currentMediaFileIndex={currentMediaFileIndex}
        isTransitioning={isTransitioning}
      />

      <Previews
        showPreviews={showPreviews}
        slidesToShow={slidesToShow}
        mediaFiles={mediaFiles}
        currentMediaFileIndex={currentMediaFileIndex}
        setCurrentMediaFileIndex={setCurrentMediaFileIndex}
        isTransitioning={isTransitioning}
        setIsTransitioning={setIsTransitioning}
      />
    </div>
  )
})

import { Dispatch, FC, SetStateAction, memo } from 'react'
import Lightbox from 'react-18-image-lightbox'
import 'react-18-image-lightbox/style.css'

import { MIN_FILES_IN_ARRAY } from '@components/shared/photo-and-files-slider/slider/slider.constants'

import { checkIsDocumentLink, checkIsVideoLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { isString } from '@typings/guards'
import { UploadFileType } from '@typings/shared/upload-file'

import { useStyles } from './zoom-modal.style'

import { ImageErrorContent } from './image-error-content'

interface ZoomModalProps {
  mediaFiles: UploadFileType[]
  currentMediaFileIndex: number
  isOpenModal: boolean
  setIsOpenModal: Dispatch<SetStateAction<boolean>>
  setCurrentMediaFileIndex: (index: number) => void
}

export const ZoomModal: FC<ZoomModalProps> = memo(props => {
  const { mediaFiles, currentMediaFileIndex, isOpenModal, setIsOpenModal, setCurrentMediaFileIndex } = props

  const { classes: styles } = useStyles()

  const files: string[] = mediaFiles.map(mediaFile =>
    isString(mediaFile) ? getAmazonImageUrl(mediaFile, true) : mediaFile?.data_url,
  )

  const nextImageIndex = (currentMediaFileIndex + 1) % files?.length
  const prevImageIndex = (currentMediaFileIndex + files?.length - 1) % files?.length
  const isDisableArrowRight = files?.length <= MIN_FILES_IN_ARRAY || currentMediaFileIndex === files?.length - 1
  const isDisableArrowLeft = files?.length <= MIN_FILES_IN_ARRAY || currentMediaFileIndex === 0
  const enableZoom =
    !checkIsVideoLink(files?.[currentMediaFileIndex]) || !checkIsDocumentLink(files?.[currentMediaFileIndex])

  return isOpenModal ? (
    <Lightbox
      enableZoom={enableZoom}
      mainSrc={files?.[currentMediaFileIndex]}
      nextSrc={!isDisableArrowRight ? files?.[nextImageIndex] : undefined}
      prevSrc={!isDisableArrowLeft ? files?.[prevImageIndex] : undefined}
      wrapperClassName={styles.wrapper}
      imageLoadErrorMessage={<ImageErrorContent files={files} fileIndex={currentMediaFileIndex} />}
      onCloseRequest={() => setIsOpenModal(!isOpenModal)}
      onMovePrevRequest={() => setCurrentMediaFileIndex(prevImageIndex)}
      onMoveNextRequest={() => setCurrentMediaFileIndex(nextImageIndex)}
    />
  ) : null
})

import { Dispatch, FC, SetStateAction, memo } from 'react'
import Lightbox from 'react-18-image-lightbox'
import 'react-18-image-lightbox/style.css'

import { MIN_FILES_IN_ARRAY } from '@components/shared/photo-and-files-slider/slider/slider.constants'

import { checkIsVideoLink } from '@utils/checks'

import { IUploadFile } from '@typings/upload-file'

import { useStyles } from './zoom-modal.styles'

interface Props {
  images: Array<string | IUploadFile>
  currentImageIndex: number
  isOpenModal: boolean
  setIsOpenModal: Dispatch<SetStateAction<boolean>>
  setCurrentImageIndex: (index: number) => void
}

export const ZoomModal: FC<Props> = memo(
  ({ images, currentImageIndex, isOpenModal, setIsOpenModal, setCurrentImageIndex }) => {
    const { classes: styles } = useStyles()

    const currentImages =
      images
        .map(image => (typeof image === 'string' ? image : image?.data_url))
        .filter(item => !checkIsVideoLink(item)) || []
    const nextImageIndex = (currentImageIndex + 1) % currentImages?.length
    const prevImageIndex = (currentImageIndex + currentImages?.length - 1) % currentImages?.length
    const isDisableArrowRight =
      currentImages?.length <= MIN_FILES_IN_ARRAY || currentImageIndex === currentImages?.length - 1
    const isDisableArrowLeft = currentImages?.length <= MIN_FILES_IN_ARRAY || currentImageIndex === 0

    return isOpenModal ? (
      <Lightbox
        mainSrc={currentImages?.[currentImageIndex]}
        nextSrc={!isDisableArrowRight ? currentImages?.[nextImageIndex] : undefined}
        prevSrc={!isDisableArrowLeft ? currentImages?.[prevImageIndex] : undefined}
        wrapperClassName={styles.wrapper}
        onCloseRequest={() => setIsOpenModal(!isOpenModal)}
        onMovePrevRequest={() => setCurrentImageIndex(prevImageIndex)}
        onMoveNextRequest={() => setCurrentImageIndex(nextImageIndex)}
      />
    ) : null
  },
)

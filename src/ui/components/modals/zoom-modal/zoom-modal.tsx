import { observer } from 'mobx-react'
import { Dispatch, FC, SetStateAction } from 'react'
import ImageZoom from 'react-image-zooom'

import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

import { Modal } from '@components/shared/modal'
import { MIN_FILES_IN_ARRAY } from '@components/shared/photo-and-files-slider/slider/slider.constants'
import { Arrows, ArrowsType } from '@components/shared/photo-and-files-slider/slider/slider.type'

import { IUploadFile } from '@typings/upload-file'

import { useStyles } from './zoom-modal.styles'

interface Props {
  images: Array<string | IUploadFile>
  currentImageIndex: number
  isOpenModal: boolean
  setIsOpenModal: Dispatch<SetStateAction<boolean>>
  setCurrentImageIndex: (index: number) => void
}

export const ZoomModal: FC<Props> = observer(
  ({ images, currentImageIndex, isOpenModal, setIsOpenModal, setCurrentImageIndex }) => {
    const { classes: styles, cx } = useStyles()

    const handleArrowClick = (direction: ArrowsType) => {
      const currentIndex =
        direction === Arrows.LEFT
          ? currentImageIndex === 0
            ? images.length - 1
            : currentImageIndex - 1
          : (currentImageIndex + 1) % images.length

      setCurrentImageIndex(currentIndex)
    }

    const isDisableArrowRight = images.length <= MIN_FILES_IN_ARRAY || currentImageIndex === images.length - 1
    const isDisableArrowLeft = images.length <= MIN_FILES_IN_ARRAY || currentImageIndex === 0

    return (
      <Modal
        openModal={isOpenModal}
        setOpenModal={() => setIsOpenModal(!isOpenModal)}
        dialogContextClassName={styles.modal}
      >
        <button disabled={isDisableArrowLeft} onClick={() => handleArrowClick(Arrows.LEFT)}>
          <ArrowLeftIcon
            className={cx(styles.arrowIcon, {
              [styles.arrowIconDisable]: isDisableArrowLeft,
            })}
          />
        </button>

        <div className={styles.imagesWrapper}>
          <div
            className={styles.images}
            style={{
              transform: `translateX(-${currentImageIndex * 100}%)`,
            }}
          >
            {images.map((image, index) => (
              <div key={index} className={styles.imageWrapper}>
                <ImageZoom src={typeof image === 'string' ? image : image.data_url} className={styles.image} />
              </div>
            ))}
          </div>
        </div>

        <button disabled={isDisableArrowRight} onClick={() => handleArrowClick(Arrows.RIGHT)}>
          <ArrowRightIcon
            className={cx(styles.arrowIcon, {
              [styles.arrowIconDisable]: isDisableArrowRight,
            })}
          />
        </button>
      </Modal>
    )
  },
)

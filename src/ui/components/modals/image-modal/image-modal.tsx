import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import { FC, ReactNode, useEffect, useState } from 'react'

import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import ZoomOutMapOutlinedIcon from '@mui/icons-material/ZoomOutMapOutlined'

import { ImageEditForm } from '@components/forms/image-edit-form'
import { useImageModalStyles } from '@components/modals/image-modal/image-modal.styles'
import { ZoomModal } from '@components/modals/zoom-modal'
import { Button } from '@components/shared/buttons/button'
import { CustomSlider } from '@components/shared/custom-slider'
import { Modal } from '@components/shared/modal'

import { checkIsImageLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getShortenStringIfLongerThanCount } from '@utils/text'
import { downloadFile, downloadFileByLink } from '@utils/upload-files'

export interface ImageObjectType {
  url: string
  _id?: string
  comment?: string
  file?: unknown
  title?: string
}

interface Props {
  isOpenModal: boolean
  imageList: string[] | ImageObjectType[]
  currentImageIndex: number
  handleOpenModal: VoidFunction
  handleCurrentImageIndex: (index: number) => void
  showPreviews?: boolean
  controls?: (index: number, image: string | ImageObjectType, onImageEditToggle?: VoidFunction) => ReactNode
  onClickEditImageSubmit?: (image: string) => void
}

export const ImageModal: FC<Props> = observer(
  ({
    imageList,
    currentImageIndex,
    isOpenModal,
    showPreviews,
    controls,
    handleOpenModal,
    handleCurrentImageIndex,
    onClickEditImageSubmit,
  }) => {
    const { classes: styles } = useImageModalStyles()

    const [isZoomActive, setIsZoomActive] = useState(false)
    const [currentImage, setCurrentImage] = useState<string | ImageObjectType>('')
    const [imageEditOpen, setImageEditOpen] = useState(false)

    const onImageEditToggle = () => setImageEditOpen(!imageEditOpen)

    useEffect(() => {
      setCurrentImage(imageList?.[currentImageIndex])
    }, [currentImageIndex])

    const onClickDownloadBtn = (image: string | ImageObjectType) => {
      if (typeof image === 'string') {
        downloadFileByLink(checkIsImageLink(image) ? image : getAmazonImageUrl(image))
      } else if (image.file) {
        downloadFile(image.file, image.title)
      } else {
        downloadFileByLink(checkIsImageLink(image.url) ? image.url : getAmazonImageUrl(image.url))
      }
    }

    const currentSlideTitle = `${currentImageIndex + 1}/${imageList?.length || 0}`
    const photos = imageList?.map(image => (typeof image === 'string' ? image : image?.url))

    return (
      <Modal
        openModal={isOpenModal}
        setOpenModal={() => handleOpenModal()}
        missClickModalOn={undefined}
        isWarning={false}
        dialogContextClassName={styles.modalContainer}
      >
        <div className={styles.wrapper}>
          {/* Image List */}

          {showPreviews && (
            <div className={styles.imagesList}>
              {imageList?.length > 0 &&
                imageList?.map((image, index) => {
                  const imageUrl = image
                    ? typeof image === 'string'
                      ? getAmazonImageUrl(image, true)
                      : image.url
                    : '/assets/img/no-photo.jpg'

                  return (
                    <div
                      key={index}
                      className={cx(styles.imagesListItem, {
                        [styles.imagesListItemActive]: index === currentImageIndex,
                      })}
                      onClick={() => handleCurrentImageIndex(index)}
                    >
                      <img
                        src={imageUrl}
                        alt="Image"
                        onError={e => ((e.target as HTMLImageElement).src = '/assets/img/no-photo.jpg')}
                      />

                      {typeof image !== 'string' && (
                        <div>
                          <p className={cx(styles.imagesListItemTitle, styles.shortText)}>{image?.title}</p>

                          {/* <p className={styles.imagesListItemComment}>
                        {getShortenStringIfLongerThanCount(image?.comment, 24)}
                      </p> */}
                        </div>
                      )}
                    </div>
                  )
                })}
            </div>
          )}

          {/* Slider */}

          <div className={styles.body}>
            {typeof currentImage !== 'string' && <p className={styles.title}>{currentImage?.title}</p>}

            <div className={styles.slider}>
              {imageList?.length > 0 && (
                <CustomSlider
                  isModal
                  isHideCounter
                  index={currentImageIndex}
                  arrowSize="60px"
                  onChangeIndex={handleCurrentImageIndex}
                >
                  {imageList?.map((el, index) => (
                    <div key={index} className={cx(styles.sliderItem)}>
                      <img
                        src={
                          el
                            ? typeof el === 'string'
                              ? getAmazonImageUrl(el, true)
                              : el.url
                            : '/assets/img/no-photo.jpg'
                        }
                        loading="lazy"
                        alt={`Slide ${index + 1}`}
                        onError={e => ((e.target as HTMLImageElement).src = '/assets/img/no-photo.jpg')}
                      />
                    </div>
                  ))}
                </CustomSlider>
              )}
            </div>

            {/* Info */}

            <div className={styles.info}>
              {typeof currentImage !== 'string' && (
                <p className={cx(styles.title, styles.clientComment)}>
                  {getShortenStringIfLongerThanCount(currentImage?.comment, 200)}
                </p>
              )}
              <p className={styles.currentSlide}>{currentSlideTitle}</p>
            </div>

            {/* Controls */}

            <div className={styles.controls}>
              <Button onClick={() => onClickDownloadBtn(currentImage)}>
                <DownloadOutlinedIcon />
              </Button>

              <Button onClick={() => setIsZoomActive(true)}>
                <ZoomOutMapOutlinedIcon />
              </Button>

              {controls ? controls(currentImageIndex, currentImage, onImageEditToggle) : null}
            </div>
          </div>
        </div>

        <ZoomModal
          images={imageList}
          currentImageIndex={currentImageIndex}
          isOpenModal={isZoomActive}
          setIsOpenModal={setIsZoomActive}
          setCurrentImageIndex={handleCurrentImageIndex}
        />

        <Modal openModal={imageEditOpen} setOpenModal={onImageEditToggle}>
          <ImageEditForm
            item={photos?.[currentImageIndex] || null}
            setOpenModal={onImageEditToggle}
            onSave={onClickEditImageSubmit}
          />
        </Modal>
      </Modal>
    )
  },
)

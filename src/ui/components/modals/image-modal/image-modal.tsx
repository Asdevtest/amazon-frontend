import { useImageModalStyles } from '@components/modals/image-modal/image-modal.styles'
import { Typography } from '@mui/material'
import { cx } from '@emotion/css'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { CustomSlider } from '@components/shared/custom-slider'
import { Modal } from '@components/shared/modal'
import { ReactNode, useState } from 'react'
import { Button } from '@components/shared/buttons/button'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import ZoomOutMapOutlinedIcon from '@mui/icons-material/ZoomOutMapOutlined'
import { downloadFile, downloadFileByLink } from '@utils/upload-files'
import { getShortenStringIfLongerThanCount } from '@utils/text'

export type ImageObjectType = Record<string, unknown>

interface ImageModalProps {
  isOpenModal: boolean
  handleOpenModal: () => void
  imageList: string[] | ImageObjectType[]
  currentImageIndex: number
  handleCurrentImageIndex: (index: number) => void
  showPreviews?: boolean
  getImageTitle?: (index: number, image: string | ImageObjectType) => string
  getImageComment?: (index: number, image: string | ImageObjectType) => string
  getImageUrl?: (index: number, image: string | ImageObjectType) => string
  controls?: (index: number, image: string | ImageObjectType) => ReactNode
}

export const ImageModal = (props: ImageModalProps) => {
  const { classes: styles } = useImageModalStyles()
  const [isZoomActive, setIsZoomActive] = useState<boolean>(false)
  const [zoomImage, setZoomImage] = useState<string | null>(null)

  const onClickDownloadBtn = (image: string | ImageObjectType) => {
    typeof image === 'string'
      ? downloadFileByLink(image)
      : image.image
      ? downloadFileByLink(image.image)
      : downloadFile(image.file)
  }

  const onClickZoomBtn = () => {
    if (typeof props.imageList[props.currentImageIndex] === 'string') {
      setZoomImage(getAmazonImageUrl(props.imageList[props.currentImageIndex], true))
    } else if (props?.getImageUrl?.(props.currentImageIndex, props.imageList[props.currentImageIndex]) !== undefined) {
      setZoomImage(props.getImageUrl(props.currentImageIndex, props.imageList[props.currentImageIndex]))
    }

    setIsZoomActive(true)
  }

  return (
    <Modal
      openModal={props.isOpenModal}
      setOpenModal={props.handleOpenModal}
      missClickModalOn={undefined}
      isWarning={false}
      dialogContextClassName={styles.modalContainer}
    >
      <div className={styles.wrapper}>
        {/* Image List */}

        {props.showPreviews && (
          <div className={styles.imagesList}>
            {!!props.imageList?.length &&
              props.imageList.map((image, index) => (
                <div
                  key={index}
                  className={cx(styles.imagesListItem, {
                    [styles.imagesListItemActive]: index === props.currentImageIndex,
                  })}
                  onClick={() => {
                    props.handleCurrentImageIndex(index)
                  }}
                >
                  <img
                    src={
                      image
                        ? typeof image === 'string'
                          ? getAmazonImageUrl(image, true)
                          : props.getImageUrl?.(index, image) ?? '/assets/img/no-photo.jpg'
                        : '/assets/img/no-photo.jpg'
                    }
                    alt="Image"
                  />

                  {(props.getImageTitle || props.getImageComment) && (
                    <div>
                      {props.getImageTitle && (
                        <Typography className={cx(styles.imagesListItemTitle, styles.shortText)}>
                          {props.getImageTitle(index, image)}
                        </Typography>
                      )}

                      {props.getImageComment && (
                        <Typography className={styles.imagesListItemComment}>
                          {getShortenStringIfLongerThanCount(props.getImageComment(index, image), 20)}
                        </Typography>
                      )}
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}

        {/* Slider */}

        <div className={styles.body}>
          {props.getImageTitle && (
            <Typography className={styles.title}>
              {props.getImageTitle(props.currentImageIndex, props.imageList[props.currentImageIndex]) || ''}
            </Typography>
          )}

          <div className={styles.slider}>
            {!!props.imageList?.length && (
              <CustomSlider
                isHideCounter
                index={props.currentImageIndex}
                arrowSize="60px"
                onChangeIndex={props.handleCurrentImageIndex}
              >
                {props.imageList.map((el, index) => (
                  <div key={index} className={cx(styles.sliderItem)}>
                    <img
                      src={
                        el
                          ? typeof el === 'string'
                            ? getAmazonImageUrl(el, true)
                            : props.getImageUrl?.(index, el) ?? '/assets/img/no-photo.jpg'
                          : '/assets/img/no-photo.jpg'
                      }
                      loading="lazy"
                      alt={`Slide ${index + 1}`}
                    />
                  </div>
                ))}
              </CustomSlider>
            )}
          </div>

          {/* Info */}

          <div className={styles.info}>
            {props.getImageComment && (
              <Typography className={styles.comment}>
                {props.getImageComment?.(props.currentImageIndex, props.imageList[props.currentImageIndex]) || ''}
              </Typography>
            )}
            <Typography className={styles.currentSlide} color="primary">
              {`${props.currentImageIndex + 1}/${props.imageList?.length || 0}`}
            </Typography>
          </div>

          {/* Controls */}

          <div className={styles.controls}>
            <Button onClick={() => onClickDownloadBtn(props.imageList?.[props.currentImageIndex])}>
              <DownloadOutlinedIcon />
            </Button>

            <Button onClick={() => onClickZoomBtn()}>
              <ZoomOutMapOutlinedIcon />
            </Button>

            {props?.controls && props.controls(props.currentImageIndex, props.imageList[props.currentImageIndex])}
          </div>
        </div>

        <div className={styles.placeholder}></div>
      </div>

      {/* Zoom Modal */}
      <Modal
        openModal={isZoomActive}
        setOpenModal={() => setIsZoomActive(prev => !prev)}
        missClickModalOn={undefined}
        isWarning={false}
        dialogContextClassName={styles.zoomModal}
      >
        <img className={styles.zoomModalImage} src={zoomImage || '/assets/img/no-photo.jpg'} alt="Zoom" />
      </Modal>
    </Modal>
  )
}

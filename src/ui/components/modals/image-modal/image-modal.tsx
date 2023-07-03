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

export type ImageObjectType = Record<string, unknown>

interface ImageModalProps {
  isOpenModal: boolean
  handleOpenModal: () => void
  imageList: string[] | ImageObjectType[]
  imageKey?: string
  currentImageIndex: number
  handleCurrentImageIndex: (index: number) => void
  showPreviews?: boolean
  getImageTitle?: (index: number, image: string | ImageObjectType) => string
  getImageComment?: (index: number, image: string | ImageObjectType) => string
  controls?: (index: number, image: string | ImageObjectType) => ReactNode
}

export const ImageModal = (props: ImageModalProps) => {
  const { classes: styles } = useImageModalStyles()
  const [isZoomActive, setIsZoomActive] = useState<boolean>(false)
  const [zoomImage, setZoomImage] = useState<string | ImageObjectType | null>(null)

  const onClickDownloadBtn = (image: string | ImageObjectType) => {
    typeof image === 'string' ? downloadFileByLink(image) : downloadFile(image.file)
  }

  const onClickZoomBtn = () => {
    if (typeof props.imageList[props.currentImageIndex] === 'string') {
      setZoomImage(getAmazonImageUrl(props.imageList[props.currentImageIndex], true))
    } else {
      setZoomImage(props.imageList[props.currentImageIndex])
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
            {props.imageList.map((image, index) => (
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
                  src={typeof image === 'string' ? getAmazonImageUrl(image, true) : image[props.imageKey!]}
                  alt="Image"
                />
                {props.getImageTitle && (
                  <div>
                    <Typography>{props.getImageTitle(index, image)}</Typography>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Slider */}

        <div className={styles.body}>
          <Typography className={styles.title}>
            {props?.getImageTitle &&
              props.getImageTitle(props.currentImageIndex, props.imageList[props.currentImageIndex])}
          </Typography>

          <div className={styles.slider}>
            <CustomSlider
              isHideCounter
              index={props.currentImageIndex}
              arrowSize="60px"
              onChangeIndex={props.handleCurrentImageIndex}
            >
              {props.imageList.map((el, index) => (
                <div key={index} className={cx(styles.sliderItem)}>
                  <img
                    src={typeof el === 'string' ? getAmazonImageUrl(el, true) : el[props.imageKey!]}
                    loading="lazy"
                    alt={`Slide ${index + 1}`}
                  />
                </div>
              ))}
            </CustomSlider>
          </div>

          {/* Info */}

          <div className={styles.info}>
            {props.getImageComment && (
              <Typography className={styles.comment}>
                {props.getImageComment(props.currentImageIndex, props.imageList[props.currentImageIndex])}
              </Typography>
            )}
            <Typography className={styles.currentSlide} color="primary">
              {`${props.currentImageIndex + 1}/${props.imageList.length}`}
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
        <img
          className={styles.zoomModalImage}
          src={typeof zoomImage !== 'string' ? (zoomImage?.[props.imageKey!] as string) : zoomImage}
          alt="Zoom"
        />
      </Modal>
    </Modal>
  )
}

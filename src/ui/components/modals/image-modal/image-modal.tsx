import { cx } from '@emotion/css'
import { ReactNode, useEffect, useState } from 'react'

import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import ZoomOutMapOutlinedIcon from '@mui/icons-material/ZoomOutMapOutlined'
import { Typography } from '@mui/material'

import { useImageModalStyles } from '@components/modals/image-modal/image-modal.styles'
import { Button } from '@components/shared/buttons/button'
import { CustomSlider } from '@components/shared/custom-slider'
import { Modal } from '@components/shared/modal'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getShortenStringIfLongerThanCount } from '@utils/text'
import { downloadFile, downloadFileByLink } from '@utils/upload-files'

export interface ImageObjectType {
  url: string
  title?: string
  comment?: string
  file?: unknown
  _id?: string
}

interface ImageModalProps {
  isOpenModal: boolean
  handleOpenModal: () => void
  imageList: string[] | ImageObjectType[]
  currentImageIndex: number
  handleCurrentImageIndex: (index: number) => void
  showPreviews?: boolean
  controls?: (index: number, image: string | ImageObjectType) => ReactNode
}

export const ImageModal = (props: ImageModalProps) => {
  const { classes: styles } = useImageModalStyles()
  const [isZoomActive, setIsZoomActive] = useState<boolean>(false)
  const [zoomImage, setZoomImage] = useState<string | null>(null)
  const [currentImage, setCurrentImage] = useState<string | ImageObjectType>()

  useEffect(() => {
    setCurrentImage(props.imageList?.[props.currentImageIndex])
  }, [props.imageList, props.currentImageIndex])

  const onClickDownloadBtn = (image: string | ImageObjectType) => {
    if (typeof image === 'string') {
      downloadFileByLink(getAmazonImageUrl(image))
    } else if (image.file) {
      downloadFile(image.file, image.title)
    } else {
      downloadFileByLink(getAmazonImageUrl(image.url))
    }
  }

  const onClickZoomBtn = () => {
    if (typeof currentImage === 'string') {
      setZoomImage(getAmazonImageUrl(currentImage, true))
    } else {
      setZoomImage(currentImage!.url)
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
                          : image.url
                        : '/assets/img/no-photo.jpg'
                    }
                    alt="Image"
                  />

                  {typeof image !== 'string' && (
                    <div>
                      <Typography className={cx(styles.imagesListItemTitle, styles.shortText)}>
                        {image?.title}
                      </Typography>

                      <Typography className={styles.imagesListItemComment}>
                        {getShortenStringIfLongerThanCount(image?.comment, 20)}
                      </Typography>
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}

        {/* Slider */}

        <div className={styles.body}>
          {typeof currentImage !== 'string' && <Typography className={styles.title}>{currentImage?.title}</Typography>}

          <div className={styles.slider}>
            {!!props.imageList?.length && (
              <CustomSlider
                isModal
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
                            : el.url
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
            {typeof currentImage !== 'string' && (
              <Typography className={styles.comment}>{currentImage?.comment}</Typography>
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

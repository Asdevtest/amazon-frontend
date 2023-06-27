import { cx } from '@emotion/css'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import ZoomOutMapOutlinedIcon from '@mui/icons-material/ZoomOutMapOutlined'
import { Typography } from '@mui/material'

import React, { useEffect, useState } from 'react'

import Carousel from 'react-material-ui-carousel'

import { ImageZoomForm } from '@components/forms/image-zoom-form'
import { Button } from '@components/shared/buttons/button'
import { Modal } from '@components/shared/modal'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { downloadFile, downloadFileByLink } from '@utils/upload-files'

import { useClassNames } from './big-images-modal.style'
import { getShortenStringIfLongerThanCount } from '@utils/text'
import { CustomSlider } from '@components/shared/custom-slider'

export const BigImagesModal = props => {
  const {
    openModal,
    setOpenModal,
    images,
    imgIndex = 0,
    showPreviews = false,
    setImageIndex,
    controls,
    getComment,
  } = props
  const { classes: classNames } = useClassNames()
  const [currentScreenWidth, setCurrentScreenWidth] = useState(window.innerWidth)

  const [zoomOpen, setZoomOpen] = useState(false)

  const [zoomImage, setZoomImage] = useState(null)

  useEffect(() => {
    const resizeScreen = () => {
      setCurrentScreenWidth(window.innerWidth)
    }

    window.addEventListener('resize', resizeScreen)
  }, [window.innerWidth])

  const handlePreview = index => {
    setImageIndex && setImageIndex(index)
  }

  const onClickDownloadBtn = image => {
    // downloadFileByLink(
    //   typeof image === 'string' ? getAmazonImageUrl(image, true) : image.data_url,
    //   // imageObj.comment,
    // )

    typeof image === 'string' ? downloadFileByLink(image) : downloadFile(image.file)
  }

  const onClickZoomBtn = image => {
    setZoomImage(
      // typeof image === 'string' ? getAmazonImageUrl(image, true) : image.image.data_url,
      // imageObj.comment,
      image,
    )

    setZoomOpen(true)
  }

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={classNames.body}>
        {showPreviews && (
          <div className={classNames.previewListWrapper}>
            <div className={classNames.previewList}>
              {images?.map((el, index) => (
                <div
                  key={index}
                  className={classNames.previewListItem}
                  onClick={() => {
                    handlePreview(index)
                  }}
                >
                  <img
                    className={cx(classNames.previewListImage, {
                      [classNames.activeImage]: index === imgIndex,
                    })}
                    src={
                      typeof el === 'string'
                        ? getAmazonImageUrl(el, true)
                        : el?.file.type.includes('image')
                        ? el?.data_url
                        : '/assets/icons/file.png'
                    }
                    loading="lazy"
                  />
                  {getComment && (
                    <Typography className={cx(classNames.imageLeftSideComment)}>
                      {getShortenStringIfLongerThanCount(getComment(index), 20)}
                    </Typography>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={classNames.carouselWrapper}>
          <Carousel
            navButtonsAlwaysVisible
            navButtonsAlwaysInvisible={currentScreenWidth < 768}
            autoPlay={false}
            timeout={100}
            animation="fade"
            // IndicatorIcon={<div>{`${imgIndex + 1}/ ${images.length}`}</div>}
            indicators={setImageIndex ? false : true}
            index={imgIndex}
            onChange={now => {
              handlePreview(now)
            }}
          >
            {images?.map((el, index) => (
              <div key={index} className={classNames.mainWrapper}>
                <img
                  className={classNames.imgBox}
                  src={
                    typeof el === 'string'
                      ? getAmazonImageUrl(el, true)
                      : el?.file.type.includes('image')
                      ? el?.data_url
                      : '/assets/icons/file.png'
                  }
                  alt=""
                />
                {getComment && <Typography className={classNames.title}>{getComment(index)}</Typography>}
              </div>
            ))}
          </Carousel>
          {/* <CustomSlider */}
          {/*   index={imgIndex} */}
          {/*   arrowSize="60px" */}
          {/*   onChangeIndex={(index) => setImageIndex(index - 1)} */}
          {/* > */}
          {/*   {images?.map((el, index) => ( */}
          {/*     <div key={index} className={classNames.mainWrapper}> */}
          {/*       <img */}
          {/*         className={classNames.imgBox} */}
          {/*         src={ */}
          {/*           typeof el === 'string' */}
          {/*             ? getAmazonImageUrl(el, true) */}
          {/*             : el?.file.type.includes('image') */}
          {/*             ? el?.data_url */}
          {/*             : '/assets/icons/file.png' */}
          {/*         } */}
          {/*         alt="" */}
          {/*       /> */}
          {/*       {getComment && <Typography className={classNames.title}>{getComment(index)}</Typography>} */}
          {/*     </div> */}
          {/*   ))} */}
          {/* </CustomSlider> */}
        </div>

        {setImageIndex && (
          <Typography className={classNames.indicator}>{`${imgIndex + 1} / ${images?.length}`}</Typography>
        )}

        <div className={classNames.controls}>
          <Button className={cx(classNames.imagesModalBtn)} onClick={() => onClickDownloadBtn(images?.[imgIndex])}>
            <DownloadOutlinedIcon />
          </Button>

          <Button className={cx(classNames.imagesModalBtn)} onClick={() => onClickZoomBtn(images?.[imgIndex])}>
            <ZoomOutMapOutlinedIcon />
          </Button>

          {controls && controls(imgIndex, images?.[imgIndex])}
        </div>
      </div>

      <Modal
        openModal={zoomOpen}
        setOpenModal={() => setZoomOpen(!zoomOpen)}
        dialogContextClassName={classNames.zoomDialogContext}
      >
        <ImageZoomForm item={zoomImage} />
      </Modal>
    </Modal>
  )
}

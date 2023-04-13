import {cx} from '@emotion/css'
import {Typography} from '@mui/material'

import React, {useEffect, useState} from 'react'

import Carousel from 'react-material-ui-carousel'

import {Modal} from '@components/modal'

// import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {useClassNames} from './big-images-modal.style'

export const BigImagesModal = props => {
  const {openModal, setOpenModal, images, imgIndex = 0, showPreviews = false, setImageIndex, controls} = props
  const {classes: classNames} = useClassNames()
  const [currentScreenWidth, setCurrentScreenWidth] = useState(window.innerWidth)

  useEffect(() => {
    const resizeScreen = () => {
      setCurrentScreenWidth(window.innerWidth)
    }

    window.addEventListener('resize', resizeScreen)
  }, [window.innerWidth])

  const handlePreview = index => {
    setImageIndex && setImageIndex(index)
  }

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={classNames.body}>
        {showPreviews && (
          <div className={classNames.previewList}>
            {images.map((el, index) => (
              <div key={index} className={classNames.previewListItem} onClick={() => handlePreview(index)}>
                <img
                  className={cx(classNames.previewListImage, {
                    [classNames.activeImage]: index === imgIndex,
                  })}
                  // src={el}
                  // srcSet={el}
                  // alt={el}
                  src={
                    typeof el === 'string'
                      ? el
                      : el?.file.type.includes('image')
                      ? el?.data_url
                      : '/assets/icons/file.png'
                  }
                  loading="lazy"
                />
              </div>
            ))}
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
            indicators={false}
            index={imgIndex}
            onChange={now => handlePreview(now)}
          >
            {images?.map((el, index) => (
              <div key={index} className={classNames.mainWrapper}>
                <img
                  className={classNames.imgBox}
                  // src={getAmazonImageUrl(el, true)}

                  src={
                    typeof el === 'string'
                      ? el
                      : el?.file.type.includes('image')
                      ? el?.data_url
                      : '/assets/icons/file.png'
                  }
                  alt=""
                />
              </div>
            ))}
          </Carousel>
        </div>

        <Typography className={classNames.indicator}>{`${imgIndex + 1} / ${images.length}`}</Typography>

        {controls && <div className={classNames.controls}>{controls(imgIndex, images[imgIndex])}</div>}
      </div>
    </Modal>
  )
}

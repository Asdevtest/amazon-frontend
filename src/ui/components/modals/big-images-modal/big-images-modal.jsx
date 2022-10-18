import React, {useEffect, useState} from 'react'

import Carousel from 'react-material-ui-carousel'

import {Modal} from '@components/modal'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'

import {useClassNames} from './big-images-modal.style'

export const BigImagesModal = ({openModal, setOpenModal, images, isAmazone, imgIndex = 0}) => {
  const {classes: classNames} = useClassNames()
  const [currentScreenWidth, setCurrentScreenWidth] = useState(window.innerWidth)

  useEffect(() => {
    const resizeScreen = () => {
      setCurrentScreenWidth(window.innerWidth)
    }
    window.addEventListener('resize', resizeScreen)
  }, [window.innerWidth])
  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={classNames.carouselWrapper}>
        <Carousel
          navButtonsAlwaysInvisible={currentScreenWidth < 768}
          autoPlay={false}
          timeout={100}
          animation="fade"
          index={imgIndex}
        >
          {images.map((el, index) => (
            <div key={index} className={classNames.mainWrapper}>
              <img alt="" className={classNames.imgBox} src={isAmazone ? getAmazonImageUrl(el) : el} />
            </div>
          ))}
        </Carousel>
      </div>
    </Modal>
  )
}

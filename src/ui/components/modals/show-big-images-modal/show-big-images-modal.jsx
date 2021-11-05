import React from 'react'

import CloseIcon from '@material-ui/icons/Close'
import Carousel from 'react-material-ui-carousel'

import {Modal} from '@components/modal'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'

import {useClassNames} from './show-big-images-modal.style'

export const BigImagesModal = ({openModal, setOpenModal, images, isAmazone}) => {
  const classNames = useClassNames()

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <Carousel autoPlay={false} timeout={100} animation="fade">
        {images.map((el, index) => (
          <div key={index} className={classNames.mainWrapper}>
            <div className={classNames.closeWrapper} onClick={setOpenModal}>
              <CloseIcon className={classNames.closeIcon} />
            </div>

            <img alt="" className={classNames.imgBox} src={isAmazone ? getAmazonImageUrl(el) : el} />
          </div>
        ))}
      </Carousel>
    </Modal>
  )
}

import React from 'react'

import CloseIcon from '@material-ui/icons/Close'

import {Modal} from '@components/modal'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'

import {useClassNames} from './show-image-modal.style'

export const ShowImageModal = ({openModal, setOpenModal, image, isAmazone}) => {
  const classNames = useClassNames()

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={classNames.mainWrapper}>
        <div className={classNames.closeWrapper} onClick={setOpenModal}>
          <CloseIcon className={classNames.closeIcon} />
        </div>

        <img alt="" className={classNames.imgBox} src={isAmazone ? getAmazonImageUrl(image) : image} />
      </div>
    </Modal>
  )
}

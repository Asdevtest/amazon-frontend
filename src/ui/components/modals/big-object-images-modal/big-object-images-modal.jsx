import {cx} from '@emotion/css'
import {Avatar, Typography} from '@mui/material'

import {useEffect, useState} from 'react'

// import React, {useEffect, useState} from 'react'
import {CustomCarousel} from '@components/custom-carousel'
import {Modal} from '@components/modal'

import {getShortenStringIfLongerThanCount} from '@utils/text'

import {useClassNames} from './big-object-images-modal.style'

export const BigObjectImagesModal = ({
  openModal,
  setOpenModal,
  imagesData,
  curImageId,
  renderBtns,
  setCurImageId,
  isRedImageComment,
}) => {
  const {classes: classNames} = useClassNames()

  const filteredImagesData = imagesData.filter(el => !!el.image)

  // const curImageIndex = filteredImagesData.findIndex(el => el._id === curImageId) || 0

  const [curImageIndex, setCurImageIndex] = useState(filteredImagesData.findIndex(el => el._id === curImageId) || 0)

  useEffect(() => {
    const newIndex = filteredImagesData.findIndex(el => el._id === curImageId)

    setCurImageIndex(() => (newIndex >= 0 ? newIndex : 0))
  }, [curImageId])

  const onChangeCurImageIndex = index => {
    // console.log('filteredImagesData', filteredImagesData)
    // console.log('index', index)

    const objImage = filteredImagesData.find((el, i) => i === index)

    // console.log('objImage', objImage)

    if (objImage) {
      setCurImageId(() => objImage._id)
    }
  }

  const onClickLeftSideImage = iamageId => {
    setCurImageId(() => iamageId)
    setCurImageIndex(() => filteredImagesData.findIndex(el => el._id === curImageId) || 0)
  }

  // console.log('curImageId', curImageId)

  // console.log('filteredImagesData', filteredImagesData)
  // console.log('curImageIndex', curImageIndex)

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={classNames.imageModalWrapper}>
        <div className={classNames.imageModalSubWrapper}>
          {filteredImagesData.map(item => (
            <div
              key={item._id}
              className={cx(classNames.imageModalImageWrapperLeftSide, {
                [classNames.imageModalImageWrapperLeftSideSelected]: item._id === curImageId,
              })}
              onClick={() => onClickLeftSideImage(item._id)}
            >
              <Avatar
                className={classNames.imageModalImageLeftSide}
                classes={{img: classNames.imageModalImageLeftSide}}
                src={
                  typeof item.image === 'string'
                    ? item.image
                    : item.image?.file.type.includes('image')
                    ? item.image?.data_url
                    : '/assets/icons/file.png'
                }
                alt={item.image?.file?.name || ''}
                variant="square"
              />

              {/* {!!item.comment && ( */}
              <div>
                <Typography className={cx(classNames.imageName, classNames.shortText)}>{item.comment}</Typography>

                <Typography className={cx(classNames.imageLeftSideComment)}>
                  {getShortenStringIfLongerThanCount(item.imageComment, 20)}
                </Typography>
              </div>
              {/* )} */}
            </div>
          ))}
        </div>

        <div className={classNames.carouselWrapper}>
          <CustomCarousel index={curImageIndex} onChangeIndex={onChangeCurImageIndex}>
            {filteredImagesData.map(item => (
              <div key={item._id} className={classNames.imageModalImageWrapper}>
                <Typography className={cx(classNames.imageName, classNames.titleName)}>{item.comment}</Typography>

                <Avatar
                  className={classNames.imageModalImage}
                  classes={{img: classNames.imageModalImage}}
                  src={
                    typeof item.image === 'string'
                      ? item.image
                      : item.image?.file.type.includes('image')
                      ? item.image?.data_url
                      : '/assets/icons/file.png'
                  }
                  alt={item.image?.file?.name || ''}
                  variant="square"
                />

                <Typography className={cx(classNames.imageComment, {[classNames.redText]: isRedImageComment})}>
                  {item.imageComment}
                </Typography>
              </div>
            ))}
          </CustomCarousel>
        </div>

        <div className={cx(classNames.imageModalSubWrapper, classNames.imageModalSubWrapperRightSide)}>
          {renderBtns()}
        </div>
      </div>
    </Modal>
  )
}

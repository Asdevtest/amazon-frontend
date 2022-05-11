import React, {useState} from 'react'

import {Typography} from '@material-ui/core'
import Carousel from 'react-material-ui-carousel'

import {Field} from '@components/field'
// import {texts} from '@constants/texts'
import {BigImagesModal} from '@components/modals/big-images-modal'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'

// import {getLocalizedTexts} from '@utils/get-localized-texts'
import {useClassNames} from './extra-order-info.style'

// const textConsts = getLocalizedTexts(texts, 'ru').clientOrderInfo

export const ExtraOrderInfo = ({order}) => {
  const classNames = useClassNames()

  const [showImageModal, setShowImageModal] = useState(false)
  const [bigImagesOptions, setBigImagesOptions] = useState({images: [], imgIndex: 0})

  const onClickImg = opt => {
    setShowImageModal(!showImageModal)
    setBigImagesOptions({images: opt.images, imgIndex: opt.imgIndex})
  }

  return (
    <div className={classNames.orderContainer}>
      <div className={classNames.imagesWrapper}>
        <div className={classNames.photoWrapper}>
          <Typography className={classNames.subTitle}>{'Фотографии к заказу:'}</Typography>

          {(order.images === null ? false : order.images?.length > 0) ? (
            <Carousel autoPlay={false} timeout={100} animation="fade" className={classNames.imgBoxWrapper}>
              {order.images.map((el, index) => (
                <div key={index}>
                  <img
                    alt=""
                    className={classNames.imgBox}
                    src={getAmazonImageUrl(el)}
                    onClick={() => onClickImg({images: order.images, imgIndex: index})}
                  />
                </div>
              ))}
            </Carousel>
          ) : (
            <div className={classNames.imgBoxWrapper}>
              <img alt="" className={classNames.noImgBox} src={'/assets/img/no-photo.jpg'} />
              <Typography>{'Фотографий пока нет...'}</Typography>
            </div>
          )}
        </div>

        <div className={classNames.photoWrapper}>
          <Typography className={classNames.subTitle}>{'Фотографии текущего поставщика:'}</Typography>

          {(
            order.product.currentSupplier?.images === null ? false : order.product.currentSupplier?.images.length > 0
          ) ? (
            <Carousel autoPlay={false} timeout={100} animation="fade" className={classNames.imgBoxWrapper}>
              {order.product.currentSupplier?.images.map((el, index) => (
                <div key={index}>
                  <img
                    alt=""
                    className={classNames.imgBox}
                    src={getAmazonImageUrl(el)}
                    onClick={() => onClickImg({images: order.product.currentSupplier?.images, imgIndex: index})}
                  />
                </div>
              ))}
            </Carousel>
          ) : (
            <div className={classNames.imgBoxWrapper}>
              <img alt="" className={classNames.noImgBox} src={'/assets/img/no-photo.jpg'} />
              <Typography>{'Фотографий пока нет...'}</Typography>
            </div>
          )}
        </div>
      </div>

      <div className={classNames.commentsWrapper}>
        <Typography>{'Комментарии'}</Typography>

        <Field
          disabled
          multiline
          rows={4}
          rowsMax={6}
          value={order.buyerComment}
          inputClasses={classNames.input}
          label={'Баера'}
        />

        <Field
          disabled
          multiline
          rows={4}
          rowsMax={6}
          value={order.clientComment}
          inputClasses={classNames.input}
          label={'Клиента'}
        />
      </div>

      <BigImagesModal
        isAmazone
        openModal={showImageModal}
        setOpenModal={() => setShowImageModal(!showImageModal)}
        images={bigImagesOptions.images}
        imgIndex={bigImagesOptions.imgIndex}
      />
    </div>
  )
}

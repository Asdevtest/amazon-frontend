import React, {useState} from 'react'

import {Typography} from '@material-ui/core'
import Carousel from 'react-material-ui-carousel'

import {TranslationKey} from '@constants/translations/translation-key'

import {Field} from '@components/field'
import {BigImagesModal} from '@components/modals/big-images-modal'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {t} from '@utils/translations'

import {useClassNames} from './extra-order-info.style'

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
          <Typography className={classNames.subTitle}>{t(TranslationKey['Order photos:'])}</Typography>

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
              <Typography>{t(TranslationKey['No photos yet...'])}</Typography>
            </div>
          )}
        </div>

        <div className={classNames.photoWrapper}>
          <Typography className={classNames.subTitle}>{t(TranslationKey['Photos of current supplier'])}</Typography>

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
              <Typography>{t(TranslationKey['No photos yet...'])}</Typography>
            </div>
          )}
        </div>
      </div>

      <div className={classNames.commentsWrapper}>
        <Typography>{t(TranslationKey.Comments)}</Typography>

        <Field
          disabled
          multiline
          rows={6}
          rowsMax={6}
          value={order.buyerComment}
          inputClasses={classNames.input}
          label={t(TranslationKey.Buyer)}
        />

        <Field
          disabled
          multiline
          rows={6}
          rowsMax={6}
          value={order.clientComment}
          inputClasses={classNames.input}
          label={t(TranslationKey.Client)}
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

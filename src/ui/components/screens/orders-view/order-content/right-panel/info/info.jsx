import React, {useState} from 'react'

import {Button, Typography} from '@material-ui/core'
import LaunchIcon from '@material-ui/icons/Launch'
import clsx from 'clsx'
import Carousel from 'react-material-ui-carousel'

import {texts} from '@constants/texts'

import {BigImagesModal} from '@components/modals/big-images-modal'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './info.style'

const textConsts = getLocalizedTexts(texts, 'ru').clientOrderInfo

export const Info = ({order}) => {
  const classNames = useClassNames()

  const [showImageModal, setShowImageModal] = useState(false)
  const [bigImagesOptions, setBigImagesOptions] = useState({images: [], imgIndex: 0})

  const onClickImg = opt => {
    setShowImageModal(!showImageModal)
    setBigImagesOptions({images: opt.images, imgIndex: opt.imgIndex})
  }

  return (
    <div className={classNames.mainWrapper}>
      <div className={classNames.titleWrapper}>
        <Typography className={classNames.title}>{textConsts.mainTitle}</Typography>
        <Typography className={classNames.orderNumber}>{`# ${order.id}`}</Typography>
      </div>

      <div className={classNames.orderWrapperInfo}>
        <div className={classNames.orderSubWrapperInfo}>
          <Typography className={(classNames.label, classNames.dividerTypo)}>{textConsts.priceBatch}</Typography>
          <Typography className={classNames.orderPrice}>{'N/A'}</Typography>
        </div>
        <div className={classNames.typoFlexWrapper}>
          <Typography className={(classNames.label, classNames.dividerTypo)}>{textConsts.orderSum}</Typography>
          <Typography className={classNames.orderPrice}>{order.totalPrice}</Typography>
        </div>
      </div>

      <div className={classNames.orderWrapperInfo}>
        <div className={classNames.orderSubWrapperInfoDivider}>
          <Typography className={(classNames.label, classNames.dividerTypo)}>{textConsts.sendDate}</Typography>
          <Typography className={classNames.text}>{'N/A'}</Typography>
        </div>
        <div>
          <Typography className={(classNames.label, classNames.dividerTypo)}>{textConsts.sendNearDate}</Typography>
          <Typography className={classNames.text}>{'N/A'}</Typography>
        </div>
      </div>

      <div className={classNames.orderWrapperInfo}>
        <div className={classNames.orderSubWrapperInfoDivider}>
          <Button
            className={clsx(classNames.text, classNames.button)}
            variant="outlined"
            endIcon={<LaunchIcon fontSize="small" />}
          >
            {textConsts.docs}
          </Button>
        </div>
      </div>

      <div className={classNames.imagesWrapper}>
        <div className={classNames.photoWrapper}>
          <Typography className={classNames.subTitle}>{'Фотографии к заказу:'}</Typography>

          {(order.images === null ? false : order.images.length > 0) ? (
            <Carousel autoPlay={false} timeout={100} animation="fade">
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
            <Typography>{'Фотографий пока нет...'}</Typography>
          )}
        </div>

        <div className={classNames.photoWrapper}>
          <Typography className={classNames.subTitle}>{'Фотографии текущего поставщика:'}</Typography>

          {(order.product.images === null ? false : order.product.images.length > 0) ? (
            <Carousel autoPlay={false} timeout={100} animation="fade">
              {order.product.currentSupplier.images.map((el, index) => (
                <div key={index}>
                  <img
                    alt=""
                    className={classNames.imgBox}
                    src={getAmazonImageUrl(el)}
                    onClick={() => onClickImg({images: order.product.currentSupplier.images, imgIndex: index})}
                  />
                </div>
              ))}
            </Carousel>
          ) : (
            <Typography>{'Фотографий пока нет...'}</Typography>
          )}
        </div>
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

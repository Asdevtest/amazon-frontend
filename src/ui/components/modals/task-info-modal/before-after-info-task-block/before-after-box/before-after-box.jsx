import React, {useState} from 'react'

import {Typography, Paper, Checkbox, Link} from '@material-ui/core'
import Carousel from 'react-material-ui-carousel'

import {getDeliveryOptionByCode} from '@constants/delivery-options'
import {getOrderStatusOptionByCode} from '@constants/order-status'
import {TaskOperationType} from '@constants/task-operation-type'
import {texts} from '@constants/texts'
import {getWarehousesOptionByCode} from '@constants/warehouses'

import {Field} from '@components/field'
import {BigImagesModal} from '@components/modals/big-images-modal'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {checkAndMakeAbsoluteUrl, toFixedWithCm, toFixedWithKg} from '@utils/text'

import {useClassNames} from './before-after-box.style'
import {TaskInfoBoxItemCard} from './task-info-box-item-card'

const textConsts = getLocalizedTexts(texts, 'ru').beforeAfterInfoTaskBlock

export const BeforeAfterBox = ({box, isCurrentBox, taskType}) => {
  const classNames = useClassNames()

  const [showImageModal, setShowImageModal] = useState(false)

  const [bigImagesOptions, setBigImagesOptions] = useState({images: [], imgIndex: 0})

  return (
    <Paper className={classNames.box}>
      <div className={classNames.fieldsWrapper}>
        <Field disabled label={textConsts.warehouseLabel} value={getWarehousesOptionByCode(box.warehouse).label} />

        <Field
          disabled
          label={textConsts.deliveryMethodLabel}
          value={getDeliveryOptionByCode(box.deliveryMethod).label}
        />
        {taskType === TaskOperationType.RECEIVE && (
          <Field
            disabled
            label={textConsts.statusLabel}
            value={getOrderStatusOptionByCode(box.items[0].order.status).label}
          />
        )}
      </div>

      <Typography className={classNames.boxTitle}>{`${textConsts.boxNum} ${box.humanFriendlyId}`}</Typography>

      {box.amount > 1 && (
        <div className={classNames.superWrapper}>
          <Typography className={classNames.subTitle}>{textConsts.superTypo}</Typography>
          <Typography>{`x${box.amount}`}</Typography>
        </div>
      )}

      <div className={classNames.itemsWrapper}>
        {box.items.map((item, index) => (
          <div key={index}>
            <TaskInfoBoxItemCard item={item} index={index} superCount={box.amount} box={box} />
          </div>
        ))}
      </div>

      <div className={classNames.imagesWrapper}>
        {box.images && (
          <div className={classNames.photoWrapper}>
            <Typography>{'Фотографии коробки:'}</Typography>

            {box.images.length > 0 ? (
              <Carousel autoPlay={false} timeout={100} animation="fade">
                {box.images.map((el, index) => (
                  <div key={index}>
                    <img
                      alt=""
                      className={classNames.imgBox}
                      src={el}
                      onClick={() => {
                        setShowImageModal(!showImageModal)
                        setBigImagesOptions({images: box.images, imgIndex: index})
                      }}
                    />
                  </div>
                ))}
              </Carousel>
            ) : (
              <Typography>{'Фотографий пока нет...'}</Typography>
            )}
          </div>
        )}

        {box.items[0].order.images && (
          <div className={classNames.photoWrapper}>
            <Typography>{'Фотографии заказа:'}</Typography>

            {box.items[0].order.images.length > 0 ? (
              <Carousel autoPlay={false} timeout={100} animation="fade">
                {box.items[0].order.images.map((el, index) => (
                  <div key={index}>
                    <img
                      alt=""
                      className={classNames.imgBox}
                      src={el}
                      onClick={() => {
                        setShowImageModal(!showImageModal)
                        setBigImagesOptions({images: box.items[0].order.images, imgIndex: index})
                      }}
                    />
                  </div>
                ))}
              </Carousel>
            ) : (
              <Typography>{'Фотографий пока нет...'}</Typography>
            )}
          </div>
        )}
      </div>

      <Paper className={classNames.bottomBlockWrapper}>
        <div>
          <div className={classNames.chipWrapper}>
            <Typography className={classNames.subTitle}>{textConsts.shippingLabel}</Typography>

            {box.shippingLabel ? (
              <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(box.shippingLabel)}>
                <Typography className={classNames.shippingLabelField}>{box.shippingLabel}</Typography>
              </Link>
            ) : (
              <Typography className={classNames.shippingLabelField}>{'N/A'}</Typography>
            )}
          </div>

          <Field
            oneLine
            containerClasses={classNames.field}
            label={textConsts.shippingLabelIsGluedWarehouse}
            inputComponent={<Checkbox disabled checked={box.isShippingLabelAttachedByStorekeeper} />}
          />
        </div>
        <Typography className={classNames.categoryTitle}>{textConsts.demensions}</Typography>

        {isCurrentBox && taskType === TaskOperationType.RECEIVE ? (
          <Paper className={classNames.demensionsWrapper}>
            <Typography className={classNames.categoryTitle}>{textConsts.demensionsSupplier}</Typography>
            <Typography>
              {textConsts.length}
              {toFixedWithCm(box.lengthCmSupplier, 2)}
            </Typography>
            <Typography>
              {textConsts.width}
              {toFixedWithCm(box.widthCmSupplier, 2)}
            </Typography>
            <Typography>
              {textConsts.height}
              {toFixedWithCm(box.heightCmSupplier, 2)}
            </Typography>

            <Typography>
              {textConsts.weight}
              {toFixedWithKg(box.weighGrossKgSupplier, 2)}
            </Typography>
            <Typography>
              {textConsts.volumeWeigh}
              {toFixedWithKg(box.volumeWeightKgSupplier, 2)}
            </Typography>
            <Typography>
              {textConsts.finalWeight}
              {toFixedWithKg(
                box.weighGrossKgSupplier > box.volumeWeightKgSupplier
                  ? box.weighGrossKgSupplier
                  : box.volumeWeightKgSupplier,
                2,
              )}
            </Typography>
          </Paper>
        ) : (
          <Paper className={classNames.demensionsWrapper}>
            <Typography className={classNames.categoryTitle}>{textConsts.demensionsWarehouse}</Typography>
            <Typography>
              {textConsts.length}
              {toFixedWithCm(box.lengthCmWarehouse, 2)}
            </Typography>
            <Typography>
              {textConsts.width}
              {toFixedWithCm(box.widthCmWarehouse, 2)}
            </Typography>
            <Typography>
              {textConsts.height}
              {toFixedWithCm(box.heightCmWarehouse, 2)}
            </Typography>

            <Typography>
              {textConsts.weight}
              {toFixedWithKg(box.weighGrossKgWarehouse, 2)}
            </Typography>
            <Typography>
              {textConsts.volumeWeigh}
              {toFixedWithKg(box.volumeWeightKgWarehouse, 2)}
            </Typography>
            <Typography>
              {textConsts.finalWeight}
              {toFixedWithKg(
                box.weighGrossKgWarehouse > box.volumeWeightKgWarehouse
                  ? box.weighGrossKgWarehouse
                  : box.volumeWeightKgWarehouse,
                2,
              )}
            </Typography>
          </Paper>
        )}
      </Paper>

      <BigImagesModal
        isAmazone
        openModal={showImageModal}
        setOpenModal={() => setShowImageModal(!showImageModal)}
        images={bigImagesOptions.images}
        imgIndex={bigImagesOptions.imgIndex}
      />
    </Paper>
  )
}

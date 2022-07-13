import React from 'react'

import {Typography, Paper, Checkbox, Link} from '@material-ui/core'

import {getOrderStatusOptionByCode} from '@constants/order-status'
import {TaskOperationType} from '@constants/task-operation-type'
import {TranslationKey} from '@constants/translations/translation-key'

import {PhotoCarousel} from '@components/custom-carousel/custom-carousel'
import {Field} from '@components/field'

import {checkAndMakeAbsoluteUrl, getFullTariffTextForBoxOrOrder, toFixedWithCm, toFixedWithKg} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './before-after-box.style'
import {TaskInfoBoxItemCard} from './task-info-box-item-card'

export const BeforeAfterBox = ({box, isCurrentBox, taskType, volumeWeightCoefficient}) => {
  const classNames = useClassNames()

  return (
    <Paper className={classNames.box}>
      <div className={classNames.fieldsWrapper}>
        <Field disabled label={t(TranslationKey.Warehouse)} value={box.destination?.name} />

        <Field disabled label={t(TranslationKey.Tariff)} value={getFullTariffTextForBoxOrOrder(box) || 'N/A'} />

        {taskType === TaskOperationType.RECEIVE && (
          <Field
            disabled
            label={t(TranslationKey.Status)}
            value={getOrderStatusOptionByCode(box.items[0].order.status).label}
          />
        )}
      </div>

      <Typography className={classNames.boxTitle}>{`${t(TranslationKey['Box number:'])} ${
        box.humanFriendlyId
      }`}</Typography>

      {box.amount > 1 && (
        <div className={classNames.superWrapper}>
          <Typography className={classNames.subTitle}>{t(TranslationKey.Super) + ' '}</Typography>
          <Typography>{`x${box.amount}`}</Typography>
        </div>
      )}

      <div className={classNames.itemsWrapper}>
        {box.items.map((item, index) => (
          <div key={index}>
            <TaskInfoBoxItemCard item={item} index={index} superCount={box.amount} />
          </div>
        ))}
      </div>

      <Paper className={classNames.boxInfoWrapper}>
        <div>
          <Typography className={classNames.categoryTitle}>{t(TranslationKey.Demensions) + ':'}</Typography>

          {isCurrentBox && taskType === TaskOperationType.RECEIVE ? (
            <div className={classNames.demensionsWrapper}>
              <Typography className={classNames.categoryTitle}>{t(TranslationKey['Sizes from supplier:'])}</Typography>
              <Typography>
                {t(TranslationKey.Length) + ': '}
                {toFixedWithCm(box.lengthCmSupplier, 2)}
              </Typography>
              <Typography>
                {t(TranslationKey.Width) + ': '}
                {toFixedWithCm(box.widthCmSupplier, 2)}
              </Typography>
              <Typography>
                {t(TranslationKey.Height) + ': '}
                {toFixedWithCm(box.heightCmSupplier, 2)}
              </Typography>

              <Typography>
                {t(TranslationKey.Weight) + ': '}
                {toFixedWithKg(box.weighGrossKgSupplier, 2)}
              </Typography>
              <Typography>
                {t(TranslationKey['Volume weight']) + ': '}
                {toFixedWithKg(
                  ((parseFloat(box.lengthCmSupplier) || 0) *
                    (parseFloat(box.heightCmSupplier) || 0) *
                    (parseFloat(box.widthCmSupplier) || 0)) /
                    volumeWeightCoefficient,
                  2,
                )}
              </Typography>

              <Typography>
                {t(TranslationKey['Final weight']) + ': '}
                {toFixedWithKg(
                  box.weighGrossKgSupplier >
                    ((parseFloat(box.lengthCmSupplier) || 0) *
                      (parseFloat(box.heightCmSupplier) || 0) *
                      (parseFloat(box.widthCmSupplier) || 0)) /
                      volumeWeightCoefficient
                    ? box.weighGrossKgSupplier
                    : ((parseFloat(box.lengthCmSupplier) || 0) *
                        (parseFloat(box.heightCmSupplier) || 0) *
                        (parseFloat(box.widthCmSupplier) || 0)) /
                        volumeWeightCoefficient,
                  2,
                )}
              </Typography>
            </div>
          ) : (
            <div className={classNames.demensionsWrapper}>
              <Typography className={classNames.categoryTitle}>
                {t(TranslationKey['Sizes from storekeeper:'])}
              </Typography>
              <Typography>
                {t(TranslationKey.Length) + ': '}
                {toFixedWithCm(box.lengthCmWarehouse, 2)}
              </Typography>
              <Typography>
                {t(TranslationKey.Width) + ': '}
                {toFixedWithCm(box.widthCmWarehouse, 2)}
              </Typography>
              <Typography>
                {t(TranslationKey.Height) + ': '}
                {toFixedWithCm(box.heightCmWarehouse, 2)}
              </Typography>

              <Typography>
                {t(TranslationKey.Weight) + ': '}
                {toFixedWithKg(box.weighGrossKgWarehouse, 2)}
              </Typography>
              <Typography>
                {t(TranslationKey['Volume weight']) + ': '}
                {toFixedWithKg(
                  ((parseFloat(box.lengthCmWarehouse) || 0) *
                    (parseFloat(box.heightCmWarehouse) || 0) *
                    (parseFloat(box.widthCmWarehouse) || 0)) /
                    volumeWeightCoefficient,
                  2,
                )}
              </Typography>
              <Typography>
                {t(TranslationKey['Final weight']) + ': '}
                {toFixedWithKg(
                  box.weighGrossKgWarehouse >
                    ((parseFloat(box.lengthCmWarehouse) || 0) *
                      (parseFloat(box.heightCmWarehouse) || 0) *
                      (parseFloat(box.widthCmWarehouse) || 0)) /
                      volumeWeightCoefficient
                    ? box.weighGrossKgWarehouse
                    : ((parseFloat(box.lengthCmWarehouse) || 0) *
                        (parseFloat(box.heightCmWarehouse) || 0) *
                        (parseFloat(box.widthCmWarehouse) || 0)) /
                        volumeWeightCoefficient,
                  2,
                )}
              </Typography>
            </div>
          )}
        </div>

        <div>
          <div className={classNames.imagesWrapper}>
            {box.images && (
              <div className={classNames.photoWrapper}>
                <Typography>{t(TranslationKey['Box photos:'])}</Typography>
                <PhotoCarousel files={box.images} />
              </div>
            )}

            {box.items[0].order.images && (
              <div className={classNames.photoWrapper}>
                <Typography>{t(TranslationKey['Order photos:'])}</Typography>
                <PhotoCarousel files={box.items[0].order.images} />
              </div>
            )}
          </div>
        </div>
      </Paper>

      <Paper className={classNames.bottomBlockWrapper}>
        <div className={classNames.chipWrapper}>
          <Typography className={classNames.subTitle}>{t(TranslationKey['Shipping label']) + ':'}</Typography>

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
          containerClasses={classNames.checkboxContainer}
          label={t(TranslationKey['Shipping label was glued to the warehouse'])}
          inputComponent={<Checkbox disabled checked={box.isShippingLabelAttachedByStorekeeper} />}
        />
      </Paper>
    </Paper>
  )
}

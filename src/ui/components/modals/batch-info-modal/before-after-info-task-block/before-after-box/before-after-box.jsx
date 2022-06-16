import React from 'react'

import {Typography, Paper, Checkbox} from '@material-ui/core'

import {getDeliveryOptionByCode} from '@constants/delivery-options'
import {getOrderStatusOptionByCode} from '@constants/order-status'
import {TaskOperationType} from '@constants/task-operation-type'
import {TranslationKey} from '@constants/translations/translation-key'
import {getWarehousesOptionByCode} from '@constants/warehouses'

import {Field} from '@components/field'

import {t} from '@utils/translations'

import {useClassNames} from './before-after-box.style'
import {TaskInfoBoxItemCard} from './task-info-box-item-card'

export const BeforeAfterBox = ({box, isCurrentBox, taskType}) => {
  const classNames = useClassNames()

  return (
    <Paper className={classNames.box}>
      <div className={classNames.fieldsWrapper}>
        <Field disabled label={t(TranslationKey.Warehouse)} value={getWarehousesOptionByCode(box.warehouse).label} />

        <Field
          disabled
          label={t(TranslationKey['Delivery Method'])}
          value={getDeliveryOptionByCode(box.deliveryMethod).label}
        />
        {taskType === TaskOperationType.RECEIVE && (
          <Field
            disabled
            label={t(TranslationKey.Status)}
            value={getOrderStatusOptionByCode(box.items[0].order.status).label}
          />
        )}
      </div>

      <Typography className={classNames.boxTitle}>{`${t(TranslationKey.Box) + '№'} ${box._id}`}</Typography>

      {box.amount > 1 && (
        <div className={classNames.superWrapper}>
          <Typography className={classNames.subTitle}>{t(TranslationKey.Super)}</Typography>
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

      <Paper className={classNames.bottomBlockWrapper}>
        <div>
          <div className={classNames.chipWrapper}>
            <Typography className={classNames.subTitle}>{t(TranslationKey['Shipping label'])}</Typography>
            <Typography className={classNames.shippingLabelField}>
              {box.shippingLabel ? box.shippingLabel : 'N/A'}
            </Typography>
          </div>
          <Field
            oneLine
            containerClasses={classNames.field}
            label={t(TranslationKey['Shipping label was glued to the warehouse'])}
            inputComponent={<Checkbox disabled checked={box.isShippingLabelAttachedByStorekeeper} />}
          />
        </div>
        <Typography className={classNames.categoryTitle}>{t(TranslationKey.Demensions)}</Typography>

        {isCurrentBox && taskType === TaskOperationType.RECEIVE ? (
          <Paper className={classNames.demensionsWrapper}>
            <Typography className={classNames.categoryTitle}>
              {t(TranslationKey['Dimensions from supplier:'])}
            </Typography>
            <Typography>
              {t(TranslationKey.Length)}
              {box.lengthCmSupplier}
            </Typography>
            <Typography>
              {t(TranslationKey.Width)}
              {box.widthCmSupplier}
            </Typography>
            <Typography>
              {t(TranslationKey.Height)}
              {box.heightCmSupplier}
            </Typography>

            <Typography>
              {t(TranslationKey.Width)}
              {box.weighGrossKgSupplier}
            </Typography>
            <Typography>
              {t(TranslationKey['Volume weight'])}
              {box.volumeWeightKgSupplier}
            </Typography>
            <Typography>
              {t(TranslationKey['Final weight'])}
              {box.weighGrossKgSupplier > box.volumeWeightKgSupplier
                ? box.weighGrossKgSupplier
                : box.volumeWeightKgSupplier}
            </Typography>
          </Paper>
        ) : (
          <Paper className={classNames.demensionsWrapper}>
            <Typography className={classNames.categoryTitle}>{t(TranslationKey.Demensions)}</Typography>
            <Typography>
              {t(TranslationKey.Length)}
              {box.lengthCmWarehouse}
            </Typography>
            <Typography>
              {t(TranslationKey.Width)}
              {box.widthCmWarehouse}
            </Typography>
            <Typography>
              {t(TranslationKey.Height)}
              {box.heightCmWarehouse}
            </Typography>

            <Typography>
              {t(TranslationKey.Weight)}
              {box.weighGrossKgWarehouse}
            </Typography>
            <Typography>
              {t(TranslationKey['Volume weight'])}
              {box.volumeWeightKgWarehouse}
            </Typography>
            <Typography>
              {t(TranslationKey['Final weight'])}
              {box.weighGrossKgWarehouse > box.volumeWeightKgWarehouse
                ? box.weighGrossKgWarehouse
                : box.volumeWeightKgWarehouse}
            </Typography>
          </Paper>
        )}
      </Paper>
    </Paper>
  )
}

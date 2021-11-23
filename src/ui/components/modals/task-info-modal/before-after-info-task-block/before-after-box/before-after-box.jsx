import React from 'react'

import {Typography, Paper, Checkbox} from '@material-ui/core'

import {getDeliveryOptionByCode} from '@constants/delivery-options'
import {getOrderStatusOptionByCode} from '@constants/order-status'
import {TaskOperationType} from '@constants/task-operation-type'
import {texts} from '@constants/texts'
import {getWarehousesOptionByCode} from '@constants/warehouses'

import {Field} from '@components/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './before-after-box.style'
import {TaskInfoBoxItemCard} from './task-info-box-item-card'

const textConsts = getLocalizedTexts(texts, 'ru').beforeAfterInfoTaskBlock

export const BeforeAfterBox = ({box, isCurrentBox, taskType}) => {
  const classNames = useClassNames()

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

      <Typography className={classNames.boxTitle}>{`${textConsts.boxNum} ${box._id}`}</Typography>

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

      <Paper className={classNames.bottomBlockWrapper}>
        <div>
          <div className={classNames.chipWrapper}>
            <Typography className={classNames.subTitle}>{textConsts.shippingLabel}</Typography>
            <Typography className={classNames.shippingLabelField}>
              {box.shippingLabel ? box.shippingLabel : 'N/A'}
            </Typography>
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
              {box.lengthCmSupplier}
            </Typography>
            <Typography>
              {textConsts.width}
              {box.widthCmSupplier}
            </Typography>
            <Typography>
              {textConsts.height}
              {box.heightCmSupplier}
            </Typography>

            <Typography>
              {textConsts.weight}
              {box.weighGrossKgSupplier}
            </Typography>
            <Typography>
              {textConsts.volumeWeigh}
              {box.volumeWeightKgSupplier}
            </Typography>
            <Typography>
              {textConsts.finalWeight}
              {box.weighGrossKgSupplier > box.volumeWeightKgSupplier
                ? box.weighGrossKgSupplier
                : box.volumeWeightKgSupplier}
            </Typography>
          </Paper>
        ) : (
          <Paper className={classNames.demensionsWrapper}>
            <Typography className={classNames.categoryTitle}>{textConsts.demensionsWarehouse}</Typography>
            <Typography>
              {textConsts.length}
              {box.lengthCmWarehouse}
            </Typography>
            <Typography>
              {textConsts.width}
              {box.widthCmWarehouse}
            </Typography>
            <Typography>
              {textConsts.height}
              {box.heightCmWarehouse}
            </Typography>

            <Typography>
              {textConsts.weight}
              {box.weighGrossKgWarehouse}
            </Typography>
            <Typography>
              {textConsts.volumeWeigh}
              {box.volumeWeightKgWarehouse}
            </Typography>
            <Typography>
              {textConsts.finalWeight}
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

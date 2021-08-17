import React from 'react'

import {Divider, Typography, Paper, Checkbox} from '@material-ui/core'
import {observer} from 'mobx-react'

import {getDeliveryOptionByCode} from '@constants/delivery-options'
import {getOrderStatusOptionByCode} from '@constants/order-status'
import {TaskOperationType} from '@constants/task-operation-type'
import {texts} from '@constants/texts'
import {getWarehousesOptionByCode} from '@constants/warehouses'

import {Field} from '@components/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './before-after-info-task-block.style'
import {TaskInfoBoxItemCard} from './task-info-box-item-card'

const textConsts = getLocalizedTexts(texts, 'ru').beforeAfterInfoTaskBlock

export const BeforeAfterInfoTaskBlock = observer(({beforeBoxes, afterBoxes, taskType}) => {
  const classNames = useClassNames()

  const Box = ({box, isNewBox}) => (
    <Paper className={classNames.box}>
      {(!isNewBox || taskType === TaskOperationType.EDIT) && (
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
      )}

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
            <TaskInfoBoxItemCard item={item} index={index} superCount={box.amount} />
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
        <div className={classNames.demensionsWrapper}>
          <Typography>
            {textConsts.length}
            {box.lengthCmWarehouse || '-'}
          </Typography>
          <Typography>
            {textConsts.width}
            {box.widthCmWarehouse || '-'}
          </Typography>
          <Typography>
            {textConsts.height}
            {box.heightCmWarehouse || '-'}
          </Typography>

          <Typography>
            {textConsts.weight}
            {box.weighGrossKgWarehouse || '-'}
          </Typography>
          <Typography>
            {textConsts.volumeWeigh}
            {box.volumeWeightKgWarehouse || '-'}
          </Typography>
          <Typography>
            {textConsts.finalWeight}
            {box.weightFinalAccountingKgWarehouse || '-'}
          </Typography>
        </div>
      </Paper>
    </Paper>
  )

  return (
    <div className={classNames.boxesWrapper}>
      <div className={classNames.currentBox}>
        <Typography variant="h4">{textConsts.incom}</Typography>

        {beforeBoxes.map((box, boxIndex) => (
          <Box key={boxIndex} isCurrentBox box={box} taskType={taskType} />
        ))}
      </div>

      <Divider flexItem className={classNames.divider} orientation="vertical" />

      {afterBoxes.length > 0 && (
        <div className={classNames.newBoxes}>
          <Typography variant="h4">{textConsts.newBoxes}</Typography>

          {afterBoxes.map((box, boxIndex) => (
            <Box key={boxIndex} isNewBox box={box} taskType={taskType} newBoxes={afterBoxes} />
          ))}
        </div>
      )}
    </div>
  )
})

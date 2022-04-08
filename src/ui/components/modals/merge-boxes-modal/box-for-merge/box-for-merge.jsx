import React from 'react'

import {IconButton, InputLabel, Typography} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

import {texts} from '@constants/texts'

import {Input} from '@components/input'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './box-for-merge.style'

const textConsts = getLocalizedTexts(texts, 'ru').mergeBoxModal

export const BoxForMerge = ({box, readOnly = false, index, onRemoveBox}) => {
  const classNames = useClassNames()

  return (
    <div className={classNames.box}>
      <Typography className={classNames.boxTitle}>{box.humanFriendlyId}</Typography>
      <div className={classNames.itemsWrapper}>
        <div>
          {box.items.map((order, orderIndex) => (
            <div key={`box_${box._id}_${readOnly ? 1 : 0}_${index}`}>
              <div key={orderIndex} className={classNames.order}>
                <img
                  className={classNames.img}
                  src={order.product.images && order.product.images[0] && getAmazonImageUrl(order.product.images[0])}
                />
                <Typography className={classNames.title}>
                  {orderIndex + 1 + '. ' + order.product.amazonTitle}
                </Typography>
                <Typography className={classNames.subTitle}>{'qty'}</Typography>
                <Input
                  disabled
                  classes={{root: classNames.inputWrapper, input: classNames.input}}
                  readOnly={readOnly}
                  value={order.amount}
                />
              </div>
            </div>
          ))}
        </div>

        <div>
          <InputLabel className={classNames.modalText}>{textConsts.warehouse}</InputLabel>
          {/* <NativeSelect
            disabled
            variant="filled"
            value={box.warehouse}
            className={classNames.nativeSelect}
            input={<Input />}
          >
            {Object.keys(warehouses).map((warehouseCode, warehouseIndex) => {
              const warehouseKey = warehouses[warehouseCode]
              return (
                <option key={warehouseIndex} value={warehouseCode}>
                  {warehouseKey}
                </option>
              )
            })}
          </NativeSelect> */}

          <Typography variant="h6">{box.destination?.name}</Typography>
        </div>

        <div>
          <InputLabel className={classNames.modalText}>{textConsts.storekeeper}</InputLabel>

          <Typography variant="h6">{box.storekeeper?.name}</Typography>
        </div>

        <IconButton onClick={() => onRemoveBox(box._id)}>
          <DeleteIcon className={classNames.deleteBtn} />
        </IconButton>
      </div>
    </div>
  )
}

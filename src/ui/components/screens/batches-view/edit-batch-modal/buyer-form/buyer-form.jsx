import React from 'react'

import {Box, InputLabel, NativeSelect, Paper, Typography, Checkbox} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Input} from '@components/input'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './buyer-form.style'

const textConsts = getLocalizedTexts(texts, 'en').batchesModalEditFillList

export const BuyerForm = ({
  warehouseCheckbox,
  warehouse,
  setWarehouse,
  setWarehouseCheckbox,
  deliveryCheckbox,
  setDeliveryCheckbox,
  setDelivery,
  setStatus,
  delivery,
  status,
  warehouseList,
  deliveryOptions,
}) => {
  const classNames = useClassNames()

  return (
    <Paper elevation={0} className={classNames.mainPaperWrapper}>
      <Typography className={classNames.modalText}>{textConsts.listFills}</Typography>
      <Typography className={(classNames.modalText, classNames.typoSetChoosenBoxes)}>{textConsts.setValues}</Typography>
      <Box mt={3} className={classNames.boxTypeCheckbox}>
        <Checkbox checked={warehouseCheckbox} onChange={() => setWarehouseCheckbox(prev => !prev)} />
        <Box ml={1}>
          <InputLabel id="warehouse">{textConsts.warehouse}</InputLabel>
          <NativeSelect
            variant="filled"
            inputProps={{
              name: 'warehouse',
              id: 'warehouse',
            }}
            disabled={!warehouseCheckbox}
            value={warehouse}
            className={classNames.selectWareHouse}
            input={<Input />}
            onChange={e => setWarehouse(e.target.value)}
          >
            {warehouseList.map((warehouseItem, warehouseIndex) => (
              <option key={warehouseIndex} value={warehouseItem.value}>
                {warehouseItem.text}
              </option>
            ))}
          </NativeSelect>
        </Box>
      </Box>
      <Box mt={3} className={classNames.boxTypeCheckbox}>
        <Checkbox checked={deliveryCheckbox} onChange={() => setDeliveryCheckbox(prev => !prev)} />
        <Box className={classNames.boxDeliveryMathod}>
          <InputLabel id="delivery">{textConsts.deliveryMathod}</InputLabel>
          <NativeSelect
            variant="filled"
            inputProps={{
              name: 'warehouse',
              id: 'warehouse',
            }}
            disabled={!deliveryCheckbox}
            value={delivery}
            className={classNames.selectWareHouse}
            input={<Input />}
            onChange={e => setDelivery(e.target.value)}
          >
            {deliveryOptions.map((deliveryOption, deliveryIndex) => (
              <option key={`deliveryOption_${deliveryOption.key}_${deliveryIndex}`} value={deliveryOption.key}>
                {deliveryOption.label}
              </option>
            ))}
          </NativeSelect>
        </Box>
      </Box>
      <Box mt={3}>
        <Typography className={classNames.modalText}>{textConsts.typoStarus}</Typography>
        <NativeSelect
          variant="filled"
          inputProps={{
            name: 'status',
            id: 'status',
          }}
          value={status}
          className={classNames.selectStatus}
          input={<Input />}
          onChange={e => setStatus(e.target.value)}
        >
          <option value={'Подготовлена'}>{textConsts.valuePrepare}</option>
          <option value={'Отправлена со склада'}>{textConsts.valueSendFromWarehouse}</option>
          <option value={'Отправлена'}>{textConsts.valueSend}</option>
          <option value={'Получена'}>{textConsts.valueReceived}</option>
        </NativeSelect>
      </Box>
      <Box mt={3}>
        <Typography className={classNames.modalText}>{textConsts.treckerNum}</Typography>
        <Input />
      </Box>
      <Box mt={2} className={classNames.boxCloseBatch}>
        <Typography className={classNames.modalText}>{textConsts.typoCloseButch}</Typography>
        <Checkbox />
      </Box>
    </Paper>
  )
}

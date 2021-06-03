import React from 'react'

import {Box, Grid, InputLabel, NativeSelect, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Input} from '@components/input'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './select-fields.style'

const textConsts = getLocalizedTexts(texts, 'en').ordersViewsModalSelectFields

export const SelectFields = ({
  setWarehouse,
  warehouse,
  delivery,
  setDelivery,
  status,
  setStatus,
  order,
  comment,
  setComment,
  warehouseList,
  deliveryList,
  statusList,
}) => {
  const classNames = useClassNames()

  return (
    <Grid container justify="space-around">
      <Grid item>
        <Box mt={3}>
          <InputLabel id="warehouse-select" className={classNames.modalText}>
            {textConsts.warehouse}
          </InputLabel>
          <NativeSelect
            variant="filled"
            inputProps={{
              name: 'warehouse-select',
              id: 'warehouse-select',
            }}
            value={warehouse}
            className={classNames.nativeSelect}
            input={<Input />}
            onChange={e => setWarehouse(e.target.value)}
          >
            <option value={'None'}>{textConsts.valueNone}</option>
            {warehouseList.map((warehouseItem, warehouseIndex) => (
              <option key={warehouseIndex} value={warehouseItem.value}>
                {warehouseItem.text}
              </option>
            ))}
          </NativeSelect>
        </Box>
        <Box mt={3}>
          <InputLabel id="delivery-select" className={classNames.modalText}>
            {textConsts.deliveryMethod}
          </InputLabel>
          <NativeSelect
            variant="filled"
            inputProps={{
              name: 'delivery-select',
              id: 'delivery-select',
            }}
            value={delivery}
            className={classNames.nativeSelect}
            input={<Input />}
            onChange={e => setDelivery(e.target.value)}
          >
            {deliveryList.map((deliveryItem, deliveryIndex) => (
              <option key={deliveryIndex} value={deliveryItem.value}>
                {deliveryItem.text}
              </option>
            ))}
          </NativeSelect>
        </Box>
        <Box mt={3}>
          <InputLabel id="status-select" className={classNames.modalText}>
            {textConsts.typoStatus}
          </InputLabel>
          <NativeSelect
            variant="filled"
            inputProps={{
              name: 'status-select',
              id: 'status-select',
            }}
            value={status}
            className={classNames.nativeSelect}
            input={<Input />}
            onChange={e => setStatus(e.target.value)}
          >
            {statusList.map((statusItem, statusIndex) => (
              <option key={statusIndex} value={statusItem.value}>
                {statusItem.text}
              </option>
            ))}
          </NativeSelect>
        </Box>
      </Grid>
      <Grid item>
        <Box my={3}>
          <Typography className={classNames.modalText}>{textConsts.typoClientComment}</Typography>
          <Input disabled value={order.clientComment} />
        </Box>
        <Box my={3}>
          <Typography className={classNames.modalText}>{textConsts.typoBuyerComment}</Typography>
          <Input value={comment} onChange={e => setComment(e.target.value)} />
        </Box>
        <Box my={3}>
          <Typography className={classNames.modalText}>{textConsts.typoShipPrice}</Typography>
          <Input type="number" className={classNames.numInput} />
        </Box>
      </Grid>
    </Grid>
  )
}

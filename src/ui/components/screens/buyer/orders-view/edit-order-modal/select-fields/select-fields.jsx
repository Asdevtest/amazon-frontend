import React from 'react'

import {Box, Grid, InputLabel, NativeSelect, Typography} from '@material-ui/core'

import {getDeliveryOptionByCode} from '@constants/delivery-options'
import {getOrderStatusOptionByCode} from '@constants/order-status'
import {texts} from '@constants/texts'

import {Input} from '@components/input'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './select-fields.style'

const textConsts = getLocalizedTexts(texts, 'en').ordersViewsModalSelectFields

export const SelectFields = ({setOrderField, orderFields, warehouses, deliveryTypeByCode, orderStatusByCode}) => {
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
            value={orderFields.warehouse}
            className={classNames.nativeSelect}
            input={<Input />}
            onChange={setOrderField('warehouse')}
          >
            <option value={'None'}>{textConsts.valueNone}</option>
            {Object.keys(warehouses).map((warehouseCode, warehouseIndex) => {
              const warehouseKey = warehouses[warehouseCode]
              return (
                <option key={warehouseIndex} value={warehouseCode}>
                  {warehouseKey}
                </option>
              )
            })}
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
            value={orderFields.deliveryMethod}
            className={classNames.nativeSelect}
            input={<Input />}
            onChange={setOrderField('deliveryMethod')}
          >
            {Object.keys(deliveryTypeByCode).map((deliveryCode, deliveryIndex) => (
              <option key={deliveryIndex} value={deliveryCode}>
                {getDeliveryOptionByCode(deliveryCode).label}
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
            value={orderFields.status}
            className={classNames.nativeSelect}
            input={<Input />}
            onChange={setOrderField('status')}
          >
            {Object.keys(orderStatusByCode).map((statusCode, statusIndex) => (
              <option key={statusIndex} value={statusCode}>
                {getOrderStatusOptionByCode(statusCode).label}
              </option>
            ))}
          </NativeSelect>
        </Box>
      </Grid>
      <Grid item>
        <Box my={3}>
          <Typography className={classNames.modalText}>{textConsts.typoClientComment}</Typography>
          <Input
            disabled
            multiline
            rows={4}
            rowsMax={6}
            className={classNames.commentInput}
            value={orderFields.clientComment}
            onChange={setOrderField('clientComment')}
          />
        </Box>
        <Box my={3}>
          <Typography className={classNames.modalText}>{textConsts.typoBuyerComment}</Typography>
          <Input
            multiline
            rows={4}
            rowsMax={6}
            className={classNames.commentInput}
            value={orderFields.buyerscomment}
            onChange={setOrderField('buyerscomment')}
          />
        </Box>
        <Box my={3}>
          <Typography className={classNames.modalText}>{textConsts.typoShipPrice}</Typography>
          <Input type="number" className={classNames.numInput} />
        </Box>
      </Grid>
    </Grid>
  )
}

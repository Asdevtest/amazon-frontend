import React, {useState} from 'react'

import {Box, Grid, InputLabel, NativeSelect, Typography, Checkbox} from '@material-ui/core'

import {getDeliveryOptionByCode} from '@constants/delivery-options'
import {getOrderStatusOptionByCode} from '@constants/order-status'
import {texts} from '@constants/texts'

import {Input} from '@components/input'

import {calcExchangePrice, calcPriceForItem} from '@utils/calculation'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './select-fields.style'

const textConsts = getLocalizedTexts(texts, 'en').ordersViewsModalSelectFields

const defaultYuansToDollarRate = 6.3

export const SelectFields = ({
  setOrderField,
  resetOrderField,
  orderFields,
  warehouses,
  deliveryTypeByCode,
  orderStatusByCode,
}) => {
  const classNames = useClassNames()

  const [supplierPaidDelivery, setSupplierPaidDelivery] = useState(false)

  const [priceYuansForBatch, setPriceYuansForBatch] = useState('')
  const [usePriceInDollars, setUsePriceInDollars] = useState(false)
  const [yuansToDollarRate, setYuansToDollarRate] = useState(defaultYuansToDollarRate)

  return (
    <Grid container justify="space-around">
      <Grid item>
        <Box mt={3}>
          <InputLabel id="warehouse-select" className={classNames.modalText}>
            {textConsts.warehouse}
          </InputLabel>
          <NativeSelect
            disabled
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
            disabled
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

        <div className={classNames.priceOptionsWrapper}>
          <Box className={classNames.tableCell}>
            <Typography className={classNames.modalText}>{textConsts.priceYuansForBatchTypo}</Typography>
            <Input
              disabled={usePriceInDollars}
              value={priceYuansForBatch}
              className={classNames.input}
              onChange={e => {
                setPriceYuansForBatch(e.target.value)
                setOrderField('amountPaymentPerConsignmentAtDollars')({
                  target: {value: calcExchangePrice(e.target.value, yuansToDollarRate)},
                })
              }}
            />
            <div className={classNames.checkboxWithLabelWrapper}>
              <Checkbox
                value={usePriceInDollars}
                color="primary"
                onChange={() => {
                  if (!usePriceInDollars) {
                    setPriceYuansForBatch('')
                    setYuansToDollarRate(defaultYuansToDollarRate)
                  }
                  setUsePriceInDollars(!usePriceInDollars)
                }}
              />
              <Typography>{textConsts.usePriceInDollars}</Typography>
            </div>
          </Box>
          <Box className={classNames.tableCell}>
            <Typography className={classNames.modalText}>{textConsts.yuansToDollarRateTypo}</Typography>
            <Input
              disabled={usePriceInDollars}
              value={yuansToDollarRate || 6.3}
              className={classNames.input}
              onChange={e => {
                setYuansToDollarRate(e.target.value)
                setOrderField('amountPaymentPerConsignmentAtDollars')({
                  target: {value: calcExchangePrice(priceYuansForBatch, e.target.value)},
                })
              }}
            />
          </Box>
          <Box className={classNames.tableCell}>
            <Typography className={classNames.modalText}>
              {textConsts.amountPaymentPerConsignmentAtDollarsTypo}
            </Typography>
            <Input
              disabled={!usePriceInDollars}
              value={orderFields.amountPaymentPerConsignmentAtDollars}
              className={classNames.input}
              onChange={setOrderField('amountPaymentPerConsignmentAtDollars')}
            />
          </Box>
          <Box className={classNames.tableCell}>
            <Typography className={classNames.modalText}>{textConsts.costPriceAmount}</Typography>
            {calcPriceForItem(orderFields.amountPaymentPerConsignmentAtDollars, orderFields.amount)}
          </Box>
        </div>
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
            value={orderFields.buyerComment}
            onChange={setOrderField('buyerComment')}
          />
        </Box>
        <Box my={3}>
          <div className={classNames.checkboxWithLabelWrapper}>
            <Checkbox
              checked={supplierPaidDelivery}
              color="primary"
              onChange={() => {
                resetOrderField('deliveryCostToTheWarehouse')
                setSupplierPaidDelivery(!supplierPaidDelivery)
              }}
            />
            <Typography className={classNames.modalText}>{textConsts.supplierPaidDelivery}</Typography>
          </div>
        </Box>

        <Box>
          <div className={classNames.barCodeWrapper}>
            <Checkbox
              color="primary"
              disabled={!orderFields.product.barCode}
              checked={orderFields.isBarCodeAlreadyAttachedByTheSupplier}
              onChange={() => {
                setOrderField('isBarCodeAlreadyAttachedByTheSupplier')({
                  target: {value: !orderFields.isBarCodeAlreadyAttachedByTheSupplier},
                })
              }}
            />
            <Typography className={classNames.modalText}>{textConsts.supplierAddBarCode}</Typography>
            <Typography>{'Баркод:'}</Typography>
            <Typography className={classNames.barCodeText}>{orderFields.product.barCode || 'N/A'}</Typography>
          </div>
        </Box>
        <Box my={3}>
          <Typography className={classNames.modalText}>{textConsts.typoShipPrice}</Typography>
          <Input
            disabled={supplierPaidDelivery}
            className={classNames.numInput}
            value={`$ ${orderFields.deliveryCostToTheWarehouse || 0}`}
            onChange={setOrderField('deliveryCostToTheWarehouse')}
          />
        </Box>
        <Box my={3}>
          <Typography className={classNames.modalText}>{textConsts.trackNumberTypo}</Typography>
          <Input
            type="text"
            value={orderFields.trackingNumberChina}
            className={classNames.numInput}
            onChange={setOrderField('trackingNumberChina')}
          />
        </Box>
      </Grid>
    </Grid>
  )
}

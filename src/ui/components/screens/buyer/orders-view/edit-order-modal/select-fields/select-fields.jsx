import React, {useState} from 'react'

import {Box, Grid, InputLabel, NativeSelect, Typography, Checkbox} from '@material-ui/core'
import clsx from 'clsx'

import {getDeliveryOptionByCode} from '@constants/delivery-options'
import {getOrderStatusOptionByCode, OrderStatusByCode, OrderStatusByKey, OrderStatus} from '@constants/order-status'
import {texts} from '@constants/texts'

import {Input} from '@components/input'

import {calcExchangeDollarsInYuansPrice, calcExchangePrice, calcPriceForItem} from '@utils/calculation'
import {checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot} from '@utils/checks'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {toFixed, withDollarSign, withYuanSign} from '@utils/text'

import {useClassNames} from './select-fields.style'

const textConsts = getLocalizedTexts(texts, 'en').ordersViewsModalSelectFields

const defaultYuansToDollarRate = 6.3

const allowOrderStatuses = [
  `${OrderStatusByKey[OrderStatus.AT_PROCESS]}`,
  `${OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER]}`,
  `${OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED]}`,
  `${OrderStatusByKey[OrderStatus.RETURN_ORDER]}`,
]

export const SelectFields = ({order, setOrderField, resetOrderField, orderFields, warehouses, deliveryTypeByCode}) => {
  const classNames = useClassNames()

  const [supplierPaidDelivery, setSupplierPaidDelivery] = useState(!(orderFields.deliveryCostToTheWarehouse > 0))

  const [priceYuansForBatch, setPriceYuansForBatch] = useState('')
  const [usePriceInDollars, setUsePriceInDollars] = useState(true)
  const [yuansToDollarRate, setYuansToDollarRate] = useState(defaultYuansToDollarRate)

  const [checkIsPlanningPrice, setCheckIsPlanningPrice] = useState(
    orderFields.totalPriceChanged === orderFields.totalPrice,
  )

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
            {Object.keys({
              ...getObjectFilteredByKeyArrayWhiteList(
                OrderStatusByCode,
                allowOrderStatuses.filter(el => el >= order.status),
              ),
            }).map((statusCode, statusIndex) => (
              <option key={statusIndex} value={statusCode}>
                {getOrderStatusOptionByCode(statusCode).label}
              </option>
            ))}
          </NativeSelect>
        </Box>

        <div
          className={clsx(classNames.priceOptionsWrapper, {
            [classNames.disabledPriceOptionsWrapper]: checkIsPlanningPrice,
          })}
        >
          <Box className={classNames.noFlexElement}>
            <Typography className={classNames.modalText}>{textConsts.priceYuansForBatchTypo}</Typography>
            <Input
              disabled={usePriceInDollars || checkIsPlanningPrice}
              inputProps={{maxLength: 24}}
              value={
                usePriceInDollars
                  ? calcExchangeDollarsInYuansPrice(orderFields.totalPriceChanged, yuansToDollarRate)
                  : priceYuansForBatch
              }
              className={classNames.input}
              onChange={e => {
                if (checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value)) {
                  setPriceYuansForBatch(e.target.value)
                  setOrderField('totalPriceChanged')({
                    target: {value: toFixed(Number(calcExchangePrice(e.target.value, yuansToDollarRate)), 2)},
                  })
                }
              }}
            />
            <div className={classNames.checkboxWithLabelWrapper}>
              <Checkbox
                disabled={checkIsPlanningPrice}
                checked={usePriceInDollars}
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
          <Box className={classNames.noFlexElement}>
            <Typography className={classNames.modalText}>{textConsts.yuansToDollarRateTypo}</Typography>
            <Input
              disabled={usePriceInDollars || checkIsPlanningPrice}
              inputProps={{maxLength: 24}}
              value={yuansToDollarRate || 6.3}
              className={classNames.input}
              onChange={e => {
                if (!isNaN(e.target.value) || Number(e.target.value) < 0) {
                  setYuansToDollarRate(e.target.value)
                  setOrderField('totalPriceChanged')({
                    target: {value: calcExchangePrice(priceYuansForBatch, e.target.value)},
                  })
                }
              }}
            />
          </Box>
          <Box className={classNames.noFlexElement}>
            <Typography className={classNames.modalText}>{textConsts.totalPriceChanged}</Typography>
            <Input
              disabled={!usePriceInDollars || checkIsPlanningPrice}
              inputProps={{maxLength: 24}}
              value={orderFields.totalPriceChanged}
              className={classNames.input}
              onChange={setOrderField('totalPriceChanged')}
            />
          </Box>
          <Box className={classNames.noFlexElement}>
            <Typography className={classNames.modalText}>{textConsts.costPriceAmount}</Typography>
            {calcPriceForItem(orderFields.totalPriceChanged, orderFields.amount)}
          </Box>
        </div>

        <div className={classNames.checkboxWithLabelWrapper}>
          <Checkbox
            checked={checkIsPlanningPrice}
            color="primary"
            onChange={() => {
              setCheckIsPlanningPrice(!checkIsPlanningPrice)
              setOrderField('totalPriceChanged')({
                target: {value: orderFields.totalPrice},
              })
              setPriceYuansForBatch(calcExchangeDollarsInYuansPrice(orderFields.totalPrice, yuansToDollarRate))
            }}
          />
          <Typography>{textConsts.checkIsPlanningPriceText}</Typography>
        </div>

        <div className={classNames.totalPriceWrapper}>
          <Box className={classNames.tableCell}>
            <Typography className={classNames.totalPrice}>{textConsts.totalPriceInYuans}</Typography>
            <Input
              disabled
              value={withYuanSign(calcExchangeDollarsInYuansPrice(orderFields.totalPrice, yuansToDollarRate))}
              className={classNames.input}
            />
          </Box>

          <Box className={classNames.tableCell}>
            <Typography className={classNames.totalPrice}>{textConsts.totalPrice}</Typography>
            <Input disabled value={withDollarSign(orderFields.totalPrice)} className={classNames.input} />
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
            inputProps={{maxLength: 500}}
            rows={4}
            rowsMax={6}
            className={classNames.commentInput}
            value={orderFields.buyerComment}
            onChange={setOrderField('buyerComment')}
          />
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

        <Box my={3}>
          <Typography className={classNames.modalText}>{textConsts.typoShipPrice}</Typography>
          <Input
            disabled={supplierPaidDelivery}
            inputProps={{maxLength: 24}}
            className={clsx(classNames.numInput, {
              [classNames.errorInput]: orderFields.deliveryCostToTheWarehouse < 1 && !supplierPaidDelivery,
            })}
            value={orderFields.deliveryCostToTheWarehouse}
            onChange={setOrderField('deliveryCostToTheWarehouse')}
          />
        </Box>
        <Box my={3}>
          <Typography className={classNames.modalText}>{textConsts.trackNumberTypo}</Typography>
          <Input
            inputProps={{maxLength: 50}}
            value={orderFields.trackingNumberChina}
            className={classNames.numWideInput}
            onChange={setOrderField('trackingNumberChina')}
          />
        </Box>
      </Grid>
    </Grid>
  )
}

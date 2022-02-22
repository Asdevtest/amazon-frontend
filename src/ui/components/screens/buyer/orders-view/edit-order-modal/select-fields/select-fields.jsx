import React, {useState} from 'react'

import {Box, Grid, InputLabel, NativeSelect, Typography, Checkbox} from '@material-ui/core'
import clsx from 'clsx'

import {getDeliveryOptionByCode} from '@constants/delivery-options'
import {getOrderStatusOptionByCode, OrderStatusByCode, OrderStatusByKey, OrderStatus} from '@constants/order-status'
import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {ImageFileInput} from '@components/image-file-input'
import {Input} from '@components/input'
import {BigImagesModal} from '@components/modals/big-images-modal'

import {calcExchangeDollarsInYuansPrice, calcExchangePrice, calcPriceForItem} from '@utils/calculation'
import {checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot} from '@utils/checks'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {toFixed, withDollarSign, withYuanSign} from '@utils/text'

import {useClassNames} from './select-fields.style'

const textConsts = getLocalizedTexts(texts, 'en').ordersViewsModalSelectFields

const allowOrderStatuses = [
  `${OrderStatusByKey[OrderStatus.AT_PROCESS]}`,
  `${OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]}`,
  `${OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER]}`,
  `${OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED]}`,
  `${OrderStatusByKey[OrderStatus.RETURN_ORDER]}`,
]

export const SelectFields = ({
  photosToLoad,
  order,
  setOrderField,
  orderFields,
  warehouses,
  deliveryTypeByCode,
  showProgress,
  progressValue,
  setPhotosToLoad,
}) => {
  const classNames = useClassNames()

  const [priceYuansForBatch, setPriceYuansForBatch] = useState('')
  const [priceYuansDeliveryCostToTheWarehouse, setPriceYuansDeliveryCostToTheWarehouse] = useState('')

  const [usePriceInDollars, setUsePriceInDollars] = useState(true)

  const [checkIsPlanningPrice, setCheckIsPlanningPrice] = useState(
    orderFields.totalPriceChanged === orderFields.totalPrice,
  )

  const [showPhotosModal, setShowPhotosModal] = useState(false)

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
            disabled={order.status !== orderFields.status}
            variant="filled"
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
              <option
                key={statusIndex}
                value={statusCode}
                className={clsx({
                  [classNames.disableSelect]:
                    statusCode === `${OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]}`,
                })}
                disabled={statusCode === `${OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]}`}
              >
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
            <div className={classNames.onLineWrapper}>
              <div>
                <Typography className={classNames.modalText}>{textConsts.priceYuansForBatchTypo}</Typography>
                <Input
                  disabled={usePriceInDollars || checkIsPlanningPrice}
                  inputProps={{maxLength: 24}}
                  value={
                    usePriceInDollars
                      ? calcExchangeDollarsInYuansPrice(orderFields.totalPriceChanged, orderFields.yuanToDollarRate)
                      : priceYuansForBatch
                  }
                  className={classNames.input}
                  onChange={e => {
                    if (checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value)) {
                      setPriceYuansForBatch(e.target.value)
                      setOrderField('totalPriceChanged')({
                        target: {
                          value: toFixed(Number(calcExchangePrice(e.target.value, orderFields.yuanToDollarRate)), 2),
                        },
                      })
                    }
                  }}
                />
              </div>

              <div>
                <Typography className={classNames.modalText}>
                  {textConsts.priceYuansDeliveryCostToTheWarehouse}
                </Typography>
                <Input
                  disabled={usePriceInDollars || checkIsPlanningPrice}
                  inputProps={{maxLength: 24}}
                  value={
                    usePriceInDollars
                      ? calcExchangeDollarsInYuansPrice(
                          orderFields.deliveryCostToTheWarehouse,
                          orderFields.yuanToDollarRate,
                        )
                      : priceYuansDeliveryCostToTheWarehouse
                  }
                  className={classNames.input}
                  onChange={e => {
                    if (checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value)) {
                      setPriceYuansDeliveryCostToTheWarehouse(e.target.value)
                      setOrderField('deliveryCostToTheWarehouse')({
                        target: {
                          value: toFixed(Number(calcExchangePrice(e.target.value, orderFields.yuanToDollarRate)), 2),
                        },
                      })
                    }
                  }}
                />
              </div>
            </div>

            <div className={classNames.checkboxWithLabelWrapper}>
              <Checkbox
                disabled={checkIsPlanningPrice}
                checked={usePriceInDollars}
                color="primary"
                onChange={() => {
                  setPriceYuansForBatch(
                    calcExchangeDollarsInYuansPrice(orderFields.totalPriceChanged, orderFields.yuanToDollarRate),
                  )
                  setUsePriceInDollars(!usePriceInDollars)
                }}
              />
              <Typography>{textConsts.usePriceInDollars}</Typography>
            </div>
          </Box>
          <Box className={classNames.noFlexElement}>
            <Typography className={classNames.modalText}>{textConsts.yuansToDollarRateTypo}</Typography>
            <Input
              disabled={checkIsPlanningPrice}
              inputProps={{maxLength: 24}}
              value={orderFields.yuanToDollarRate}
              className={classNames.input}
              onChange={e => {
                if (!isNaN(e.target.value) || (Number(e.target.value) < 0 && !checkIsPlanningPrice)) {
                  setOrderField('yuanToDollarRate')({
                    target: {value: e.target.value},
                  })
                }
              }}
            />
          </Box>
          <Box className={classNames.noFlexElement}>
            <div className={classNames.onLineWrapper}>
              <div>
                <Typography className={classNames.modalText}>{textConsts.totalPriceChanged}</Typography>
                <Input
                  disabled={!usePriceInDollars || checkIsPlanningPrice}
                  inputProps={{maxLength: 24}}
                  value={
                    !usePriceInDollars
                      ? calcExchangePrice(priceYuansForBatch, orderFields.yuanToDollarRate)
                      : orderFields.totalPriceChanged
                  }
                  className={classNames.input}
                  onChange={setOrderField('totalPriceChanged')}
                />
              </div>

              <div>
                <Typography className={classNames.modalText}>{textConsts.deliveryCostToTheWarehouse}</Typography>
                <Input
                  disabled={!usePriceInDollars || checkIsPlanningPrice}
                  inputProps={{maxLength: 24}}
                  value={orderFields.deliveryCostToTheWarehouse}
                  className={classNames.input}
                  onChange={setOrderField('deliveryCostToTheWarehouse')}
                />
              </div>
            </div>
          </Box>
          <Box className={classNames.noFlexElement}>
            <Typography className={classNames.modalText}>{textConsts.costPriceAmount}</Typography>
            {calcPriceForItem(orderFields.totalPriceChanged, orderFields.amount)}
          </Box>
        </div>

        <div className={classNames.checkboxWithLabelWrapper}>
          <Checkbox
            disabled={
              ![
                OrderStatusByKey[OrderStatus.AT_PROCESS],
                OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE],
              ].includes(orderFields.status)
            }
            checked={checkIsPlanningPrice}
            color="primary"
            onChange={() => {
              setCheckIsPlanningPrice(!checkIsPlanningPrice)
              setOrderField('totalPriceChanged')({
                target: {value: orderFields.totalPrice},
              })
              setPriceYuansForBatch(
                calcExchangeDollarsInYuansPrice(orderFields.totalPrice, orderFields.yuanToDollarRate),
              )
            }}
          />
          <Typography>{textConsts.checkIsPlanningPriceText}</Typography>
        </div>

        <div className={classNames.totalPriceWrapper}>
          <Box className={classNames.tableCell}>
            <Typography className={classNames.totalPrice}>{textConsts.totalPriceInYuans}</Typography>
            <Input
              disabled
              value={withYuanSign(
                calcExchangeDollarsInYuansPrice(orderFields.totalPrice, orderFields.yuanToDollarRate),
              )}
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
            <div className={classNames.checkboxWithLabelWrapper}>
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
            </div>

            <Typography>{'Баркод:'}</Typography>
            <Typography className={classNames.barCodeText}>{orderFields.product.barCode || 'N/A'}</Typography>
          </div>
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

        <div>
          <div className={classNames.imageFileInputWrapper}>
            <ImageFileInput images={photosToLoad} setImages={setPhotosToLoad} maxNumber={50} />
          </div>

          <Button
            disableElevation
            disabled={order.images === null || order.images.length < 1}
            color="primary"
            className={classNames.imagesButton}
            variant="contained"
            onClick={() => setShowPhotosModal(!showPhotosModal)}
          >
            {textConsts.orderImagesBtn}
          </Button>
        </div>
      </Grid>

      {showProgress && <CircularProgressWithLabel value={progressValue} title={textConsts.circularProgressTitle} />}

      <BigImagesModal
        isAmazone
        openModal={showPhotosModal}
        setOpenModal={() => setShowPhotosModal(!showPhotosModal)}
        images={order.images || []}
      />
    </Grid>
  )
}

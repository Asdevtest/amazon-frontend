import React, {useState} from 'react'

import {Box, Grid, InputLabel, NativeSelect, Typography, Checkbox, Link} from '@material-ui/core'
import clsx from 'clsx'

import {getOrderStatusOptionByCode, OrderStatusByCode, OrderStatusByKey, OrderStatus} from '@constants/order-status'
import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {Input} from '@components/input'
import {BigImagesModal} from '@components/modals/big-images-modal'
import {UploadFilesInput} from '@components/upload-files-input'

import {calcExchangeDollarsInYuansPrice, calcExchangePrice, calcPriceForItem} from '@utils/calculation'
import {checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot} from '@utils/checks'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {checkAndMakeAbsoluteUrl, toFixed, toFixedWithDollarSign, toFixedWithYuanSign} from '@utils/text'

import {useClassNames} from './select-fields.style'

const textConsts = getLocalizedTexts(texts, 'en').ordersViewsModalSelectFields

const allowOrderStatuses = [
  `${OrderStatusByKey[OrderStatus.AT_PROCESS]}`,
  `${OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]}`,
  `${OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER]}`,
  `${OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED]}`,
  `${OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER]}`,
  `${OrderStatusByKey[OrderStatus.CANCELED_BY_CLIENT]}`,
  `${OrderStatusByKey[OrderStatus.IN_STOCK]}`,
]

const disabledOrderStatuses = [
  `${OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]}`,
  `${OrderStatusByKey[OrderStatus.CANCELED_BY_CLIENT]}`,
  `${OrderStatusByKey[OrderStatus.IN_STOCK]}`,
]

export const SelectFields = ({
  photosToLoad,
  order,
  setOrderField,
  orderFields,
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

          <Input disabled variant="filled" value={order.destination?.name} className={classNames.nativeSelect} />
        </Box>

        <Box mt={3}>
          <InputLabel id="warehouse-select" className={classNames.modalText}>
            {textConsts.interimWarehouse}
          </InputLabel>
          <NativeSelect
            disabled
            variant="filled"
            value={order.storekeeper?.name}
            className={classNames.nativeSelect}
            input={<Input />}
          >
            <option value={'None'}>{order.storekeeper?.name}</option>
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
                  [classNames.disableSelect]: disabledOrderStatuses.includes(statusCode),
                })}
                disabled={disabledOrderStatuses.includes(statusCode)}
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
                  inputProps={{maxLength: 10}}
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
                  inputProps={{maxLength: 10}}
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
                    if (
                      checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value) &&
                      e.target.value < priceYuansForBatch
                    ) {
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
              inputProps={{maxLength: 10}}
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
                  inputProps={{maxLength: 10}}
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
                  inputProps={{maxLength: 10}}
                  value={orderFields.deliveryCostToTheWarehouse}
                  className={classNames.input}
                  onChange={e =>
                    +e.target.value < orderFields.totalPriceChanged && setOrderField('deliveryCostToTheWarehouse')(e)
                  }
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
              value={toFixedWithYuanSign(
                calcExchangeDollarsInYuansPrice(orderFields.totalPrice, orderFields.yuanToDollarRate),
                2,
              )}
              className={classNames.input}
            />
          </Box>

          <Box className={classNames.tableCell}>
            <Typography className={classNames.totalPrice}>{textConsts.totalPrice}</Typography>
            <Input disabled value={toFixedWithDollarSign(orderFields.totalPrice, 2)} className={classNames.input} />
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
            {/* <div className={classNames.checkboxWithLabelWrapper}>
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
            </div> */}

            <div className={classNames.barCodeLinkWrapper}>
              <div>
                <Typography>{'Баркод:'}</Typography>

                {orderFields.product.barCode ? (
                  <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(orderFields.product.barCode)}>
                    <Typography className={classNames.link}>{orderFields.product.barCode}</Typography>
                  </Link>
                ) : (
                  <Typography className={classNames.barCodeText}>{'N/A'}</Typography>
                )}
              </div>
            </div>
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
            <UploadFilesInput images={photosToLoad} setImages={setPhotosToLoad} maxNumber={50} />
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

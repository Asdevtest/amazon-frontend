import React, {useState} from 'react'

import {Box, Grid, NativeSelect, Typography, Checkbox, Link} from '@material-ui/core'
import clsx from 'clsx'

import {getOrderStatusOptionByCode, OrderStatusByCode, OrderStatusByKey, OrderStatus} from '@constants/order-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {PhotoAndFilesCarousel} from '@components/custom-carousel/custom-carousel'
import {Field} from '@components/field/field'
import {Input} from '@components/input'
import {BigImagesModal} from '@components/modals/big-images-modal'
import {UploadFilesInput} from '@components/upload-files-input'

import {calcExchangeDollarsInYuansPrice, calcExchangePrice, calcPriceForItem} from '@utils/calculation'
import {checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot} from '@utils/checks'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {
  checkAndMakeAbsoluteUrl,
  getFullTariffTextForBoxOrOrder,
  toFixed,
  toFixedWithDollarSign,
  toFixedWithYuanSign,
} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './select-fields.style'

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
  hsCode,
  setHsCode,
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
        <Field
          disabled
          tooltipInfoContent={t(TranslationKey["Amazon's final warehouse in the United States"])}
          label={t(TranslationKey.Warehouse)}
          value={order.destination?.name}
          inputClasses={classNames.nativeSelect}
          labelClasses={classNames.label}
        />

        <Field
          disabled
          tooltipInfoContent={t(TranslationKey['Prep Center in China'])}
          label={t(TranslationKey['Int warehouse'])}
          inputClasses={classNames.nativeSelect}
          labelClasses={classNames.label}
          inputComponent={
            <NativeSelect
              disabled
              variant="filled"
              value={order.storekeeper?.name}
              className={classNames.nativeSelect}
              input={<Input />}
            >
              <option value={'None'}>{order.storekeeper?.name}</option>
            </NativeSelect>
          }
        />

        <Field
          disabled
          tooltipInfoContent={t(TranslationKey["Client's chosen rate, region of shipment and its cost"])}
          label={t(TranslationKey.Tariff)}
          value={getFullTariffTextForBoxOrOrder(order)}
          inputClasses={classNames.nativeSelect}
          labelClasses={classNames.label}
        />

        <Field
          tooltipInfoContent={t(TranslationKey['Current order status'])}
          label={t(TranslationKey.Status)}
          value={order.storekeeper?.name}
          inputClasses={classNames.nativeSelect}
          labelClasses={classNames.label}
          inputComponent={
            <NativeSelect
              disabled={
                order.status !== orderFields.status || +orderFields.totalPriceChanged - orderFields.totalPrice > 0
              }
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
                  tooltipInfoContent={'dsdsdd'}
                  className={clsx({
                    [classNames.disableSelect]: disabledOrderStatuses.includes(statusCode),
                  })}
                  disabled={disabledOrderStatuses.includes(statusCode)}
                >
                  {getOrderStatusOptionByCode(statusCode).label}
                </option>
              ))}
            </NativeSelect>
          }
        />

        <div
          className={clsx(classNames.priceOptionsWrapper, {
            [classNames.disabledPriceOptionsWrapper]: checkIsPlanningPrice,
          })}
        >
          <Box className={classNames.noFlexElement}>
            <div className={classNames.onLineWrapper}>
              <div>
                <Typography className={classNames.modalText}>{t(TranslationKey['Yuan per batch']) + ' ¥'}</Typography>
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
                  {t(TranslationKey['Of these, for shipping to a warehouse in China']) + ' ¥'}
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
                      Number(e.target.value) < priceYuansForBatch
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
              <Typography>{t(TranslationKey['Use the price in dollars'])}</Typography>
            </div>
          </Box>
          <Field
            disabled={checkIsPlanningPrice}
            inputProps={{maxLength: 10}}
            tooltipInfoContent={t(TranslationKey['Course to calculate the cost'])}
            label={t(TranslationKey['Yuan to USD exchange rate'])}
            labelClasses={classNames.label}
            value={orderFields.yuanToDollarRate}
            onChange={e => {
              if (!isNaN(e.target.value) || (Number(e.target.value) < 0 && !checkIsPlanningPrice)) {
                setOrderField('yuanToDollarRate')({
                  target: {value: e.target.value},
                  updateTotalPriceChanged: !usePriceInDollars,
                  updateTotalPriceChangedValue: calcExchangePrice(priceYuansForBatch, e.target.value),
                })
              }
            }}
          />

          <Box className={classNames.noFlexElement}>
            <div className={classNames.onLineWrapper}>
              <div>
                <Typography className={classNames.modalText}>
                  {t(TranslationKey['Dollars per batch actually']) + ' $'}
                </Typography>
                <Input
                  disabled={!usePriceInDollars || checkIsPlanningPrice}
                  inputProps={{maxLength: 10}}
                  // value={
                  //   !usePriceInDollars
                  //     ? calcExchangePrice(priceYuansForBatch, orderFields.yuanToDollarRate)
                  //     : orderFields.totalPriceChanged
                  // }

                  value={orderFields.totalPriceChanged}
                  className={classNames.input}
                  onChange={setOrderField('totalPriceChanged')}
                />
              </div>

              <div>
                <Typography className={classNames.modalText}>
                  {t(TranslationKey['Of these, for shipping to a warehouse in China']) + ' $'}
                </Typography>
                <Input
                  disabled={!usePriceInDollars || checkIsPlanningPrice}
                  inputProps={{maxLength: 10}}
                  value={orderFields.deliveryCostToTheWarehouse}
                  className={classNames.input}
                  onChange={e =>
                    Number(e.target.value) < orderFields.totalPriceChanged &&
                    setOrderField('deliveryCostToTheWarehouse')(e)
                  }
                />
              </div>
            </div>
          </Box>
          <Box className={classNames.noFlexElement}>
            <Typography className={classNames.modalText}>{t(TranslationKey['Cost of purchase per pc.'])}</Typography>
            {calcPriceForItem(orderFields.totalPriceChanged, orderFields.amount)}
          </Box>
        </div>

        <Field
          oneLine
          tooltipInfoContent={t(
            TranslationKey[
              'A change in the actual cost initiates a refund of the difference to the customer or a request for additional payment on the order'
            ],
          )}
          label={t(TranslationKey['The actual cost is the same as the planned'])}
          inputComponent={
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
                className={classNames.checkbox}
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
            </div>
          }
        />

        <div className={classNames.totalPriceWrapper}>
          <Box className={classNames.tableCell}>
            <Typography className={classNames.totalPrice}>{t(TranslationKey['Planned cost in yuan'])}</Typography>
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
            <Typography className={classNames.totalPrice}>{t(TranslationKey['Planned cost in USD'])}</Typography>
            <Input disabled value={toFixedWithDollarSign(orderFields.totalPrice, 2)} className={classNames.input} />
          </Box>
        </div>
      </Grid>

      <Grid item>
        <Box my={3}>
          <Typography className={classNames.modalText}>{t(TranslationKey['Client comment'])}</Typography>
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
          <Typography className={classNames.modalText}>{t(TranslationKey['Buyer comment'])}</Typography>
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
            <div className={classNames.barCodeLinkWrapper}>
              <div>
                <Typography>{t(TranslationKey.BarCode)}</Typography>

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
          <Field
            tooltipInfoContent={t(TranslationKey['Tracking number for goods in transit'])}
            value={orderFields.trackingNumberChina}
            label={t(TranslationKey['Track number'])}
            labelClasses={classNames.label}
            inputClasses={classNames.numWideInput}
            inputProps={{maxLength: 50}}
            onChange={setOrderField('trackingNumberChina')}
          />
        </Box>

        <Box my={3}>
          <Field
            tooltipInfoContent={t(TranslationKey['Code for Harmonized System Product Identification'])}
            value={hsCode}
            label={t(TranslationKey['HS code'])}
            labelClasses={classNames.label}
            inputClasses={classNames.numWideInput}
            inputProps={{maxLength: 50}}
            onChange={e => setHsCode(e.target.value)}
          />
        </Box>

        <div>
          <div className={classNames.imageFileInputWrapper}>
            <UploadFilesInput images={photosToLoad} setImages={setPhotosToLoad} maxNumber={50} />
          </div>
          <PhotoAndFilesCarousel files={order.images} width="400px" />
        </div>
      </Grid>

      {showProgress && (
        <CircularProgressWithLabel value={progressValue} title={t(TranslationKey['Uploading Photos...'])} />
      )}

      <BigImagesModal
        isAmazone
        openModal={showPhotosModal}
        setOpenModal={() => setShowPhotosModal(!showPhotosModal)}
        images={order.images || []}
      />
    </Grid>
  )
}

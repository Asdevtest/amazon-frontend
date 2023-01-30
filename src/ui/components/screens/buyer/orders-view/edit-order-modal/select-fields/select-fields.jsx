/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import {Box, Grid, Typography, Checkbox, Link, Button} from '@mui/material'

import React, {useState} from 'react'

import {OrderStatusByKey, OrderStatus} from '@constants/order-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {CopyValue} from '@components/copy-value/copy-value'
import {PhotoAndFilesCarousel, PhotoCarousel} from '@components/custom-carousel/custom-carousel'
import {Field} from '@components/field/field'
import {BigImagesModal} from '@components/modals/big-images-modal'
import {UploadFilesInput} from '@components/upload-files-input'

import {
  calcExchangeDollarsInYuansPrice,
  calcExchangePrice,
  calcPriceForItem,
  calcOrderTotalPrice,
  calcOrderTotalPriceInYuann,
} from '@utils/calculation'
import {checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot} from '@utils/checks'
import {
  checkAndMakeAbsoluteUrl,
  getFullTariffTextForBoxOrOrder,
  toFixed,
  toFixedWithDollarSign,
  toFixedWithYuanSign,
} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './select-fields.style'

export const SelectFields = ({
  priceYuansDeliveryCostToTheWarehouse,
  usePriceInDollars,
  isPendingOrder,
  disableSubmit,
  photosToLoad,
  order,
  setOrderField,
  orderFields,
  showProgress,
  progressValue,
  setPhotosToLoad,
  deliveredGoodsCount,
  onClickHsCode,
  setUsePriceInDollars,
  setPriceYuansDeliveryCostToTheWarehouse,
  pathnameNotPaid,
  checkIsPlanningPrice,
  setCheckIsPlanningPrice,
  onClickUpdateButton,
}) => {
  const {classes: classNames} = useClassNames()

  const [showPhotosModal, setShowPhotosModal] = useState(false)

  return (
    <Grid container justifyContent="space-between" className={classNames.container}>
      <Grid item>
        <div className={classNames.photoAndFieldsWrapper}>
          <div className={classNames.photoWrapper}>
            <PhotoCarousel isAmazonPhoto files={order.product.images} />
          </div>

          <div>
            {Number(orderFields.status) >= Number(OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED]) && (
              <Field
                label={t(TranslationKey['Quantity of goods delivered'])}
                labelClasses={classNames.label}
                inputComponent={
                  <div
                    className={cx(classNames.deliveredGoodsWrapper, {
                      [classNames.deliveredGoodsSuccessWrapper]: deliveredGoodsCount >= order.amount,
                    })}
                  >
                    <div className={classNames.deliveredGoodsSubWrapper}>
                      <Typography
                        className={cx(classNames.deliveredGoodsLeftText, {
                          [classNames.deliveredGoodsSuccessText]: deliveredGoodsCount >= order.amount,
                        })}
                      >
                        {deliveredGoodsCount}
                      </Typography>
                      <Typography className={classNames.deliveredGoodsMiddleText}>
                        {t(TranslationKey['out of'])}
                      </Typography>
                      <Typography
                        className={cx(classNames.deliveredGoodsRightText, {
                          [classNames.deliveredGoodsSuccessText]: deliveredGoodsCount >= order.amount,
                        })}
                      >
                        {order.amount}
                      </Typography>
                    </div>
                    {deliveredGoodsCount < order.amount && <img src="/assets/icons/attention.svg" />}
                  </div>
                }
              />
            )}

            <Field
              disabled
              tooltipInfoContent={t(TranslationKey["Amazon's final warehouse in the United States"])}
              label={t(TranslationKey.Warehouse)}
              value={order.destination?.name ? order.destination.name : t(TranslationKey['Not available'])}
              inputClasses={classNames.nativeSelect}
              labelClasses={classNames.label}
            />

            <Field
              disabled
              tooltipInfoContent={t(TranslationKey['Prep Center in China'])}
              label={t(TranslationKey['Int warehouse'])}
              inputClasses={classNames.nativeSelect}
              labelClasses={classNames.label}
              value={order.storekeeper?.name}
            />

            <Field
              disabled
              tooltipInfoContent={t(TranslationKey["Client's chosen rate, region of shipment and its cost"])}
              label={t(TranslationKey.Tariff)}
              value={getFullTariffTextForBoxOrOrder(order)}
              inputClasses={classNames.nativeSelect}
              labelClasses={classNames.label}
            />
          </div>
        </div>

        <div
          className={cx(classNames.priceOptionsWrapper, {
            [classNames.disabledPriceOptionsWrapper]: checkIsPlanningPrice,
          })}
        >
          <Box className={classNames.noFlexElement}>
            <div className={classNames.onLineWrapper}>
              <div>
                <Field
                  disabled={usePriceInDollars || checkIsPlanningPrice}
                  inputProps={{maxLength: 10}}
                  labelClasses={classNames.blueLabel}
                  inputClasses={classNames.input}
                  // value={orderFields.priceInYuan}
                  // Убрать если что
                  value={
                    pathnameNotPaid && checkIsPlanningPrice
                      ? toFixed(calcOrderTotalPriceInYuann(orderFields?.orderSupplier, orderFields?.amount), 2)
                      : orderFields.priceInYuan
                  }
                  label={t(TranslationKey['Yuan per batch']) + ', ¥'}
                  onChange={setOrderField('priceInYuan')}
                />
              </div>

              <div>
                <Field
                  disabled={usePriceInDollars || checkIsPlanningPrice}
                  inputProps={{maxLength: 10}}
                  labelClasses={classNames.label}
                  inputClasses={classNames.input}
                  value={priceYuansDeliveryCostToTheWarehouse}
                  label={t(TranslationKey['Of these, for shipping to a warehouse in China']) + ', ¥'}
                  onChange={e => {
                    if (
                      checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value) &&
                      Number(e.target.value) < orderFields.priceInYuan
                    ) {
                      setPriceYuansDeliveryCostToTheWarehouse(e.target.value)
                      setOrderField('deliveryCostToTheWarehouse')({
                        target: {
                          // value: calcExchangePrice(e.target.value, orderFields.yuanToDollarRate),
                          value: Number(e.target.value) / orderFields.yuanToDollarRate,
                        },
                      })
                    }
                  }}
                />
              </div>
            </div>
            <Box className={classNames.noFlexElement}>
              <Field
                // disabled={!usePriceInDollars || checkIsPlanningPrice}
                disabled
                inputProps={{maxLength: 10}}
                inputClasses={classNames.input}
                labelClasses={classNames.label}
                label={t(TranslationKey['Cost of purchase per pc.']) + ', ¥'}
                // value={toFixedWithYuanSign(
                //   calcPriceForItem(orderFields.totalPriceChanged, orderFields.amount) * orderFields.yuanToDollarRate,

                //   2,
                // )}
                // Убрать
                value={toFixedWithYuanSign(
                  calcPriceForItem(
                    pathnameNotPaid && checkIsPlanningPrice
                      ? toFixed(calcOrderTotalPriceInYuann(orderFields?.orderSupplier, orderFields?.amount), 2)
                      : orderFields.priceInYuan,
                    orderFields.amount,
                    priceYuansDeliveryCostToTheWarehouse,
                  ),
                  2,
                )}
                // Раскоментить
                // value={toFixedWithYuanSign(
                //   orderFields.priceInYuan / orderFields.amount,

                //   2,
                // )}
              />
            </Box>

            <div>
              <Field
                disabled
                label={t(TranslationKey['Planned cost in yuan']) + ', ¥'}
                inputClasses={classNames.input}
                labelClasses={classNames.blueLabel}
                value={toFixedWithYuanSign(
                  calcExchangeDollarsInYuansPrice(orderFields.totalPrice, orderFields.yuanToDollarRate),
                  2,
                )}
              />
            </div>
            <div className={classNames.yuanToDollarRate}>
              <Field
                disabled={checkIsPlanningPrice}
                inputProps={{maxLength: 10}}
                inputClasses={classNames.input}
                tooltipInfoContent={t(TranslationKey['Course to calculate the cost'])}
                label={t(TranslationKey['Yuan to USD exchange rate'])}
                labelClasses={classNames.label}
                value={orderFields.yuanToDollarRate}
                onChange={e => {
                  if (!isNaN(e.target.value) || (Number(e.target.value) < 0 && !checkIsPlanningPrice)) {
                    setOrderField('yuanToDollarRate')({
                      target: {value: e.target.value},
                      // updateTotalPriceChanged: !usePriceInDollars,
                      // updateTotalPriceChangedValue: calcExchangePrice(priceYuansForBatch, e.target.value),
                    })
                  }
                }}
              />

              <Field
                oneLine
                label={t(TranslationKey['Use the price in dollars'])}
                // labelClasses={classNames.checkboxLabel}
                labelClasses={classNames.label}
                containerClasses={classNames.checkboxContainer}
                inputComponent={
                  <Checkbox
                    disabled={checkIsPlanningPrice}
                    checked={usePriceInDollars}
                    color="primary"
                    onChange={() => {
                      // setPriceYuansForBatch(
                      //   calcExchangeDollarsInYuansPrice(orderFields.totalPriceChanged, orderFields.yuanToDollarRate),
                      // )
                      setUsePriceInDollars(!usePriceInDollars)
                    }}
                  />
                }
              />
            </div>
          </Box>

          <Box className={classNames.noFlexElement}>
            <div className={classNames.onLineWrapper}>
              <div>
                <Field
                  disabled={!usePriceInDollars || checkIsPlanningPrice}
                  inputProps={{maxLength: 10}}
                  inputClasses={classNames.input}
                  labelClasses={classNames.greenLabel}
                  label={t(TranslationKey['Dollars per batch']) + ', $'}
                  // value={
                  //   isPendingOrder
                  //     ? toFixed(calcOrderTotalPrice(orderFields?.orderSupplier, orderFields?.amount), 2)
                  //     : orderFields.totalPriceChanged
                  // }
                  value={
                    isPendingOrder || (pathnameNotPaid && checkIsPlanningPrice)
                      ? toFixed(calcOrderTotalPrice(orderFields?.orderSupplier, orderFields?.amount), 2)
                      : orderFields.totalPriceChanged
                  }
                  onChange={setOrderField('totalPriceChanged')}
                />
              </div>

              <div>
                <Field
                  disabled={!usePriceInDollars || checkIsPlanningPrice}
                  inputProps={{maxLength: 10}}
                  inputClasses={classNames.input}
                  labelClasses={classNames.label}
                  label={t(TranslationKey['Of these, for shipping to a warehouse in China']) + ', $'}
                  value={toFixed(orderFields.deliveryCostToTheWarehouse, 2)}
                  onChange={e => {
                    Number(e.target.value) < orderFields.totalPriceChanged &&
                      setOrderField('deliveryCostToTheWarehouse')(e)

                    setPriceYuansDeliveryCostToTheWarehouse(
                      calcExchangeDollarsInYuansPrice(e.target.value, orderFields.yuanToDollarRate),
                    )
                  }}
                />
              </div>
            </div>
          </Box>
          <Box className={classNames.noFlexElement}>
            <Field
              // disabled={!usePriceInDollars || checkIsPlanningPrice}
              disabled
              inputProps={{maxLength: 10}}
              inputClasses={classNames.input}
              labelClasses={classNames.label}
              label={t(TranslationKey['Cost of purchase per pc.']) + ', $'}
              value={toFixedWithDollarSign(
                calcPriceForItem(
                  isPendingOrder || (pathnameNotPaid && checkIsPlanningPrice)
                    ? toFixed(calcOrderTotalPrice(orderFields?.orderSupplier, orderFields?.amount), 2)
                    : orderFields.totalPriceChanged,
                  orderFields.amount,
                  orderFields.deliveryCostToTheWarehouse,
                ),
                2,
              )}
            />
          </Box>
          <div>
            <Field
              disabled
              inputProps={{maxLength: 10}}
              labelClasses={classNames.greenLabel}
              inputClasses={classNames.input}
              label={t(TranslationKey['Planned cost in dollars']) + ', $'}
              value={toFixedWithDollarSign(orderFields.totalPrice, 2)}
            />
          </div>
          <div className={classNames.checkboxWithButton}>
            <Field
              oneLine
              tooltipInfoContent={t(
                TranslationKey[
                  'A change in the actual cost initiates a refund of the difference to the customer or a request for additional payment on the order'
                ],
              )}
              label={t(TranslationKey['The actual cost is the same as the planned'])}
              labelClasses={classNames.label}
              containerClasses={classNames.checkboxContainer}
              inputComponent={
                <div className={classNames.checkboxWithLabelWrapper}>
                  <Checkbox
                    disabled={
                      ![
                        OrderStatusByKey[OrderStatus.AT_PROCESS],
                        OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE],
                      ].includes(orderFields.status) || !checkIsPlanningPrice
                    }
                    checked={checkIsPlanningPrice}
                    color="primary"
                    className={classNames.checkbox}
                    onChange={() => {
                      setCheckIsPlanningPrice(!checkIsPlanningPrice)
                      setOrderField('totalPriceChanged')({
                        target: {value: toFixed(orderFields.totalPrice, 2)},
                      })
                      // setPriceYuansForBatch(
                      //   calcExchangeDollarsInYuansPrice(orderFields.totalPrice, orderFields.yuanToDollarRate),
                      // )
                    }}
                  />
                </div>
              }
            />
            <Button
              disableElevation
              disabled={checkIsPlanningPrice}
              className={classNames.button}
              variant="contained"
              color="primary"
              onClick={onClickUpdateButton}
            >
              {t(TranslationKey.Update)}
            </Button>
          </div>
        </div>
      </Grid>

      <Grid item>
        {/* <Box>
          <Field
            disabled
            multiline
            minRows={4}
            maxRows={6}
            inputClasses={classNames.commentInput}
            value={orderFields.clientComment}
            label={t(TranslationKey['Client comment'])}
            onChange={setOrderField('clientComment')}
          />
        </Box>
        <Box my={3}>
          <Field
            multiline
            minRows={4}
            maxRows={6}
            inputProps={{maxLength: 500}}
            inputClasses={classNames.commentInput}
            value={orderFields.buyerComment}
            label={t(TranslationKey['Buyer comment'])}
            onChange={setOrderField('buyerComment')}
          />
        </Box> */}

        <Box my={3} className={classNames.trackAndHsCodeAndComments}>
          <Field
            disabled
            multiline
            minRows={4}
            maxRows={4}
            inputClasses={classNames.commentInput}
            labelClasses={classNames.label}
            value={orderFields.clientComment}
            label={t(TranslationKey['Client comment'])}
            onChange={setOrderField('clientComment')}
          />

          <Field
            multiline
            disabled={disableSubmit}
            minRows={4}
            maxRows={4}
            inputProps={{maxLength: 500}}
            inputClasses={classNames.commentInput}
            value={orderFields.buyerComment}
            labelClasses={classNames.label}
            label={t(TranslationKey['Buyer comments to the order'])}
            onChange={setOrderField('buyerComment')}
          />
        </Box>

        <Box my={3} className={classNames.trackAndHsCodeAndComments}>
          <Field
            disabled // ={disableSubmit}
            tooltipInfoContent={t(TranslationKey['Tracking number for goods in transit'])}
            value={orderFields.trackingNumberChina}
            label={t(TranslationKey['Track number'])}
            labelClasses={classNames.label}
            inputClasses={classNames.input}
            inputProps={{maxLength: 50}}
            // onChange={setOrderField('trackingNumberChina')}
          />

          <Field
            disabled={disableSubmit || isPendingOrder}
            tooltipInfoContent={t(TranslationKey['Code for Harmonized System Product Identification'])}
            label={t(TranslationKey['HS code'])}
            labelClasses={classNames.label}
            inputProps={{maxLength: 50}}
            inputComponent={
              <Button
                variant="contained"
                color="primary"
                className={classNames.hsCodeBtn}
                onClick={() => onClickHsCode(orderFields.product._id)}
              >
                {t(TranslationKey['HS code'])}
              </Button>
            }
          />
        </Box>

        <Box my={3} className={classNames.trackAndHsCodeAndComments}>
          <div className={classNames.barCodeWrapper}>
            <div className={classNames.barCodeLinkWrapper}>
              <div>
                <Field
                  label={t(TranslationKey.BarCode)}
                  labelClasses={classNames.label}
                  inputComponent={
                    orderFields.product.barCode ? (
                      <div className={classNames.barCode}>
                        <Link
                          target="_blank"
                          rel="noopener"
                          href={checkAndMakeAbsoluteUrl(orderFields.product.barCode)}
                        >
                          <Typography className={classNames.link}>{t(TranslationKey.View)}</Typography>
                        </Link>
                        <CopyValue text={orderFields.product.barCode} />
                      </div>
                    ) : (
                      <Typography className={classNames.barCodeText}>{t(TranslationKey.Missing)}</Typography>
                    )
                  }
                />
              </div>
            </div>
          </div>

          {Number(orderFields.status) === Number(OrderStatusByKey[OrderStatus.IN_STOCK]) ? (
            <Field
              disabled={disableSubmit}
              value={orderFields.tmpRefundToClient}
              label={t(TranslationKey['Return to Client']) + ', $'}
              labelClasses={classNames.label}
              inputClasses={classNames.input}
              inputProps={{maxLength: 50}}
              onChange={setOrderField('tmpRefundToClient')}
            />
          ) : null}
        </Box>

        <div className={classNames.researchWrapper}>
          <Checkbox disabled className={classNames.checkbox} checked={orderFields.needsResearch} color="primary" />
          <Typography className={classNames.researchLabel}>{t(TranslationKey['Re-search supplier'])}</Typography>
        </div>

        <div>
          {!disableSubmit && Number(order.status) !== Number(OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT]) && (
            <div className={classNames.imageFileInputWrapper}>
              <UploadFilesInput images={photosToLoad} setImages={setPhotosToLoad} maxNumber={50} />
            </div>
          )}
          <PhotoAndFilesCarousel small files={order.images} width="400px" />
        </div>
      </Grid>

      {showProgress && (
        <CircularProgressWithLabel value={progressValue} title={t(TranslationKey['Uploading Photos...'])} />
      )}

      <BigImagesModal
        openModal={showPhotosModal}
        setOpenModal={() => setShowPhotosModal(!showPhotosModal)}
        images={order.images || []}
      />
    </Grid>
  )
}

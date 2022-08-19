import React, {useState} from 'react'

import {Box, Grid, NativeSelect, Typography, Checkbox, Link} from '@material-ui/core'
import clsx from 'clsx'

import {OrderStatusByKey, OrderStatus} from '@constants/order-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {PhotoAndFilesCarousel, PhotoCarousel} from '@components/custom-carousel/custom-carousel'
import {Field} from '@components/field/field'
import {Input} from '@components/input'
import {BigImagesModal} from '@components/modals/big-images-modal'
import {UploadFilesInput} from '@components/upload-files-input'

import {calcExchangeDollarsInYuansPrice, calcExchangePrice, calcPriceForItem} from '@utils/calculation'
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
    true,
    // orderFields?.totalPriceChanged === orderFields?.totalPrice,
  )

  const [showPhotosModal, setShowPhotosModal] = useState(false)

  const copyValue = value => {
    navigator.clipboard.writeText(value)
  }

  return (
    <Grid container justify="space-around" className={classNames.container}>
      <Grid item>
        <div className={classNames.photoAndFieldsWrapper}>
          <div className={classNames.photoWrapper}>
            <PhotoCarousel isAmazonPhoto files={order.product.images} />
          </div>

          <div>
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
          </div>
        </div>

        <div
          className={clsx(classNames.priceOptionsWrapper, {
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
                  value={
                    usePriceInDollars
                      ? calcExchangeDollarsInYuansPrice(orderFields.totalPriceChanged, orderFields.yuanToDollarRate)
                      : priceYuansForBatch
                  }
                  label={t(TranslationKey['Yuan per batch']) + ', ¥'}
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
                <Field
                  disabled={usePriceInDollars || checkIsPlanningPrice}
                  inputProps={{maxLength: 10}}
                  labelClasses={classNames.label}
                  inputClasses={classNames.input}
                  value={
                    usePriceInDollars
                      ? calcExchangeDollarsInYuansPrice(
                          orderFields.deliveryCostToTheWarehouse,
                          orderFields.yuanToDollarRate,
                        )
                      : priceYuansDeliveryCostToTheWarehouse
                  }
                  label={t(TranslationKey['Of these, for shipping to a warehouse in China']) + ', ¥'}
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

            <Box className={classNames.noFlexElement}>
              <Field
                // disabled={!usePriceInDollars || checkIsPlanningPrice}
                disabled
                inputProps={{maxLength: 10}}
                inputClasses={classNames.input}
                label={t(TranslationKey['Cost of purchase per pc.']) + ', ¥'}
                value={toFixedWithYuanSign(
                  calcPriceForItem(orderFields.totalPriceChanged, orderFields.amount) * orderFields.yuanToDollarRate,
                  2,
                )}
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

              <Field
                oneLine
                label={t(TranslationKey['Use the price in dollars'])}
                labelClasses={classNames.checkboxLabel}
                containerClasses={classNames.checkboxContainer}
                inputComponent={
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
                  value={orderFields.totalPriceChanged}
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
                  value={orderFields.deliveryCostToTheWarehouse}
                  onChange={e =>
                    Number(e.target.value) < orderFields.totalPriceChanged &&
                    setOrderField('deliveryCostToTheWarehouse')(e)
                  }
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
              label={t(TranslationKey['Cost of purchase per pc.']) + ', $'}
              value={toFixedWithDollarSign(calcPriceForItem(orderFields.totalPriceChanged, orderFields.amount), 2)}
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
          <div>
            <Field
              oneLine
              tooltipInfoContent={t(
                TranslationKey[
                  'A change in the actual cost initiates a refund of the difference to the customer or a request for additional payment on the order'
                ],
              )}
              label={t(TranslationKey['The actual cost is the same as the planned'])}
              containerClasses={classNames.checkboxContainer}
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
                        target: {value: toFixed(orderFields.totalPrice, 2)},
                      })
                      setPriceYuansForBatch(
                        calcExchangeDollarsInYuansPrice(orderFields.totalPrice, orderFields.yuanToDollarRate),
                      )
                    }}
                  />
                </div>
              }
            />
          </div>
        </div>
      </Grid>

      <Grid item>
        <Box>
          <Field
            disabled
            multiline
            rows={4}
            rowsMax={6}
            inputClasses={classNames.commentInput}
            value={orderFields.clientComment}
            label={t(TranslationKey['Client comment'])}
            onChange={setOrderField('clientComment')}
          />
        </Box>
        <Box my={3}>
          <Field
            multiline
            rows={4}
            rowsMax={6}
            inputProps={{maxLength: 500}}
            inputClasses={classNames.commentInput}
            value={orderFields.buyerComment}
            label={t(TranslationKey['Buyer comment'])}
            onChange={setOrderField('buyerComment')}
          />
        </Box>

        <Box my={3} className={classNames.trackAndHsCode}>
          <div>
            <Field
              tooltipInfoContent={t(TranslationKey['Tracking number for goods in transit'])}
              value={orderFields.trackingNumberChina}
              label={t(TranslationKey['Track number'])}
              labelClasses={classNames.label}
              inputClasses={classNames.input}
              inputProps={{maxLength: 50}}
              onChange={setOrderField('trackingNumberChina')}
            />
          </div>

          <div>
            <Field
              tooltipInfoContent={t(TranslationKey['Code for Harmonized System Product Identification'])}
              value={hsCode}
              label={t(TranslationKey['HS code'])}
              labelClasses={classNames.label}
              inputClasses={classNames.input}
              inputProps={{maxLength: 50}}
              onChange={e => setHsCode(e.target.value)}
            />
          </div>
        </Box>

        <Box>
          <div className={classNames.barCodeWrapper}>
            <div className={classNames.barCodeLinkWrapper}>
              <div>
                <Field
                  label={t(TranslationKey.BarCode)}
                  inputComponent={
                    orderFields.product.barCode ? (
                      <div className={classNames.barCode}>
                        <Link
                          target="_blank"
                          rel="noopener"
                          href={checkAndMakeAbsoluteUrl(orderFields.product.barCode)}
                        >
                          <Typography className={classNames.link}>{orderFields.product.barCode}</Typography>
                        </Link>
                        <img
                          className={classNames.copyImg}
                          src="/assets/icons/copy-img.svg"
                          alt=""
                          onClick={e => {
                            e.stopPropagation()
                            copyValue(orderFields.product.barCode)
                          }}
                        />
                      </div>
                    ) : (
                      <Typography className={classNames.barCodeText}>{t(TranslationKey.Missing)}</Typography>
                    )
                  }
                />
              </div>
            </div>
          </div>
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

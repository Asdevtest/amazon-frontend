/* eslint-disable no-unused-vars */
import { useState } from 'react'

import AddIcon from '@mui/icons-material/Add'
import { Box, Checkbox, Grid, Typography } from '@mui/material'

import { OrderStatus, OrderStatusByKey } from '@constants/orders/order-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { UserLinkCell } from '@components/data-grid/data-grid-cells/data-grid-cells'
import { ImageModal } from '@components/modals/image-modal/image-modal'
import { Button } from '@components/shared/buttons/button'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { CustomSelectPaymentDetails } from '@components/shared/custom-select-payment-details'
import { Field } from '@components/shared/field/field'
import { LabelWithCopy } from '@components/shared/label-with-copy'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import {
  calcExchangeDollarsInYuansPrice,
  calcOrderTotalPrice,
  calcOrderTotalPriceInYuann,
  calcPriceForItem,
} from '@utils/calculation'
import { checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot } from '@utils/checks'
import { convertDaysToSeconds, formatDateWithoutTime, getDistanceBetweenDatesInSeconds } from '@utils/date-time'
import { getNewTariffTextForBoxOrOrder, toFixed, toFixedWithDollarSign, toFixedWithYuanSign } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/types/button.type'

import { useStyles } from './select-fields.style'

export const SelectFields = ({
  userInfo,
  paymentDetailsPhotosToLoad,
  yuanToDollarRate,
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
  hsCode,
  setHsCode,
  setUsePriceInDollars,
  checkIsPlanningPrice,
  setCheckIsPlanningPrice,
  onClickUpdateButton,
  onClickSupplierPaymentButton,
  onChangeImagesForLoad,
  setPaymentMethodsModal,
  orderPayments,
}) => {
  const { classes: styles, cx } = useStyles()

  const onChangeHsField = fieldName => event => {
    const newFormFields = { ...hsCode }
    newFormFields[fieldName] = event.target.value

    setHsCode(newFormFields)
  }

  const [showImageModal, setShowImageModal] = useState(false)

  const [bigImagesOptions, setBigImagesOptions] = useState({ images: [], imgIndex: 0 })

  const countIncomingImage = order.images?.length ?? 0

  return (
    <Grid container justifyContent="space-between" className={styles.container}>
      <Grid item>
        <div className={styles.photoAndFieldsWrapper}>
          <div className={styles.photoWrapper}>
            {!!order.product.images.length && (
              <div className={styles.carouselWrapper}>
                <PhotoAndFilesSlider mediumSlider withoutFiles showPreviews files={order.product.images} />
              </div>
            )}
          </div>

          <div>
            {Number(orderFields.status) >= Number(OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED]) && (
              <Field
                label={t(TranslationKey['Quantity of goods delivered'])}
                labelClasses={styles.label}
                inputComponent={
                  <div
                    className={cx(styles.deliveredGoodsWrapper, {
                      [styles.deliveredGoodsSuccessWrapper]: deliveredGoodsCount >= order.amount,
                    })}
                  >
                    <div className={styles.deliveredGoodsSubWrapper}>
                      <Typography
                        className={cx(styles.deliveredGoodsLeftText, {
                          [styles.deliveredGoodsSuccessText]: deliveredGoodsCount >= order.amount,
                        })}
                      >
                        {deliveredGoodsCount}
                      </Typography>
                      <Typography className={styles.deliveredGoodsMiddleText}>{t(TranslationKey['out of'])}</Typography>
                      <Typography
                        className={cx(styles.deliveredGoodsRightText, {
                          [styles.deliveredGoodsSuccessText]: deliveredGoodsCount >= order.amount,
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
              inputClasses={styles.nativeSelect}
              labelClasses={styles.label}
            />

            <Field
              disabled
              tooltipInfoContent={t(TranslationKey['Prep Center in China'])}
              label={t(TranslationKey['Int warehouse'])}
              inputClasses={styles.nativeSelect}
              labelClasses={styles.label}
              value={order.storekeeper?.name}
            />

            <Field
              disabled
              tooltipInfoContent={t(TranslationKey["Client's chosen rate, region of shipment and its cost"])}
              label={t(TranslationKey.Tariff)}
              value={getNewTariffTextForBoxOrOrder(order, true)}
              inputClasses={styles.nativeSelect}
              labelClasses={styles.label}
            />
          </div>
        </div>

        <div
          className={cx(styles.priceOptionsWrapper, {
            [styles.disabledPriceOptionsWrapper]: checkIsPlanningPrice,
          })}
        >
          <Box className={styles.noFlexElement}>
            <div className={styles.onLineWrapper}>
              <div>
                <Field
                  disabled={usePriceInDollars || checkIsPlanningPrice}
                  inputProps={{ maxLength: 10 }}
                  labelClasses={styles.blueLabel}
                  inputClasses={styles.input}
                  // value={orderFields.priceInYuan}
                  // Убрать если что

                  // value={toFixed(orderFields.priceInYuan, 2)}
                  value={
                    isPendingOrder
                      ? toFixed(calcOrderTotalPriceInYuann(orderFields?.orderSupplier, orderFields?.amount), 2)
                      : toFixed(orderFields.priceInYuan, 2) || ''
                  }
                  label={t(TranslationKey['Yuan per batch']) + ', ¥'}
                  onChange={setOrderField('priceInYuan')}
                />
              </div>

              <div>
                <Field
                  disabled={usePriceInDollars || checkIsPlanningPrice}
                  inputProps={{ maxLength: 10 }}
                  labelClasses={styles.label}
                  inputClasses={styles.input}
                  value={toFixed(orderFields.priceBatchDeliveryInYuan, 2)}
                  label={t(TranslationKey['Of these, for shipping to a warehouse in China']) + ', ¥'}
                  onChange={e => {
                    if (
                      checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value) &&
                      Number(e.target.value) < orderFields.priceInYuan
                    ) {
                      setOrderField('priceBatchDeliveryInYuan')(e)
                    }
                  }}
                />
              </div>
            </div>
            <Box className={styles.noFlexElement}>
              <Field
                // disabled={!usePriceInDollars || checkIsPlanningPrice}
                disabled
                inputProps={{ maxLength: 10 }}
                inputClasses={styles.input}
                labelClasses={styles.label}
                label={t(TranslationKey['Cost of purchase per pc.']) + ', ¥'}
                value={toFixedWithYuanSign(calcPriceForItem(orderFields.priceInYuan, orderFields.amount), 2) || ''}
              />
            </Box>

            <div>
              <Field
                disabled
                label={t(TranslationKey['Planned cost in yuan']) + ', ¥'}
                inputClasses={styles.input}
                labelClasses={styles.blueLabel}
                value={toFixedWithYuanSign(
                  calcExchangeDollarsInYuansPrice(order.totalPrice, order?.yuanToDollarRate),
                  2,
                )}
              />
            </div>
            <div className={styles.yuanToDollarRate}>
              <Field
                disabled={checkIsPlanningPrice}
                error={`${yuanToDollarRate}` !== `${orderFields?.yuanToDollarRate}`}
                inputProps={{ maxLength: 10 }}
                inputClasses={styles.input}
                tooltipInfoContent={t(TranslationKey['Course to calculate the cost'])}
                label={t(TranslationKey['Current order course'])}
                labelClasses={styles.label}
                value={orderFields?.yuanToDollarRate || ''}
                onChange={e => {
                  setOrderField('yuanToDollarRate')(e)
                }}
              />

              <Field
                disabled
                inputClasses={styles.input}
                label={t(TranslationKey['Actual course'])}
                labelClasses={styles.label}
                value={yuanToDollarRate}
              />

              {/* <Field
                oneLine
                label={t(TranslationKey['Use the price in dollars'])}
                // labelClasses={styles.checkboxLabel}
                labelClasses={styles.label}
                containerClasses={styles.checkboxContainer}
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
              /> */}
            </div>
          </Box>

          <Box className={styles.noFlexElement}>
            <div className={styles.onLineWrapper}>
              <div>
                <Field
                  disabled={!usePriceInDollars || checkIsPlanningPrice}
                  inputProps={{ maxLength: 10 }}
                  inputClasses={styles.input}
                  labelClasses={styles.greenLabel}
                  label={t(TranslationKey['Dollars per batch']) + ', $'}
                  value={
                    isPendingOrder
                      ? toFixed(calcOrderTotalPrice(orderFields?.orderSupplier, orderFields?.amount), 2)
                      : toFixed(orderFields.totalPriceChanged, 2) || ''
                  }
                  onChange={setOrderField('totalPriceChanged')}
                />
              </div>

              <div>
                <Field
                  disabled={!usePriceInDollars || checkIsPlanningPrice}
                  inputProps={{ maxLength: 10 }}
                  inputClasses={styles.input}
                  labelClasses={styles.label}
                  label={t(TranslationKey['Of these, for shipping to a warehouse in China']) + ', $'}
                  value={toFixed(orderFields.deliveryCostToTheWarehouse, 2) || '0'}
                  onChange={e => {
                    Number(e.target.value) < orderFields.totalPriceChanged &&
                      setOrderField('deliveryCostToTheWarehouse')(e)

                    setOrderField('priceBatchDeliveryInYuan')({
                      target: {
                        value: calcExchangeDollarsInYuansPrice(e.target.value, orderFields?.yuanToDollarRate),
                      },
                    })
                  }}
                />
              </div>
            </div>
          </Box>
          <Box className={styles.noFlexElement}>
            <Field
              // disabled={!usePriceInDollars || checkIsPlanningPrice}
              disabled
              inputProps={{ maxLength: 10 }}
              inputClasses={styles.input}
              labelClasses={styles.label}
              label={t(TranslationKey['Cost of purchase per pc.']) + ', $'}
              value={
                toFixedWithDollarSign(
                  calcPriceForItem(
                    isPendingOrder
                      ? toFixed(calcOrderTotalPrice(orderFields?.orderSupplier, orderFields?.amount), 2)
                      : orderFields.totalPriceChanged,
                    orderFields.amount,
                  ),
                  2,
                ) || ''
              }
            />
          </Box>
          <div>
            <Field
              disabled
              inputProps={{ maxLength: 10 }}
              labelClasses={styles.greenLabel}
              inputClasses={styles.input}
              label={t(TranslationKey['Planned cost in dollars']) + ', $'}
              value={toFixedWithDollarSign(orderFields.totalPrice, 2)}
            />
          </div>
          <div className={styles.checkboxWithButton}>
            <Field
              oneLine
              tooltipInfoContent={t(
                TranslationKey[
                  'A change in the actual cost initiates a refund of the difference to the customer or a request for additional payment on the order'
                ],
              )}
              label={t(TranslationKey['The actual cost is the same as the planned'])}
              labelClasses={styles.label}
              containerClasses={styles.checkboxContainer}
              inputComponent={
                <div className={styles.checkboxWithLabelWrapper}>
                  <Checkbox
                    disabled={
                      ![
                        OrderStatusByKey[OrderStatus.AT_PROCESS],

                        // OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE],
                      ].includes(orderFields.status) || !checkIsPlanningPrice
                    }
                    checked={checkIsPlanningPrice}
                    color="primary"
                    className={styles.checkbox}
                    onChange={() => {
                      setCheckIsPlanningPrice(!checkIsPlanningPrice)
                      // setOrderField('totalPriceChanged')({
                      //   target: {value: toFixed(orderFields.totalPrice, 2)},
                      // })
                      // setPriceYuansForBatch(
                      //   calcExchangeDollarsInYuansPrice(orderFields.totalPrice, orderFields.yuanToDollarRate),
                      // )
                    }}
                  />
                </div>
              }
            />
            <Button disabled={checkIsPlanningPrice} className={styles.button} onClick={onClickUpdateButton}>
              {t(TranslationKey.Update)}
            </Button>
          </div>

          {Number(orderFields.status) === Number(OrderStatusByKey[OrderStatus.READY_FOR_PAYMENT]) && (
            <div className={styles.paymentsBlock} onClick={setPaymentMethodsModal}>
              <CustomSelectPaymentDetails
                disabled
                cursorPointer
                generalText
                labelClass={styles.labelClass}
                orderPayments={orderPayments.map(orderPayment => orderPayment.paymentMethod)}
              />
            </div>
          )}
        </div>
      </Grid>

      <Grid item className={styles.gridItem}>
        <Box my={3} className={styles.trackAndHsCodeAndComments}>
          <Field
            disabled
            multiline
            minRows={4}
            maxRows={4}
            inputClasses={styles.commentInput}
            labelClasses={styles.label}
            value={orderFields.clientComment}
            label={t(TranslationKey['Client comment'])}
            onChange={setOrderField('clientComment')}
          />

          <Field
            multiline
            minRows={4}
            maxRows={4}
            inputProps={{ maxLength: 500 }}
            inputClasses={styles.commentInput}
            value={orderFields.buyerComment}
            labelClasses={styles.label}
            label={t(TranslationKey['Buyer comments to the order'])}
            onChange={setOrderField('buyerComment')}
          />
        </Box>

        <Box my={3} className={styles.trackAndHsCodeAndComments}>
          <Box display="flex" width="100%">
            <Box className={styles.trackAndHsCodeAndComments}>
              <div className={styles.trackAndHsCodeAndCommentsSumWrapper}>
                <div className={styles.barCodeWrapper}>
                  <div className={styles.barCodeLinkWrapper}>
                    <LabelWithCopy
                      direction="column"
                      labelTitleColor="gray"
                      labelTitle={t(TranslationKey.BarCode)}
                      labelValue={orderFields.product.barCode}
                      lableLinkTitle={t(TranslationKey.View)}
                    />
                  </div>

                  <div className={styles.researchWrapper}>
                    <Checkbox
                      disabled
                      className={styles.checkbox}
                      checked={orderFields.needsResearch}
                      color="primary"
                    />
                    <Typography className={styles.researchLabel}>{t(TranslationKey['Re-search supplier'])}</Typography>
                  </div>
                </div>
              </div>
            </Box>
          </Box>
          <div className={styles.supplierPaymentButtonWrapper}>
            <Button
              className={cx(styles.supplierPaymentButton, {
                [styles.noPaymentButton]: orderFields?.paymentDetails.length,
              })}
              variant={
                !orderFields?.paymentDetails.length && !paymentDetailsPhotosToLoad.length
                  ? ButtonVariant.OUTLINED
                  : ButtonVariant.CONTAINED
              }
              onClick={onClickSupplierPaymentButton}
            >
              <Typography
                className={cx(styles.normalPaymentText, {
                  [styles.whiteNormalPaymentText]:
                    orderFields?.paymentDetails.length || paymentDetailsPhotosToLoad.length,
                })}
              >
                {t(
                  TranslationKey[
                    `${
                      !orderFields?.paymentDetails.length && !paymentDetailsPhotosToLoad.length
                        ? 'Add payment document'
                        : 'Document added'
                    }`
                  ],
                )}
              </Typography>

              {!orderFields?.paymentDetails.length && !paymentDetailsPhotosToLoad.length && (
                <AddIcon className={styles.addIcon} />
              )}

              {!!orderFields?.paymentDetails.length && (
                <Typography
                  className={cx(styles.normalPaymentText, {
                    [styles.whiteNormalPaymentText]:
                      orderFields?.paymentDetails.length || paymentDetailsPhotosToLoad.length,
                  })}
                >{`(${orderFields?.paymentDetails.length})`}</Typography>
              )}
              {!!paymentDetailsPhotosToLoad.length && (
                <Typography
                  className={cx(styles.normalPaymentText, {
                    [styles.whiteNormalPaymentText]:
                      orderFields?.paymentDetails.length || paymentDetailsPhotosToLoad.length,
                  })}
                >{`+ ${paymentDetailsPhotosToLoad.length}`}</Typography>
              )}
            </Button>
          </div>
        </Box>

        {/** Hs code fields */}

        <Box my={3} className={cx(styles.formItem, styles.noFlex)} alignItems="flex-end">
          <div className={styles.partialPaymentWrapper}>
            <div className={styles.partialPaymentCheckbox}>
              <Checkbox
                className={styles.checkbox}
                checked={orderFields.partialPayment}
                color="primary"
                onChange={() => setOrderField('partialPayment')({ target: { value: !orderFields.partialPayment } })}
              />
              <Typography className={styles.label}>{t(TranslationKey['Partial payment'])}</Typography>
            </div>

            <div className={styles.partialPaymentFields}>
              <Field
                disabled={!orderFields.partialPayment}
                label={t(TranslationKey['To pay']) + ', Ұ'}
                labelClasses={styles.label}
                inputClasses={styles.input}
                inputProps={{ maxLength: 10 }}
                value={orderFields.partialPaymentAmountRmb}
                onChange={event => {
                  if (checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(event.target.value)) {
                    setOrderField('partialPaymentAmountRmb')(event)
                  }
                }}
              />

              <Field
                disabled={!orderFields.partialPayment}
                label={t(TranslationKey['Paid for']) + ', Ұ'}
                labelClasses={styles.label}
                inputClasses={styles.input}
                inputProps={{ maxLength: 10 }}
                value={orderFields.partiallyPaid}
                onChange={event => {
                  if (checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(event.target.value)) {
                    {
                      setOrderField('partiallyPaid')(event)
                    }
                  }
                }}
              />
            </div>
          </div>
          {/* <Field */}
          {/*   label={t(TranslationKey['Paid for']) + ', Ұ'} */}
          {/*   labelClasses={styles.label} */}
          {/*   inputClasses={styles.input} */}
          {/*   inputProps={{ maxLength: 10 }} */}
          {/*   value={orderFields.partialPaymentAmountRmb} */}
          {/*   onChange={event => { */}
          {/*     if (checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(event.target.value)) { */}
          {/*       setOrderField('partialPaymentAmountRmb')(event) */}
          {/*     } */}
          {/*   }} */}
          {/* /> */}

          {Number(orderFields.status) === Number(OrderStatusByKey[OrderStatus.IN_STOCK]) ? (
            <Field
              disabled={disableSubmit}
              value={orderFields.tmpRefundToClient}
              label={t(TranslationKey['Return to Client']) + ', $'}
              labelClasses={styles.label}
              inputClasses={styles.input}
              inputProps={{ maxLength: 50 }}
              onChange={setOrderField('tmpRefundToClient')}
            />
          ) : (
            <Box width="100%"></Box>
          )}
        </Box>

        <Box my={3} className={styles.formItem}>
          <Field
            multiline
            minRows={2}
            maxRows={2}
            label={'产品中文品名'}
            labelClasses={styles.label}
            inputClasses={cx(styles.input, styles.inputFullHeight)}
            inputProps={{ maxLength: 255 }}
            value={hsCode.chinaTitle}
            onChange={onChangeHsField('chinaTitle')}
          />

          <Field
            multiline
            minRows={2}
            maxRows={2}
            label={t(TranslationKey.Material)}
            labelClasses={styles.label}
            inputClasses={cx(styles.input, styles.inputFullHeight)}
            inputProps={{ maxLength: 255 }}
            value={hsCode.material}
            onChange={onChangeHsField('material')}
          />
        </Box>

        <Box my={3}>
          <Field
            multiline
            minRows={2}
            maxRows={2}
            label={t(TranslationKey['Product usage'])}
            labelClasses={styles.label}
            inputClasses={styles.inputFullHeight}
            inputProps={{ maxLength: 255 }}
            value={hsCode.productUsage}
            onChange={onChangeHsField('productUsage')}
          />
        </Box>

        <Box my={3} className={styles.formItem}>
          <Field
            label={'HS Code'}
            labelClasses={styles.label}
            inputClasses={styles.input}
            inputProps={{ maxLength: 255 }}
            value={hsCode.hsCode}
            onChange={onChangeHsField('hsCode')}
          />

          {order.product.subUsers?.length ? (
            <div className={styles.subUsersWrapper}>
              <div className={styles.subUsersTitleWrapper}>
                <Typography className={styles.subUsersTitle}>{t(TranslationKey['Product available'])}</Typography>
              </div>
              <div className={styles.subUsersBodyWrapper}>
                <div className={styles.subUsersBody}>
                  {order.product.subUsers?.map((subUser, index) => (
                    <div key={index} className={styles.subUserBodyWrapper}>
                      <UserLinkCell
                        withAvatar
                        name={subUser?.name}
                        userId={subUser?._id}
                        customStyles={{ fontWeight: 600, marginLeft: 5 }}
                        maxNameWidth={100}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </Box>

        <div className={styles.researchPaymentDateWrapper}>
          {orderFields.status >= 20 ? (
            <div>
              <Field
                disabled
                value={formatDateWithoutTime(orderFields.paymentDateToSupplier) || t(TranslationKey.Missing)}
                label={t(TranslationKey['Payment date'])}
                labelClasses={styles.label}
                inputClasses={cx(styles.input, {
                  [styles.inputError]:
                    orderFields.paymentDateToSupplier &&
                    orderFields.status === OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER] &&
                    !!orderFields.orderSupplier.productionTerm &&
                    Math.abs(getDistanceBetweenDatesInSeconds(orderFields.paymentDateToSupplier)) >
                      convertDaysToSeconds(orderFields.orderSupplier.productionTerm),
                })}
              />
            </div>
          ) : null}
        </div>

        <div>
          {
            /* !disableSubmit &&  */ Number(order.status) !==
              Number(OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT]) && (
              <div className={styles.imageFileInputWrapper}>
                <UploadFilesInput
                  fullWidth
                  images={photosToLoad}
                  setImages={setPhotosToLoad}
                  maxNumber={50 - countIncomingImage}
                />
              </div>
            )
          }
          <PhotoAndFilesSlider
            withoutMakeMainImage
            isEditable
            showPreviews
            files={order.images}
            onChangeImagesForLoad={onChangeImagesForLoad}
          />
        </div>
      </Grid>

      {showProgress && (
        <CircularProgressWithLabel value={progressValue} title={t(TranslationKey['Uploading Photos...'])} />
      )}

      {showImageModal && (
        <ImageModal
          showPreviews
          isOpenModal={showImageModal}
          files={bigImagesOptions.images}
          currentFileIndex={bigImagesOptions.imgIndex}
          onOpenModal={() => setShowImageModal(!showImageModal)}
          onCurrentFileIndex={imgIndex => setBigImagesOptions(() => ({ ...bigImagesOptions, imgIndex }))}
        />
      )}
    </Grid>
  )
}

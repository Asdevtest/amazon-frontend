/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import { useState } from 'react'

import AddIcon from '@mui/icons-material/Add'
import { Box, Checkbox, Grid, Link, Typography } from '@mui/material'

import { OrderStatus, OrderStatusByKey } from '@constants/orders/order-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { CustomSelectPaymentDetails } from '@components/custom-select-payment-details'
import { UserLinkCell } from '@components/data-grid/data-grid-cells/data-grid-cells'
import { ImageModal } from '@components/modals/image-modal/image-modal'
import { Button } from '@components/shared/buttons/button'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { CopyValue } from '@components/shared/copy-value/copy-value'
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
import {
  checkAndMakeAbsoluteUrl,
  getNewTariffTextForBoxOrOrder,
  toFixed,
  toFixedWithDollarSign,
  toFixedWithYuanSign,
} from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './select-fields.style'

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
  allPayments,
}) => {
  const { classes: classNames } = useClassNames()

  const onChangeHsField = fieldName => event => {
    const newFormFields = { ...hsCode }
    newFormFields[fieldName] = event.target.value

    setHsCode(newFormFields)
  }

  const [showImageModal, setShowImageModal] = useState(false)

  const [bigImagesOptions, setBigImagesOptions] = useState({ images: [], imgIndex: 0 })

  const countIncomingImage = order.images?.length ?? 0

  return (
    <Grid container justifyContent="space-between" className={classNames.container}>
      <Grid item>
        <div className={classNames.photoAndFieldsWrapper}>
          <div className={classNames.photoWrapper}>
            {!!order.product.images.length && (
              <div className={classNames.carouselWrapper}>
                <PhotoAndFilesSlider mediumSlider withoutFiles showPreviews files={order.product.images} />
              </div>
            )}
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
              value={getNewTariffTextForBoxOrOrder(order, true)}
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
                  inputProps={{ maxLength: 10 }}
                  labelClasses={classNames.blueLabel}
                  inputClasses={classNames.input}
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
                  labelClasses={classNames.label}
                  inputClasses={classNames.input}
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
            <Box className={classNames.noFlexElement}>
              <Field
                // disabled={!usePriceInDollars || checkIsPlanningPrice}
                disabled
                inputProps={{ maxLength: 10 }}
                inputClasses={classNames.input}
                labelClasses={classNames.label}
                label={t(TranslationKey['Cost of purchase per pc.']) + ', ¥'}
                value={toFixedWithYuanSign(calcPriceForItem(orderFields.priceInYuan, orderFields.amount), 2) || ''}
              />
            </Box>

            <div>
              <Field
                disabled
                label={t(TranslationKey['Planned cost in yuan']) + ', ¥'}
                inputClasses={classNames.input}
                labelClasses={classNames.blueLabel}
                value={toFixedWithYuanSign(
                  calcExchangeDollarsInYuansPrice(order.totalPrice, order?.yuanToDollarRate),
                  2,
                )}
              />
            </div>
            <div className={classNames.yuanToDollarRate}>
              <Field
                disabled={checkIsPlanningPrice}
                error={`${yuanToDollarRate}` !== `${orderFields?.yuanToDollarRate}`}
                inputProps={{ maxLength: 10 }}
                inputClasses={classNames.input}
                tooltipInfoContent={t(TranslationKey['Course to calculate the cost'])}
                label={t(TranslationKey['Current order course'])}
                labelClasses={classNames.label}
                value={orderFields?.yuanToDollarRate || ''}
                onChange={e => {
                  setOrderField('yuanToDollarRate')(e)
                }}
              />

              <Field
                disabled
                inputClasses={classNames.input}
                label={t(TranslationKey['Actual course'])}
                labelClasses={classNames.label}
                value={yuanToDollarRate}
              />

              {/* <Field
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
              /> */}
            </div>
          </Box>

          <Box className={classNames.noFlexElement}>
            <div className={classNames.onLineWrapper}>
              <div>
                <Field
                  disabled={!usePriceInDollars || checkIsPlanningPrice}
                  inputProps={{ maxLength: 10 }}
                  inputClasses={classNames.input}
                  labelClasses={classNames.greenLabel}
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
                  inputClasses={classNames.input}
                  labelClasses={classNames.label}
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
          <Box className={classNames.noFlexElement}>
            <Field
              // disabled={!usePriceInDollars || checkIsPlanningPrice}
              disabled
              inputProps={{ maxLength: 10 }}
              inputClasses={classNames.input}
              labelClasses={classNames.label}
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

                        // OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE],
                      ].includes(orderFields.status) || !checkIsPlanningPrice
                    }
                    checked={checkIsPlanningPrice}
                    color="primary"
                    className={classNames.checkbox}
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
            <Button
              disabled={checkIsPlanningPrice}
              className={classNames.button}
              variant="contained"
              // color="primary"
              onClick={onClickUpdateButton}
            >
              {t(TranslationKey.Update)}
            </Button>
          </div>

          {Number(orderFields.status) === Number(OrderStatusByKey[OrderStatus.READY_FOR_PAYMENT]) && (
            <div className={classNames.paymentsBlock} onClick={setPaymentMethodsModal}>
              <CustomSelectPaymentDetails column onlyRead orderPayments={orderPayments} allPayments={allPayments} />
            </div>
          )}
        </div>
      </Grid>

      <Grid item className={classNames.gridItem}>
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
            minRows={4}
            maxRows={4}
            inputProps={{ maxLength: 500 }}
            inputClasses={classNames.commentInput}
            value={orderFields.buyerComment}
            labelClasses={classNames.label}
            label={t(TranslationKey['Buyer comments to the order'])}
            onChange={setOrderField('buyerComment')}
          />
        </Box>

        <Box my={3} className={classNames.trackAndHsCodeAndComments}>
          <Box display="flex" width="100%">
            <Box className={classNames.trackAndHsCodeAndComments}>
              <div className={classNames.trackAndHsCodeAndCommentsSumWrapper}>
                <div className={classNames.barCodeWrapper}>
                  <div className={classNames.barCodeLinkWrapper}>
                    <LabelWithCopy
                      direction="column"
                      labelTitleColor="gray"
                      labelTitle={t(TranslationKey.BarCode)}
                      labelValue={orderFields.product.barCode}
                      lableLinkTitle={t(TranslationKey.View)}
                    />
                  </div>

                  <div className={classNames.researchWrapper}>
                    <Checkbox
                      disabled
                      className={classNames.checkbox}
                      checked={orderFields.needsResearch}
                      color="primary"
                    />
                    <Typography className={classNames.researchLabel}>
                      {t(TranslationKey['Re-search supplier'])}
                    </Typography>
                  </div>
                </div>
              </div>
            </Box>
          </Box>
          <div className={classNames.supplierPaymentButtonWrapper}>
            <Button
              className={cx(classNames.supplierPaymentButton, {
                [classNames.noPaymentButton]: orderFields?.paymentDetails.length,
              })}
              variant={
                !orderFields?.paymentDetails.length && !paymentDetailsPhotosToLoad.length ? 'outlined' : 'contained'
              }
              btnWrapperStyle={classNames.supplierPaymentButtonBtnWrapperStyle}
              onClick={onClickSupplierPaymentButton}
            >
              <Typography
                className={cx(classNames.normalPaymentText, {
                  [classNames.whiteNormalPaymentText]:
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
                <AddIcon className={classNames.addIcon} />
              )}

              {!!orderFields?.paymentDetails.length && (
                <Typography
                  className={cx(classNames.normalPaymentText, {
                    [classNames.whiteNormalPaymentText]:
                      orderFields?.paymentDetails.length || paymentDetailsPhotosToLoad.length,
                  })}
                >{`(${orderFields?.paymentDetails.length})`}</Typography>
              )}
              {!!paymentDetailsPhotosToLoad.length && (
                <Typography
                  className={cx(classNames.normalPaymentText, {
                    [classNames.whiteNormalPaymentText]:
                      orderFields?.paymentDetails.length || paymentDetailsPhotosToLoad.length,
                  })}
                >{`+ ${paymentDetailsPhotosToLoad.length}`}</Typography>
              )}
            </Button>
          </div>
        </Box>

        {/** Hs code fields */}

        <Box my={3} className={classNames.formItem} alignItems="flex-end">
          <div className={classNames.partialPaymentWrapper}>
            <div className={classNames.partialPaymentCheckbox}>
              <Checkbox
                className={classNames.checkbox}
                checked={orderFields.partialPayment}
                color="primary"
                onChange={() => setOrderField('partialPayment')({ target: { value: !orderFields.partialPayment } })}
              />
              <Typography className={classNames.label}>{t(TranslationKey['Partial payment'])}</Typography>
            </div>

            <div className={classNames.partialPaymentFields}>
              <Field
                disabled={!orderFields.partialPayment}
                label={t(TranslationKey['To pay']) + ', Ұ'}
                labelClasses={classNames.label}
                inputClasses={classNames.input}
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
                labelClasses={classNames.label}
                inputClasses={classNames.input}
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
          {/*   labelClasses={classNames.label} */}
          {/*   inputClasses={classNames.input} */}
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
              labelClasses={classNames.label}
              inputClasses={classNames.input}
              inputProps={{ maxLength: 50 }}
              onChange={setOrderField('tmpRefundToClient')}
            />
          ) : (
            <Box width="100%"></Box>
          )}
        </Box>

        <Box my={3} className={classNames.formItem}>
          <Field
            multiline
            minRows={2}
            maxRows={2}
            label={'产品中文品名'}
            labelClasses={classNames.label}
            inputClasses={cx(classNames.input, classNames.inputFullHeight)}
            inputProps={{ maxLength: 255 }}
            value={hsCode.chinaTitle}
            onChange={onChangeHsField('chinaTitle')}
          />

          <Field
            multiline
            minRows={2}
            maxRows={2}
            label={t(TranslationKey.Material)}
            labelClasses={classNames.label}
            inputClasses={cx(classNames.input, classNames.inputFullHeight)}
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
            labelClasses={classNames.label}
            inputClasses={classNames.inputFullHeight}
            inputProps={{ maxLength: 255 }}
            value={hsCode.productUsage}
            onChange={onChangeHsField('productUsage')}
          />
        </Box>

        <Box my={3} className={classNames.formItem}>
          <Field
            label={'HS Code'}
            labelClasses={classNames.label}
            inputClasses={classNames.input}
            inputProps={{ maxLength: 255 }}
            value={hsCode.hsCode}
            onChange={onChangeHsField('hsCode')}
          />

          {order.product.subUsers?.length ? (
            <div className={classNames.subUsersWrapper}>
              <div className={classNames.subUsersTitleWrapper}>
                <Typography className={classNames.subUsersTitle}>{t(TranslationKey['Product available'])}</Typography>
              </div>
              <div className={classNames.subUsersBodyWrapper}>
                <div className={classNames.subUsersBody}>
                  {order.product.subUsers?.map((subUser, index) => (
                    <div key={index} className={classNames.subUserBodyWrapper}>
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

        <div className={classNames.researchPaymentDateWrapper}>
          {orderFields.status >= 20 ? (
            <div>
              <Field
                disabled
                value={formatDateWithoutTime(orderFields.paymentDateToSupplier) || t(TranslationKey.Missing)}
                label={t(TranslationKey['Payment date'])}
                labelClasses={classNames.label}
                inputClasses={cx(classNames.input, {
                  [classNames.inputError]:
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
              <div className={classNames.imageFileInputWrapper}>
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
          handleOpenModal={() => setShowImageModal(!showImageModal)}
          files={bigImagesOptions.images}
          currentFileIndex={bigImagesOptions.imgIndex}
          handleCurrentFileIndex={imgIndex => setBigImagesOptions(() => ({ ...bigImagesOptions, imgIndex }))}
        />
      )}
    </Grid>
  )
}

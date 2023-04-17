/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import AddIcon from '@mui/icons-material/Add'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import {Box, Checkbox, Grid, Link, Typography} from '@mui/material'

import React, {useState} from 'react'

import {OrderStatus, OrderStatusByKey} from '@constants/order-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {CopyValue} from '@components/copy-value/copy-value'
import {CustomCarousel} from '@components/custom-carousel'
import {PhotoAndFilesCarousel, PhotoCarousel} from '@components/custom-carousel/custom-carousel'
import {UserLinkCell} from '@components/data-grid-cells/data-grid-cells'
import {Field} from '@components/field/field'
import {BigImagesModal} from '@components/modals/big-images-modal'
import {UploadFilesInput} from '@components/upload-files-input'

import {
  calcExchangeDollarsInYuansPrice,
  calcOrderTotalPrice,
  calcOrderTotalPriceInYuann,
  calcPriceForItem,
} from '@utils/calculation'
import {checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot} from '@utils/checks'
import {convertDaysToSeconds, formatDateWithoutTime, getDistanceBetweenDatesInSeconds} from '@utils/date-time'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {
  checkAndMakeAbsoluteUrl,
  getFullTariffTextForBoxOrOrder,
  toFixed,
  toFixedWithDollarSign,
  toFixedWithYuanSign,
} from '@utils/text'
import {t} from '@utils/translations'
import {downloadFileByLink} from '@utils/upload-files'

import {useClassNames} from './select-fields.style'

export const SelectFields = ({
  userInfo,
  imagesForLoad,
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
}) => {
  const {classes: classNames} = useClassNames()

  const onChangeHsField = fieldName => event => {
    const newFormFields = {...hsCode}
    newFormFields[fieldName] = event.target.value

    setHsCode(newFormFields)
  }
  console.log('order', order)
  console.log('imagesForLoad', imagesForLoad)

  const [showImageModal, setShowImageModal] = useState(false)

  const [bigImagesOptions, setBigImagesOptions] = useState({images: [], imgIndex: 0})

  const onUploadFile = imageIndex => async evt => {
    if (evt.target.files.length === 0) {
      return
    } else {
      const filesArr = Array.from(evt.target.files)

      evt.preventDefault()

      const readyFilesArr = filesArr.map(el => ({
        data_url: URL.createObjectURL(el),
        file: new File([el], el.name?.replace(/ /g, ''), {
          type: el.type,
          lastModified: el.lastModified,
        }),
      }))

      onChangeImagesForLoad(imagesForLoad.map((el, i) => (i === imageIndex ? readyFilesArr[0] : el)))
      setBigImagesOptions(() => ({
        ...bigImagesOptions,
        images: imagesForLoad.map((el, i) => (i === imageIndex ? readyFilesArr[0] : el)),
      }))
    }
  }

  const onClickRemoveImageObj = imageIndex => {
    const newArr = imagesForLoad.filter((el, i) => i !== imageIndex)

    onChangeImagesForLoad(newArr)
    setBigImagesOptions(() => ({
      ...bigImagesOptions,
      imgIndex: bigImagesOptions.imgIndex - 1 < 0 ? 0 : bigImagesOptions.imgIndex - 1,
      images: newArr,
    }))

    if (!newArr.length) {
      setShowImageModal(false)
    }
  }

  const bigImagesModalControls = (imageIndex /* , image */) => (
    <>
      <Button danger className={cx(classNames.imagesModalBtn)} onClick={() => onClickRemoveImageObj(imageIndex)}>
        <DeleteOutlineOutlinedIcon />
      </Button>

      <Button className={cx(classNames.imagesModalBtn)}>
        <AutorenewIcon />
        <input type={'file'} className={classNames.pasteInput} defaultValue={''} onChange={onUploadFile(imageIndex)} />
      </Button>
    </>
  )

  return (
    <Grid container justifyContent="space-between" className={classNames.container}>
      <Grid item>
        <div className={classNames.photoAndFieldsWrapper}>
          <div className={classNames.photoWrapper}>
            {/* <PhotoCarousel isAmazonPhoto files={order.product.images} /> */}

            {!!imagesForLoad.length && (
              <div className={classNames.carouselWrapper}>
                <CustomCarousel>
                  {imagesForLoad.map((imageHash, index) => (
                    <img
                      key={index}
                      alt=""
                      className={classNames.carouselImage}
                      // src={getAmazonImageUrl(imageHash, true)}

                      src={
                        typeof imageHash === 'string'
                          ? getAmazonImageUrl(imageHash, true)
                          : imageHash?.file.type.includes('image')
                          ? imageHash?.data_url
                          : '/assets/icons/file.png'
                      }
                      onClick={() => {
                        setShowImageModal(!showImageModal)
                        setBigImagesOptions({
                          images:
                            /* checkIsBuyer(curUserRole) || checkIsAdmin(curUserRole) ? photos : photos */ imagesForLoad,
                          imgIndex: index,
                        })
                      }}
                    />
                  ))}
                </CustomCarousel>
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
                  inputProps={{maxLength: 10}}
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
                inputProps={{maxLength: 10}}
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
                  calcExchangeDollarsInYuansPrice(order.totalPrice, order.yuanToDollarRate),
                  2,
                )}
              />
            </div>
            <div className={classNames.yuanToDollarRate}>
              <Field
                disabled={checkIsPlanningPrice}
                error={`${yuanToDollarRate}` !== `${orderFields.yuanToDollarRate}`}
                inputProps={{maxLength: 10}}
                inputClasses={classNames.input}
                tooltipInfoContent={t(TranslationKey['Course to calculate the cost'])}
                label={t(TranslationKey['Current order course'])}
                labelClasses={classNames.label}
                value={orderFields.yuanToDollarRate || ''}
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
                  inputProps={{maxLength: 10}}
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
                  inputProps={{maxLength: 10}}
                  inputClasses={classNames.input}
                  labelClasses={classNames.label}
                  label={t(TranslationKey['Of these, for shipping to a warehouse in China']) + ', $'}
                  value={toFixed(orderFields.deliveryCostToTheWarehouse, 2) || ''}
                  onChange={e => {
                    Number(e.target.value) < orderFields.totalPriceChanged &&
                      setOrderField('deliveryCostToTheWarehouse')(e)

                    setOrderField('priceBatchDeliveryInYuan')({
                      target: {
                        value: calcExchangeDollarsInYuansPrice(e.target.value, orderFields.yuanToDollarRate),
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
              inputProps={{maxLength: 10}}
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
        </div>
      </Grid>

      <Grid item className={classNames.gridItem}>
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

          <Box display="flex" width="100%">
            <Box className={classNames.trackAndHsCodeAndComments}>
              <div>
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
              </div>
              {/* <div className={classNames.researchWrapper}>
                <Checkbox
                  disabled
                  className={classNames.checkbox}
                  checked={orderFields.needsResearch}
                  color="primary"
                />
                <Typography className={classNames.researchLabel}>{t(TranslationKey['Re-search supplier'])}</Typography>
              </div> */}
            </Box>
          </Box>
        </Box>

        {/** Hs code fields */}

        <Box my={3} className={classNames.formItem} alignItems="flex-end">
          <Field
            label={'HS Code'}
            labelClasses={classNames.label}
            inputClasses={classNames.input}
            inputProps={{maxLength: 255}}
            value={hsCode.hsCode}
            onChange={onChangeHsField('hsCode')}
          />

          {!isPendingOrder && (
            <div className={classNames.supplierPaymentButtonWrapper}>
              <Button
                className={cx(classNames.supplierPaymentButton, {
                  [classNames.noPaymentButton]: orderFields?.paymentDetails.length,
                })}
                variant={
                  !orderFields?.paymentDetails.length && !paymentDetailsPhotosToLoad.length ? 'outlined' : 'contained'
                }
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
            inputProps={{maxLength: 255}}
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
            inputProps={{maxLength: 255}}
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
            inputProps={{maxLength: 255}}
            value={hsCode.productUsage}
            onChange={onChangeHsField('productUsage')}
          />
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
                <UploadFilesInput images={photosToLoad} setImages={setPhotosToLoad} maxNumber={50} />
              </div>
            )
          }
          <PhotoAndFilesCarousel small files={order.images} width="400px" />
        </div>

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
                      customStyles={{fontWeight: 600, marginLeft: 5}}
                      maxNameWidth={100}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </Grid>

      {showProgress && (
        <CircularProgressWithLabel value={progressValue} title={t(TranslationKey['Uploading Photos...'])} />
      )}

      {/* <BigImagesModal
        openModal={showPhotosModal}
        setOpenModal={() => setShowPhotosModal(!showPhotosModal)}
        images={order.images || []}
      /> */}

      <BigImagesModal
        showPreviews
        openModal={showImageModal}
        setOpenModal={() => setShowImageModal(!showImageModal)}
        images={bigImagesOptions.images}
        imgIndex={bigImagesOptions.imgIndex}
        setImageIndex={imgIndex => setBigImagesOptions(() => ({...bigImagesOptions, imgIndex}))}
        controls={bigImagesModalControls}
      />
    </Grid>
  )
}

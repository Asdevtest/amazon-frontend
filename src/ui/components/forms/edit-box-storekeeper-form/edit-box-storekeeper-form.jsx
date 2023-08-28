/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'

import { Avatar, Checkbox, Chip, Divider, Typography } from '@mui/material'

import {
  getConversion,
  getWeightSizesType,
  inchesCoefficient,
  poundsWeightCoefficient,
  sizesType,
  unitsOfChangeOptions,
} from '@constants/configs/sizes-settings'
import { zipCodeGroups } from '@constants/configs/zip-code-groups'
import { tariffTypes } from '@constants/keys/tariff-types'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { UiTheme } from '@constants/theme/themes'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { ImageModal } from '@components/modals/image-modal/image-modal'
import { SetBarcodeModal } from '@components/modals/set-barcode-modal'
import { SetShippingLabelModal } from '@components/modals/set-shipping-label-modal'
import { Button } from '@components/shared/buttons/button'
import { ToggleBtnGroup } from '@components/shared/buttons/toggle-btn-group/toggle-btn-group'
import { ToggleBtn } from '@components/shared/buttons/toggle-btn-group/toggle-btn/toggle-btn'
import { CustomSlider } from '@components/shared/custom-slider'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Field } from '@components/shared/field'
import { Input } from '@components/shared/input'
import { Modal } from '@components/shared/modal'
import { PhotoAndFilesCarouselTest } from '@components/shared/photo-and-files-carousel-test'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'
import { Table } from '@components/shared/table'
import { Text } from '@components/shared/text'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { calcFinalWeightForBox, calcVolumeWeightForBox } from '@utils/calculation'
import { getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './edit-box-storekeeper-form.style'

import { SelectStorekeeperAndTariffForm } from '../select-storkeeper-and-tariff-form'

export const WarehouseDemensions = ({ orderBox, sizeSetting, volumeWeightCoefficient, setFormField, showCheckbox }) => {
  const { classes: classNames } = useClassNames()

  const weightConversion = getConversion(sizeSetting, poundsWeightCoefficient)

  return (
    <div className={classNames.numberInputFieldsBlocksWrapper}>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          inputProps={{ maxLength: 6 }}
          error={Number(orderBox.lengthCmWarehouse) === 0 && true}
          containerClasses={classNames.numberInputField}
          labelClasses={classNames.label}
          label={t(TranslationKey.Length) + ': '}
          value={orderBox.lengthCmWarehouse}
          onChange={setFormField('lengthCmWarehouse')}
        />

        <Field
          inputProps={{ maxLength: 6 }}
          error={Number(orderBox.widthCmWarehouse) === 0 && true}
          containerClasses={classNames.numberInputField}
          labelClasses={classNames.label}
          label={t(TranslationKey.Width) + ': '}
          value={orderBox.widthCmWarehouse}
          onChange={setFormField('widthCmWarehouse')}
        />
      </div>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          inputProps={{ maxLength: 6 }}
          error={Number(orderBox.heightCmWarehouse) === 0 && true}
          labelClasses={classNames.label}
          containerClasses={classNames.numberInputField}
          label={t(TranslationKey.Height) + ': '}
          value={orderBox.heightCmWarehouse}
          onChange={setFormField('heightCmWarehouse')}
        />

        <Field
          inputProps={{ maxLength: 6 }}
          error={Number(orderBox.weighGrossKgWarehouse) === 0 && true}
          containerClasses={classNames.numberInputField}
          labelClasses={classNames.label}
          label={t(TranslationKey.Weight) + ': '}
          value={toFixed(orderBox.weighGrossKgWarehouse, 2)}
          onChange={setFormField('weighGrossKgWarehouse')}
        />
      </div>
      <div className={classNames.numberInputFieldsWrapper}>
        <Field
          disabled
          containerClasses={classNames.numberInputField}
          label={t(TranslationKey['Volume weight']) + ': '}
          labelClasses={classNames.label}
          value={
            //   toFixed(
            //   (sizeSetting === unitsOfChangeOptions.EU
            //     ? orderBox.heightCmWarehouse *
            //       inchesCoefficient *
            //       orderBox.widthCmWarehouse *
            //       inchesCoefficient *
            //       orderBox.lengthCmWarehouse *
            //       inchesCoefficient
            //     : orderBox.heightCmWarehouse * orderBox.widthCmWarehouse * orderBox.lengthCmWarehouse) /
            //     volumeWeightCoefficient,
            //   2,
            // )
            toFixed(calcVolumeWeightForBox(orderBox, volumeWeightCoefficient), 2)
          }
        />

        <Field
          disabled
          containerClasses={classNames.numberInputField}
          label={t(TranslationKey['Final weight']) + ': '}
          labelClasses={classNames.label}
          value={toFixed(
            Math.max(
              // toFixed(
              //   ((sizeSetting === unitsOfChangeOptions.US
              //     ? ((((orderBox.heightCmWarehouse / inchesCoefficient) * orderBox.widthCmWarehouse) /
              //         inchesCoefficient) *
              //         orderBox.lengthCmWarehouse) /
              //       inchesCoefficient
              //     : orderBox.heightCmWarehouse * orderBox.widthCmWarehouse * orderBox.lengthCmWarehouse) /
              //     volumeWeightCoefficient,
              //   orderBox.weighGrossKgWarehouse),
              //   2,
              // ),

              (orderBox.heightCmWarehouse * orderBox.widthCmWarehouse * orderBox.lengthCmWarehouse) /
                volumeWeightCoefficient,
              orderBox.weighGrossKgWarehouse,
            ),
            2,
          )}
        />
      </div>
    </div>
  )
}

export const EditBoxStorekeeperForm = observer(
  ({
    formItem,
    onSubmit,
    onTriggerOpenModal,
    requestStatus,
    volumeWeightCoefficient,
    destinations,
    storekeepers,

    destinationsFavourites,
    setDestinationsFavouritesItem,
    onClickHsCode,
  }) => {
    const { classes: classNames } = useClassNames()

    const [showSetShippingLabelModal, setShowSetShippingLabelModal] = useState(false)
    const [showPhotosModal, setShowPhotosModal] = useState(false)

    const [bigImagesOptions, setBigImagesOptions] = useState({ images: [], imgIndex: 0 })

    const [imagesOfBox, setImagesOfBox] = useState([])

    const rowHandlers = {
      onTriggerOpenModal: () => setShowPhotosModal(!showPhotosModal),
      onSelectPhotos: setBigImagesOptions,
    }

    const [curProductToEditBarcode, setCurProductToEditBarcode] = useState(null)

    const [showSetBarcodeModal, setShowSetBarcodeModal] = useState(false)

    const onClickSaveBarcode = product => newBarCodeData => {
      const newFormFields = { ...boxFields }

      newFormFields.items = [
        ...boxFields.items.map(el =>
          el.product._id === product.product?._id ? { ...el, tmpBarCode: newBarCodeData } : el,
        ),
      ]

      setBoxFields(newFormFields)

      setShowSetBarcodeModal(false)
    }

    const onClickGluedCheckbox = (field, itemId) => e => {
      const newFormFields = { ...boxFields }

      if (field === 'isBarCodeAlreadyAttachedByTheSupplier') {
        newFormFields.items = [
          ...boxFields.items.map(el =>
            el._id === itemId
              ? {
                  ...el,
                  isBarCodeAlreadyAttachedByTheSupplier: e.target.checked,
                  isBarCodeAttachedByTheStorekeeper: el.isBarCodeAttachedByTheStorekeeper
                    ? !e.target.checked
                    : el.isBarCodeAttachedByTheStorekeeper,
                }
              : el,
          ),
        ]
      } else if (field === 'isBarCodeAttachedByTheStorekeeper') {
        newFormFields.items = [
          ...boxFields.items.map(el =>
            el._id === itemId
              ? {
                  ...el,
                  isBarCodeAlreadyAttachedByTheSupplier: el.isBarCodeAlreadyAttachedByTheSupplier
                    ? !e.target.checked
                    : el.isBarCodeAlreadyAttachedByTheSupplier,
                  isBarCodeAttachedByTheStorekeeper: e.target.checked,
                }
              : el,
          ),
        ]
      }

      setBoxFields(newFormFields)
    }

    const boxInitialState = {
      ...formItem,

      lengthCmWarehouse: formItem?.lengthCmWarehouse || 0,
      widthCmWarehouse: formItem?.widthCmWarehouse || 0,
      heightCmWarehouse: formItem?.heightCmWarehouse || 0,
      weighGrossKgWarehouse: formItem?.weighGrossKgWarehouse || 0,
      volumeWeightKgWarehouse: formItem ? calcVolumeWeightForBox(formItem, volumeWeightCoefficient) : 0,
      weightFinalAccountingKgWarehouse: formItem ? calcFinalWeightForBox(formItem, volumeWeightCoefficient) : 0,

      destinationId: formItem?.destination?._id || null,
      storekeeperId: formItem?.storekeeper?._id || '',
      logicsTariffId: formItem?.logicsTariff?._id || null,
      variationTariffId: formItem?.variationTariff?._id || null,

      amount: formItem?.amount,
      shippingLabel: formItem?.shippingLabel,
      clientComment: formItem?.clientComment || '',
      storekeeperTaskComment: '',
      images: formItem?.images || [],
      fbaShipment: formItem?.fbaShipment || '',
      tmpShippingLabel: [],
      items: formItem?.items ? [...formItem.items.map(el => ({ ...el, tmpBarCode: [] }))] : [],
      tmpTrackNumberFile: [],
    }

    const [boxFields, setBoxFields] = useState(boxInitialState)

    const [destinationId, setDestinationId] = useState(boxFields?.destinationId)

    useEffect(() => {
      setDestinationId(boxFields?.destinationId)
    }, [boxFields?.destinationId])

    const setFormField = fieldName => e => {
      const newFormFields = { ...boxFields }

      if (['weighGrossKgWarehouse', 'widthCmWarehouse', 'heightCmWarehouse', 'lengthCmWarehouse'].includes(fieldName)) {
        if (isNaN(e.target.value) || Number(e.target.value) < 0) {
          return
        }
      }

      newFormFields[fieldName] = e.target.value

      setBoxFields(newFormFields)
    }

    const setHsCode = index => e => {
      const newFormFields = JSON.parse(JSON.stringify(boxFields))
      newFormFields.items[index].product.hsCode = e.target.value

      setBoxFields(newFormFields)
    }

    const setShippingLabel = () => value => {
      const newFormFields = { ...boxFields }
      newFormFields.shippingLabel = newFormFields.shippingLabel === null ? null : ''
      newFormFields.tmpShippingLabel = value

      setBoxFields(newFormFields)
    }

    const onClickShippingLabel = () => {
      setShowSetShippingLabelModal(!showSetShippingLabelModal)
    }

    const onDeleteShippingLabel = () => {
      const newFormFields = { ...boxFields }
      newFormFields.shippingLabel = newFormFields.shippingLabel === null ? null : ''
      newFormFields.tmpShippingLabel = []
      setBoxFields(newFormFields)
    }

    const onDeleteBarcode = productId => {
      const newFormFields = { ...boxFields }
      newFormFields.items = boxFields.items.map(item =>
        item.product._id === productId ? { ...item, barCode: '' } : item,
      )
      setBoxFields(newFormFields)
    }

    const [sizeSetting, setSizeSetting] = useState(unitsOfChangeOptions.EU)

    const handleChange = newCondition => {
      setSizeSetting(newCondition)

      if (newCondition === unitsOfChangeOptions.US) {
        setBoxFields({
          ...boxFields,
          lengthCmWarehouse: toFixed(boxFields.lengthCmWarehouse / inchesCoefficient, 2),
          widthCmWarehouse: toFixed(boxFields.widthCmWarehouse / inchesCoefficient, 2),
          heightCmWarehouse: toFixed(boxFields.heightCmWarehouse / inchesCoefficient, 2),
          weighGrossKgWarehouse: toFixed(boxFields.weighGrossKgWarehouse / poundsWeightCoefficient, 2),
        })
      } else {
        setBoxFields({
          ...boxFields,
          lengthCmWarehouse: toFixed(boxFields.lengthCmWarehouse * inchesCoefficient, 2),
          widthCmWarehouse: toFixed(boxFields.widthCmWarehouse * inchesCoefficient, 2),
          heightCmWarehouse: toFixed(boxFields.heightCmWarehouse * inchesCoefficient, 2),
          weighGrossKgWarehouse: toFixed(boxFields.weighGrossKgWarehouse * poundsWeightCoefficient, 2),
        })
      }
    }

    const getBoxDataToSubmit = () => {
      if (sizeSetting === unitsOfChangeOptions.US) {
        return {
          ...boxFields,
          destinationId: boxFields.destinationId || null,
          lengthCmWarehouse: toFixed(boxFields.lengthCmWarehouse * inchesCoefficient, 2),
          widthCmWarehouse: toFixed(boxFields.widthCmWarehouse * inchesCoefficient, 2),
          heightCmWarehouse: toFixed(boxFields.heightCmWarehouse * inchesCoefficient, 2),
          weighGrossKgWarehouse: toFixed(boxFields.weighGrossKgWarehouse * poundsWeightCoefficient, 2),
        }
      } else {
        return { ...boxFields, destinationId: boxFields.destinationId || null }
      }
    }

    const [showSelectionStorekeeperAndTariffModal, setShowSelectionStorekeeperAndTariffModal] = useState(false)

    const onSubmitSelectStorekeeperAndTariff = (storekeeperId, tariffId, variationTariffId, destinationId) => {
      setBoxFields({ ...boxFields, storekeeperId, logicsTariffId: tariffId, variationTariffId })
      setDestinationId(destinationId)

      setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)
    }

    const [barcodeModalSetting, setBarcodeModalSetting] = useState({
      title: '',
      maxNumber: 1,

      tmpCode: curProductToEditBarcode?.tmpBarCode,
      item: curProductToEditBarcode,
      onClickSaveBarcode: data => onClickSaveBarcode(curProductToEditBarcode)(data),
    })

    const onClickBarcode = item => {
      setCurProductToEditBarcode(item)

      setBarcodeModalSetting({
        title: '',
        maxNumber: 1,

        tmpCode: item?.tmpBarCode,
        item,
        onClickSaveBarcode: data => onClickSaveBarcode(item)(data),
      })

      setShowSetBarcodeModal(!showSetBarcodeModal)
    }

    const onDoubleClickBarcode = item => {
      setCurProductToEditBarcode(item)

      setBarcodeModalSetting({
        title: '',
        maxNumber: 1,

        tmpCode: item?.tmpBarCode,
        item,
        onClickSaveBarcode: data => onClickSaveBarcode(item)(data),
      })
      setShowSetBarcodeModal(!showSetBarcodeModal)
    }

    const disableSubmit =
      (JSON.stringify(getObjectFilteredByKeyArrayBlackList(boxInitialState, ['logicsTariffId'])) ===
        JSON.stringify(getObjectFilteredByKeyArrayBlackList(boxFields, ['logicsTariffId'])) ||
        boxFields.storekeeperId === '') &&
      !imagesOfBox.length

    const curDestination = destinations.find(el => el._id === boxFields.destinationId)
    const currentStorekeeper = storekeepers.find(el => el._id === boxFields.storekeeperId)
    const currentLogicsTariff = currentStorekeeper?.tariffLogistics.find(el => el._id === boxFields.logicsTariffId)

    const firstNumOfCode = curDestination?.zipCode[0]

    const regionOfDeliveryName = zipCodeGroups.find(el => el.codes.includes(Number(firstNumOfCode)))?.name

    const tariffName = currentLogicsTariff?.name

    const tariffRate =
      currentLogicsTariff?.conditionsByRegion[regionOfDeliveryName]?.rate ||
      currentLogicsTariff?.destinationVariations?.find(el => el._id === boxFields?.variationTariffId)?.pricePerKgUsd

    const allItemsCount =
      boxFields.items.reduce((ac, cur) => (ac = ac + cur.amount), 0) * (boxFields.amount < 1 ? 1 : boxFields.amount)

    return (
      <div className={classNames.root}>
        <div className={classNames.titleWrapper}>
          <Typography className={classNames.title}>{t(TranslationKey['Editing the box'])}</Typography>{' '}
          <img src={'/assets/img/edit.png'} />
        </div>

        <div className={classNames.form}>
          <Field
            label={t(TranslationKey.Edit)}
            inputComponent={
              <div className={classNames.editBlockWrapper}>
                <div className={classNames.editBlockHeaderWrapper}>
                  <div className={classNames.titlePrepIdSubWrapper}>
                    <Field
                      oneLine
                      labelClasses={classNames.standartLabel}
                      containerClasses={classNames.containerTitleField}
                      label={`${t(TranslationKey.Box)} №`}
                      inputComponent={
                        <div className={classNames.boxTitleWrapper}>
                          <Typography className={classNames.tableTitle}>{`${
                            formItem && formItem.humanFriendlyId
                          }`}</Typography>

                          {/* <Typography className={classNames.amountSpan}>
                            {boxFields.amount > 1 ? `super x ${boxFields.amount}` : ''}
                          </Typography> */}
                        </div>
                      }
                    />

                    <Field
                      oneLine
                      labelClasses={classNames.standartLabel}
                      label={`ID:`}
                      inputComponent={
                        <Input
                          className={classNames.itemInput}
                          classes={{ input: classNames.input }}
                          inputProps={{ maxLength: 25 }}
                          value={boxFields.prepId}
                          onChange={setFormField('prepId')}
                        />
                      }
                    />
                  </div>
                  <Field
                    oneLine
                    disabled
                    labelClasses={classNames.standartLabel}
                    inputClasses={classNames.disabledNumInput}
                    containerClasses={classNames.containerField}
                    label={t(TranslationKey['Total goods In Box'])}
                    value={allItemsCount}
                  />
                </div>
                <Typography className={classNames.amountSpan}>
                  {boxFields.amount > 1 ? `super x ${boxFields.amount}` : ''}
                </Typography>

                <Divider className={classNames.divider} />

                <div className={classNames.productsWrapper}>
                  <CustomSlider alignButtons="end">
                    {boxFields.items.map((item, index) => (
                      <div key={index} className={classNames.productWrapper}>
                        <div className={classNames.leftProductColumn}>
                          <div className={classNames.photoWrapper}>
                            <PhotoAndFilesCarouselTest withoutFiles files={item.product.images} />
                          </div>

                          <>
                            <Field
                              containerClasses={classNames.field}
                              tooltipAttentionContent={
                                !item.barCode && t(TranslationKey['A task will be created for the prep center'])
                              }
                              tooltipInfoContent={
                                !item.barCode &&
                                t(
                                  TranslationKey[
                                    'Add a product barcode to the box. A task will be created for the prep center'
                                  ],
                                )
                              }
                              labelClasses={classNames.standartLabel}
                              label={t(TranslationKey.BarCode)}
                              inputComponent={
                                <div>
                                  <Chip
                                    classes={{
                                      root: classNames.barcodeChip,
                                      clickable: classNames.barcodeChipHover,
                                      deletable: classNames.barcodeChipHover,
                                      deleteIcon: classNames.barcodeChipIcon,
                                      label: classNames.barcodeChiplabel,
                                    }}
                                    className={cx({ [classNames.barcodeChipExists]: item.barCode })}
                                    size="small"
                                    label={
                                      item.tmpBarCode.length
                                        ? t(TranslationKey['File added'])
                                        : item.barCode
                                        ? item.barCode
                                        : t(TranslationKey['Set Barcode'])
                                    }
                                    onClick={() => onClickBarcode(item)}
                                    onDoubleClick={() => onDoubleClickBarcode(item)}
                                    onDelete={!item.barCode ? undefined : () => onDeleteBarcode(item.product._id)}
                                  />
                                </div>
                              }
                            />

                            <div>
                              <Field
                                oneLine
                                labelClasses={classNames.standartLabel}
                                tooltipInfoContent={t(
                                  TranslationKey['The supplier has glued the barcode before shipment'],
                                )}
                                containerClasses={classNames.checkboxContainer}
                                label={t(TranslationKey['The barcode is glued by the supplier'])}
                                inputComponent={
                                  <Checkbox
                                    checked={item.isBarCodeAlreadyAttachedByTheSupplier}
                                    onChange={onClickGluedCheckbox('isBarCodeAlreadyAttachedByTheSupplier', item._id)}
                                  />
                                }
                              />
                              <Field
                                oneLine
                                labelClasses={classNames.standartLabel}
                                tooltipInfoContent={t(
                                  TranslationKey[
                                    'The barcode was glued on when the box was accepted at the prep center'
                                  ],
                                )}
                                containerClasses={classNames.checkboxContainer}
                                label={t(TranslationKey['The barcode is glued by the Storekeeper'])}
                                inputComponent={
                                  <Checkbox
                                    checked={item.isBarCodeAttachedByTheStorekeeper}
                                    onChange={onClickGluedCheckbox('isBarCodeAttachedByTheStorekeeper', item._id)}
                                  />
                                }
                              />
                            </div>
                          </>
                        </div>

                        <div className={classNames.rightProductColumn}>
                          <Typography className={classNames.amazonTitle}>{item.product.amazonTitle}</Typography>

                          <Field
                            oneLine
                            containerClasses={classNames.field}
                            labelClasses={classNames.standartLabel}
                            label={`${t(TranslationKey.ASIN)}:`}
                            inputComponent={
                              <Typography className={classNames.asinText}>{item.product.asin}</Typography>
                            }
                          />

                          <Field
                            oneLine
                            disabled
                            labelClasses={classNames.standartLabel}
                            inputClasses={classNames.disabledNumInput}
                            label={t(TranslationKey['Quantity units of product'])}
                            value={item.amount}
                          />

                          <Field
                            multiline
                            disabled
                            minRows={5}
                            maxRows={5}
                            labelClasses={classNames.standartLabel}
                            inputClasses={classNames.multiline}
                            label={t(TranslationKey['Comments on order'])}
                            value={item.order.clientComment}
                          />

                          <Field
                            labelClasses={classNames.standartLabel}
                            containerClasses={classNames.field}
                            inputClasses={classNames.inputField}
                            inputProps={{ maxLength: 255 }}
                            label={t(TranslationKey['HS code'])}
                            value={item.product.hsCode}
                            inputComponent={
                              <Button
                                variant="contained"
                                color="primary"
                                className={classNames.hsCodeBtn}
                                onClick={() => onClickHsCode(item.product._id)}
                              >
                                {t(TranslationKey['HS code'])}
                              </Button>
                            }
                            onChange={setHsCode(index)}
                          />
                        </div>
                      </div>
                    ))}
                  </CustomSlider>
                </div>

                <Divider className={classNames.divider} />
                <div className={classNames.shareBoxWrapper}>
                  <div className={classNames.shareBoxSubWrapper}>
                    <Field
                      labelClasses={classNames.standartLabel}
                      containerClasses={classNames.field}
                      label={t(TranslationKey.Destination)}
                      tooltipInfoContent={t(
                        TranslationKey["Amazon's final warehouse in the USA, available for change"],
                      )}
                      inputComponent={
                        <WithSearchSelect
                          width={230}
                          favourites={destinationsFavourites}
                          selectedItemName={
                            destinations.find(el => el._id === boxFields.destinationId)?.name ||
                            t(TranslationKey['Not chosen'])
                          }
                          data={
                            boxFields.logicsTariffId &&
                            currentLogicsTariff?.tariffType === tariffTypes.WEIGHT_BASED_LOGISTICS_TARIFF
                              ? destinations.filter(el => el?._id === destinationId)
                              : destinations.filter(el => el.storekeeper?._id !== formItem?.storekeeper._id)
                          }
                          searchFields={['name']}
                          onClickNotChosen={() => setBoxFields({ ...boxFields, destinationId: null })}
                          onClickSelect={el => setBoxFields({ ...boxFields, destinationId: el._id })}
                          onClickSetDestinationFavourite={setDestinationsFavouritesItem}
                        />
                      }
                    />

                    <Field
                      labelClasses={classNames.standartLabel}
                      containerClasses={classNames.field}
                      label={`${t(TranslationKey['Int warehouse'])} / ${t(TranslationKey.Tariff)}`}
                      tooltipInfoContent={t(TranslationKey['Prep Center in China, available for change'])}
                      error={!tariffName && t(TranslationKey['The tariff is invalid or has been removed!'])}
                      inputComponent={
                        <Button
                          disableElevation
                          color="primary"
                          variant={boxFields.storekeeperId && 'text'}
                          className={cx(classNames.storekeeperBtnDefault, {
                            [classNames.storekeeperBtn]: !boxFields.storekeeperId,
                            [classNames.storekeeperBtnColored]:
                              !boxFields.storekeeperId && SettingsModel.uiTheme === UiTheme.light,
                          })}
                          onClick={() =>
                            setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)
                          }
                        >
                          {/* {boxFields.storekeeperId
                            ? `${
                                storekeepers.find(el => el._id === boxFields.storekeeperId)?.name ||
                                t(TranslationKey['Not available'])
                              } /
                        ${
                          boxFields.storekeeperId
                            ? `${tariffName ? tariffName + ' / ' : ''}${
                                regionOfDeliveryName ? regionOfDeliveryName : ''
                              }${tariffRate ? ' / ' + tariffRate + ' $' : ''}`
                            : 'none'
                        }`
                            : t(TranslationKey.Select)} */}

                          {boxFields.storekeeperId
                            ? `${tariffName ? tariffName : ''}${tariffRate ? ' / ' + tariffRate + ' $' : ''}`
                            : t(TranslationKey.Select)}
                        </Button>
                      }
                    />
                  </div>
                  <div className={classNames.shareBoxSubWrapper}>
                    <Field
                      labelClasses={classNames.standartLabel}
                      containerClasses={classNames.field}
                      inputClasses={cx(classNames.fbaShipmentInput)}
                      inputProps={{ maxLength: 255 }}
                      label={t(TranslationKey['Reference id'])}
                      value={boxFields.referenceId}
                      onChange={setFormField('referenceId')}
                    />

                    <Field
                      labelClasses={classNames.standartLabel}
                      containerClasses={classNames.shippingField}
                      tooltipInfoContent={t(TranslationKey['Add or replace the shipping label'])}
                      tooltipAttentionContent={t(
                        TranslationKey['When re-sticking will create a task for the prep center'],
                      )}
                      label={t(TranslationKey['Shipping label'])}
                      inputComponent={
                        <div>
                          <Chip
                            classes={{
                              root: classNames.barcodeChip,
                              clickable: classNames.barcodeChipHover,
                              deletable: classNames.barcodeChipHover,
                              deleteIcon: classNames.barcodeChipIcon,
                              label: classNames.barcodeChiplabel,
                            }}
                            className={cx({ [classNames.barcodeChipExists]: boxFields.shippingLabel })}
                            size="small"
                            label={
                              boxFields.tmpShippingLabel.length
                                ? t(TranslationKey['File added'])
                                : boxFields.shippingLabel
                                ? boxFields.shippingLabel
                                : t(TranslationKey['Set Shipping Label'])
                            }
                            onClick={() => onClickShippingLabel()}
                            onDelete={!boxFields.shippingLabel ? undefined : () => onDeleteShippingLabel()}
                          />
                        </div>
                      }
                    />
                  </div>
                  <div className={classNames.shareBoxSubWrapper}>
                    <Field
                      labelClasses={classNames.standartLabel}
                      containerClasses={classNames.field}
                      inputClasses={classNames.fbaShipmentInput}
                      inputProps={{ maxLength: 255 }}
                      tooltipInfoContent={t(TranslationKey['Enter or edit FBA Shipment'])}
                      label={t(TranslationKey['FBA Shipment'])}
                      value={boxFields.fbaShipment}
                      onChange={setFormField('fbaShipment')}
                    />

                    <Field
                      labelClasses={classNames.standartLabel}
                      containerClasses={classNames.field}
                      inputClasses={classNames.fbaShipmentInput}
                      inputProps={{ maxLength: 255 }}
                      label={'FBA number'}
                      value={boxFields.fbaNumber}
                      onChange={setFormField('fbaNumber')}
                    />
                  </div>

                  <div className={classNames.shareBoxSubWrapper}>
                    <Field
                      labelClasses={classNames.standartLabel}
                      containerClasses={classNames.field}
                      inputClasses={classNames.fbaShipmentInput}
                      inputProps={{ maxLength: 255 }}
                      label={'UPS Track number'}
                      value={boxFields.upsTrackNumber}
                      onChange={setFormField('upsTrackNumber')}
                    />
                  </div>

                  <div className={classNames.labelsInfoWrapper}>
                    <div>
                      <Field
                        labelClasses={classNames.standartLabel}
                        containerClasses={classNames.field}
                        inputClasses={classNames.inputField}
                        inputProps={{ maxLength: 255 }}
                        label={t(TranslationKey['Track number'])}
                        value={boxFields.trackNumberText}
                        onChange={setFormField('trackNumberText')}
                      />

                      <Button
                        className={classNames.trackNumberPhotoBtn}
                        onClick={() => {
                          setBarcodeModalSetting({
                            title: 'Track number',
                            maxNumber: 50 - boxFields.tmpTrackNumberFile.length - boxFields.trackNumberFile.length,

                            tmpCode: boxFields.tmpTrackNumberFile,
                            item: null,
                            onClickSaveBarcode: value => {
                              setFormField('tmpTrackNumberFile')({ target: { value } })
                              setShowSetBarcodeModal(false)
                            },
                          })

                          setShowSetBarcodeModal(!showSetBarcodeModal)
                        }}
                      >
                        {boxFields.tmpTrackNumberFile[0]
                          ? t(TranslationKey['File added'])
                          : t(TranslationKey['Photo track numbers'])}
                      </Button>
                    </div>

                    <div className={classNames.trackNumberPhotoWrapper}>
                      {boxFields.trackNumberFile[0] || boxFields.tmpTrackNumberFile[0] ? (
                        <CustomSlider>
                          {(boxFields.trackNumberFile.length
                            ? boxFields.trackNumberFile
                            : boxFields.tmpTrackNumberFile
                          ).map((el, index) => (
                            <img
                              key={index}
                              className={classNames.trackNumberPhoto}
                              src={
                                boxFields.tmpTrackNumberFile[index]
                                  ? typeof boxFields.tmpTrackNumberFile[index] === 'string'
                                    ? boxFields.tmpTrackNumberFile[index]
                                    : boxFields.tmpTrackNumberFile[index]?.data_url
                                  : boxFields.trackNumberFile[index]
                              }
                              // variant="square"
                              onClick={() => {
                                setShowPhotosModal(!showPhotosModal)
                                setBigImagesOptions({
                                  ...bigImagesOptions,

                                  images: [
                                    boxFields.tmpTrackNumberFile[index]
                                      ? typeof boxFields.tmpTrackNumberFile[index] === 'string'
                                        ? boxFields.tmpTrackNumberFile[index]
                                        : boxFields.tmpTrackNumberFile[index]?.data_url
                                      : boxFields.trackNumberFile[index],
                                  ],
                                })
                              }}
                            />
                          ))}
                        </CustomSlider>
                      ) : (
                        <Typography>{`${t(TranslationKey['no photo track number'])}...`}</Typography>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            }
          />

          <Field
            containerClasses={classNames.blockOfNewBoxContainer}
            label={t(TranslationKey['Box data'])}
            inputComponent={
              <div className={classNames.blockOfNewBoxWrapper}>
                <div className={classNames.sizesTitleWrapper}>
                  <Text
                    tooltipInfoContent={t(TranslationKey['The dimensions of the box specified by the prep center'])}
                    className={classNames.standartLabel}
                  >
                    {t(TranslationKey.Dimensions)}
                  </Text>

                  <CustomSwitcher
                    condition={sizeSetting}
                    nameFirstArg={unitsOfChangeOptions.EU}
                    nameSecondArg={unitsOfChangeOptions.US}
                    firstArgValue={unitsOfChangeOptions.EU}
                    secondArgValue={unitsOfChangeOptions.US}
                    changeConditionHandler={condition => handleChange(condition)}
                  />
                </div>

                <WarehouseDemensions
                  orderBox={boxFields}
                  sizeSetting={sizeSetting}
                  volumeWeightCoefficient={volumeWeightCoefficient}
                  setFormField={setFormField}
                />

                <div className={classNames.imageFileInputWrapper}>
                  <UploadFilesInput
                    images={imagesOfBox}
                    setImages={setImagesOfBox}
                    maxNumber={boxFields.images?.length ? 50 - boxFields.images?.length : 50}
                  />
                </div>

                <div className={classNames.boxPhotoWrapper}>
                  <Typography className={classNames.standartLabel}>
                    {t(TranslationKey['Photos of the box taken at the warehouse:'])}
                  </Typography>
                  <PhotoAndFilesCarouselTest withoutFiles files={boxFields.images} />
                </div>

                <div className={classNames.commentsWrapper}>
                  <Field
                    multiline
                    disabled
                    minRows={3}
                    maxRows={3}
                    label={t(TranslationKey['Client comment'])}
                    className={classNames.commentField}
                    labelClasses={classNames.label}
                    value={boxFields.clientComment}
                  />

                  <Field
                    multiline
                    minRows={3}
                    maxRows={3}
                    label={t(TranslationKey['Storekeeper comment'])}
                    placeholder={t(TranslationKey['Add comment'])}
                    className={classNames.commentField}
                    labelClasses={classNames.label}
                    value={boxFields.storekeeperComment}
                    onChange={setFormField('storekeeperComment')}
                  />
                </div>
              </div>
            }
          />

          <Field
            multiline
            className={classNames.multiline}
            minRows={25}
            maxRows={25}
            inputProps={{ maxLength: 1000 }}
            label={t(TranslationKey['Write a comment on the task'])}
            placeholder={t(TranslationKey.Comment)}
            value={boxFields.storekeeperTaskComment}
            onChange={setFormField('storekeeperTaskComment')}
          />
        </div>

        <div className={classNames.buttonsWrapper}>
          <Button
            disabled={disableSubmit}
            tooltipInfoContent={t(TranslationKey['Save changes to the box'])}
            className={classNames.button}
            onClick={() =>
              onSubmit({
                id: formItem?._id,
                boxData: getBoxDataToSubmit(),
                sourceData: formItem,
                imagesOfBox,
                dataToSubmitHsCode: boxFields.items.map(el => ({
                  productId: el.product._id,
                  hsCode: el.product.hsCode,
                })),
              })
            }
          >
            {t(TranslationKey.Save)}
          </Button>

          <Button
            tooltipInfoContent={t(TranslationKey['Close the form without saving'])}
            className={cx(classNames.button, classNames.cancelBtn)}
            variant="text"
            onClick={onTriggerOpenModal}
          >
            {t(TranslationKey.Cancel)}
          </Button>
        </div>

        <ImageModal
          isOpenModal={showPhotosModal}
          handleOpenModal={() => setShowPhotosModal(!showPhotosModal)}
          imageList={bigImagesOptions.images}
          currentImageIndex={bigImagesOptions.imgIndex}
          handleCurrentImageIndex={imgIndex => setBigImagesOptions(() => ({ ...bigImagesOptions, imgIndex }))}
        />

        <Modal
          openModal={showSetShippingLabelModal}
          setOpenModal={() => setShowSetShippingLabelModal(!showSetShippingLabelModal)}
        >
          <SetShippingLabelModal
            tmpShippingLabel={boxFields.tmpShippingLabel}
            item={boxFields}
            onClickSaveShippingLabel={shippingLabel => {
              setShippingLabel()(shippingLabel)
              setShowSetShippingLabelModal(!showSetShippingLabelModal)
            }}
            onCloseModal={() => setShowSetShippingLabelModal(!showSetShippingLabelModal)}
          />
        </Modal>

        <Modal
          openModal={showSelectionStorekeeperAndTariffModal}
          setOpenModal={() => setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)}
        >
          <SelectStorekeeperAndTariffForm
            showCheckbox
            storekeepers={storekeepers.filter(el => el._id === formItem?.storekeeper._id)}
            curStorekeeperId={boxFields.storekeeperId}
            curTariffId={boxFields.logicsTariffId}
            currentDestinationId={boxFields?.destinationId}
            currentVariationTariffId={boxFields?.variationTariffId}
            onSubmit={onSubmitSelectStorekeeperAndTariff}
          />
        </Modal>

        <Modal openModal={showSetBarcodeModal} setOpenModal={() => setShowSetBarcodeModal(!showSetBarcodeModal)}>
          <SetBarcodeModal
            title={barcodeModalSetting.title}
            maxNumber={barcodeModalSetting.maxNumber}
            tmpCode={barcodeModalSetting.tmpCode}
            item={barcodeModalSetting.item}
            onClickSaveBarcode={barcodeModalSetting.onClickSaveBarcode}
            onCloseModal={() => setShowSetBarcodeModal(!showSetBarcodeModal)}
          />
        </Modal>
      </div>
    )
  },
)

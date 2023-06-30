/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import { Checkbox, Chip, Divider, Typography } from '@mui/material'

import React, { useState, useEffect } from 'react'

import { observer } from 'mobx-react'

import {
  getConversion,
  getWeightSizesType,
  inchesCoefficient,
  poundsWeightCoefficient,
  unitsOfChangeOptions,
} from '@constants/configs/sizes-settings'
import { zipCodeGroups } from '@constants/configs/zip-code-groups'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { UiTheme } from '@constants/theme/themes'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { BigImagesModal } from '@components/modals/big-images-modal'
import { SetBarcodeModal } from '@components/modals/set-barcode-modal'
import { SetShippingLabelModal } from '@components/modals/set-shipping-label-modal'
import { Button } from '@components/shared/buttons/button'

import { Field } from '@components/shared/field'
import { Input } from '@components/shared/input'
import { Modal } from '@components/shared/modal'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'
import { Text } from '@components/shared/text'

import { calcFinalWeightForBox, calcVolumeWeightForBox } from '@utils/calculation'
// import {checkIsImageLink} from '@utils/checks'
import { toFixed, trimBarcode } from '@utils/text'
import { t } from '@utils/translations'

import { SelectStorekeeperAndTariffForm } from '../select-storkeeper-and-tariff-form'
import { useClassNames } from './edit-box-form.style'
import { CustomSlider } from '@components/shared/custom-slider'
import { PhotoCarousel } from '@components/shared/photo-carousel'
import { CopyValue } from '@components/shared/copy-value'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { PriorityForm } from '@components/shared/priority-form/priority-form'
import { mapTaskPriorityStatusEnumToKey, TaskPriorityStatus } from '@constants/task/task-priority-status'
import { tariffTypes } from '@constants/keys/tariff-types'
import { BoxStatus } from '@constants/statuses/box-status'

const WarehouseDemensions = ({ orderBox, sizeSetting }) => {
  const { classes: classNames } = useClassNames()

  const lengthConversion = getConversion(sizeSetting, inchesCoefficient)
  const weightConversion = getConversion(sizeSetting, poundsWeightCoefficient)
  const totalWeightConversion = getConversion(sizeSetting, 12 / poundsWeightCoefficient, 12)
  const weightSizesType = getWeightSizesType(sizeSetting)

  return (
    <div className={classNames.demensionsWrapper}>
      <Typography className={classNames.standartText}>
        {t(TranslationKey.Length) + ': '}

        {toFixed(orderBox.lengthCmWarehouse / lengthConversion, 2)}
      </Typography>
      <Typography className={classNames.standartText}>
        {t(TranslationKey.Width) + ': '}
        {toFixed(orderBox.widthCmWarehouse / lengthConversion, 2)}
      </Typography>
      <Typography className={classNames.standartText}>
        {t(TranslationKey.Height) + ': '}
        {toFixed(orderBox.heightCmWarehouse / lengthConversion, 2)}
      </Typography>

      <Typography className={classNames.standartText}>
        {t(TranslationKey.Weight) + ': '}
        {toFixed(orderBox.weighGrossKgWarehouse / weightConversion, 2)}
        {' ' + weightSizesType}
      </Typography>

      <Typography className={classNames.standartText}>
        {t(TranslationKey['Volume weight']) + ': '}
        {toFixed(orderBox.volumeWeightKgWarehouse / weightConversion, 2) || 0}
        {' ' + weightSizesType}
      </Typography>

      <Typography
        className={cx(classNames.standartText, {
          [classNames.alertText]: orderBox.weightFinalAccountingKgWarehouse / weightConversion < totalWeightConversion,
        })}
      >
        {t(TranslationKey['Final weight']) + ': '}
        {toFixed(orderBox.weightFinalAccountingKgWarehouse / weightConversion, 2) || 0}
        {' ' + weightSizesType}
      </Typography>

      {orderBox.weightFinalAccountingKgWarehouse / weightConversion < totalWeightConversion ? (
        <span className={classNames.alertText}>{`${t(TranslationKey['Weight less than'])} ${toFixed(
          totalWeightConversion,
          2,
        )} ${weightSizesType}!`}</span>
      ) : null}
    </div>
  )
}

export const EditBoxForm = observer(
  ({
    showCheckbox,
    formItem,
    onSubmit,
    onTriggerOpenModal,
    requestStatus,
    volumeWeightCoefficient,
    destinations,
    storekeepers,
    destinationsFavourites,
    setDestinationsFavouritesItem,
  }) => {
    const { classes: classNames } = useClassNames()
    const [priority, setPriority] = useState()
    const [priorityReason, setPriorityReason] = useState()
    const [showSetShippingLabelModal, setShowSetShippingLabelModal] = useState(false)
    const [showPhotosModal, setShowPhotosModal] = useState(false)

    const [bigImagesOptions, setBigImagesOptions] = useState({ images: [], imgIndex: 0 })

    const rowHandlers = {
      onTriggerOpenModal: () => setShowPhotosModal(!showPhotosModal),
      onSelectPhotos: setBigImagesOptions,
    }

    const [curProductToEditBarcode, setCurProductToEditBarcode] = useState(null)

    const [showSetBarcodeModal, setShowSetBarcodeModal] = useState(false)

    const onClickBarcode = item => {
      setCurProductToEditBarcode(item)

      setShowSetBarcodeModal(!showSetBarcodeModal)
    }

    const onDoubleClickBarcode = item => {
      setCurProductToEditBarcode(item)
      setShowSetBarcodeModal(!showSetBarcodeModal)
    }

    const onClickSaveBarcode = product => newBarCodeData => {
      const newFormFields = { ...boxFields }

      newFormFields.items = [
        ...boxFields.items.map(el =>
          el.product._id === product.product._id ? { ...el, tmpBarCode: newBarCodeData } : el,
        ),
      ]

      setBoxFields(newFormFields)

      setShowSetBarcodeModal(!showSetBarcodeModal)
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
      logicsTariffId: formItem?.logicsTariff?._id || '',
      variationTariffId: formItem?.variationTariff?._id || null,

      amount: formItem?.amount,
      shippingLabel: formItem?.shippingLabel,
      clientComment: formItem?.clientComment || '',
      clientTaskComment: '',
      images: formItem?.images || [],
      fbaShipment: formItem?.fbaShipment || '',
      tmpShippingLabel: [],
      items: formItem?.items
        ? [...formItem.items.map(el => ({ ...el, changeBarCodInInventory: false, tmpBarCode: [] }))]
        : [],
    }

    const [boxFields, setBoxFields] = useState(boxInitialState)

    const [destinationId, setDestinationId] = useState(boxFields?.destinationId)

    useEffect(() => {
      setDestinationId(boxFields?.destinationId)
    }, [boxFields.destinationId])

    const setFormField = fieldName => e => {
      const newFormFields = { ...boxFields }
      newFormFields[fieldName] = e.target.value

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
        item.product._id === productId ? { ...item, barCode: '', changeBarCodInInventory: false } : item,
      )
      setBoxFields(newFormFields)
    }

    const onClickBarcodeInventoryCheckbox = (productId, value) => {
      const newFormFields = { ...boxFields }
      newFormFields.items = boxFields.items.map(item =>
        item.product._id === productId ? { ...item, changeBarCodInInventory: value } : item,
      )
      setBoxFields(newFormFields)
    }

    const [sizeSetting, setSizeSetting] = useState(unitsOfChangeOptions.EU)

    const [showSelectionStorekeeperAndTariffModal, setShowSelectionStorekeeperAndTariffModal] = useState(false)

    const onSubmitSelectStorekeeperAndTariff = (storekeeperId, tariffId, variationTariffId, destinationId) => {
      setBoxFields({ ...boxFields, storekeeperId, logicsTariffId: tariffId, variationTariffId })
      setDestinationId(destinationId)

      setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)
    }

    const disableSubmit =
      JSON.stringify(boxInitialState) === JSON.stringify(boxFields) ||
      requestStatus === loadingStatuses.isLoading ||
      boxFields.storekeeperId === '' ||
      boxFields.logicsTariffId === '' ||
      ((boxFields.shippingLabel || boxFields.tmpShippingLabel.length) &&
        !boxFields.fbaShipment &&
        !destinations.find(el => el._id === boxFields.destinationId)?.storekeeper) ||
      (Number(priority) === mapTaskPriorityStatusEnumToKey[TaskPriorityStatus.PROBLEMATIC] &&
        !priorityReason?.length) ||
      boxFields.status !== BoxStatus.IN_STOCK
    // !boxFields.destination?.storekeeperId)

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
                            <PhotoCarousel isAmazonPhoto files={item.product.images} />
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

                            {item.tmpBarCode.length ? (
                              <Field
                                oneLine
                                labelClasses={classNames.standartLabel}
                                containerClasses={classNames.checkboxContainer}
                                tooltipInfoContent={t(
                                  TranslationKey['The new barcode will be updated at the product in the inventory'],
                                )}
                                label={t(TranslationKey['Change in inventory'])}
                                inputComponent={
                                  <Checkbox
                                    color="primary"
                                    checked={item.changeBarCodInInventory}
                                    onClick={() =>
                                      onClickBarcodeInventoryCheckbox(item.product._id, !item.changeBarCodInInventory)
                                    }
                                  />
                                }
                              />
                            ) : null}

                            {!item.isBarCodeAlreadyAttachedByTheSupplier && !item.isBarCodeAttachedByTheStorekeeper ? (
                              <Typography className={classNames.noBarCodeGlued}>
                                {t(TranslationKey['Not glued!'])}
                              </Typography>
                            ) : (
                              <div>
                                {item.isBarCodeAlreadyAttachedByTheSupplier ? (
                                  <Field
                                    oneLine
                                    labelClasses={classNames.standartLabel}
                                    tooltipInfoContent={t(
                                      TranslationKey['The supplier has glued the barcode before shipment'],
                                    )}
                                    containerClasses={classNames.checkboxContainer}
                                    label={t(TranslationKey['The barcode is glued by the supplier'])}
                                    inputComponent={
                                      <Checkbox disabled checked={item.isBarCodeAlreadyAttachedByTheSupplier} />
                                    }
                                  />
                                ) : (
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
                                      <Checkbox disabled checked={item.isBarCodeAttachedByTheStorekeeper} />
                                    }
                                  />
                                )}
                              </div>
                            )}
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
                              <div className={classNames.asinTextWrapper}>
                                <Typography className={classNames.asinText}>{item.product.asin}</Typography>{' '}
                                {item.product.asin && <CopyValue text={item.product.asin} />}
                              </div>
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
                          width={220}
                          selectedItemName={
                            destinations.find(el => el._id === boxFields.destinationId)?.name ||
                            t(TranslationKey['Not chosen'])
                          }
                          data={
                            boxFields.logicsTariffId &&
                            currentLogicsTariff?.tariffType === tariffTypes.WEIGHT_BASED_LOGISTICS_TARIFF
                              ? destinations
                                  .filter(el => el.storekeeper?._id !== formItem?.storekeeper._id)
                                  .filter(el => el?._id === destinationId)
                              : destinations.filter(el => el.storekeeper?._id !== formItem?.storekeeper._id)
                          }
                          searchFields={['name']}
                          favourites={destinationsFavourites}
                          onClickSetDestinationFavourite={setDestinationsFavouritesItem}
                          onClickNotChosen={() => setBoxFields({ ...boxFields, destinationId: '' })}
                          onClickSelect={el => setBoxFields({ ...boxFields, destinationId: el._id })}
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
                      inputClasses={cx(classNames.fbaShipmentInput, {
                        [classNames.inputAccent]:
                          (boxFields.shippingLabel || boxFields.tmpShippingLabel.length) &&
                          !boxFields.fbaShipment &&
                          !destinations.find(el => el._id === boxFields.destinationId)?.storekeeper,
                      })}
                      inputProps={{ maxLength: 255 }}
                      tooltipInfoContent={t(TranslationKey['Enter or edit FBA Shipment'])}
                      label={t(TranslationKey['FBA Shipment'])}
                      value={boxFields.fbaShipment}
                      onChange={setFormField('fbaShipment')}
                    />

                    <Field
                      labelClasses={classNames.standartLabel}
                      containerClasses={classNames.field}
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
                                ? trimBarcode(boxFields.shippingLabel)
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
                      inputClasses={cx(classNames.fbaShipmentInput)}
                      inputProps={{ maxLength: 255 }}
                      label={t(TranslationKey['Reference id'])}
                      value={boxFields.referenceId}
                      onChange={setFormField('referenceId')}
                    />

                    <Field
                      labelClasses={classNames.standartLabel}
                      containerClasses={classNames.field}
                      inputClasses={cx(classNames.fbaShipmentInput)}
                      inputProps={{ maxLength: 255 }}
                      label={'FBA Number'}
                      value={boxFields.fbaNumber}
                      onChange={setFormField('fbaNumber')}
                    />
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
                    changeConditionHandler={condition => setSizeSetting(condition)}
                  />
                </div>

                <WarehouseDemensions orderBox={boxFields} sizeSetting={sizeSetting} />

                <div className={classNames.boxPhotoWrapper}>
                  <Typography className={classNames.standartLabel}>
                    {t(TranslationKey['Photos of the box taken at the warehouse:'])}
                  </Typography>
                  <PhotoCarousel files={boxFields.images} imageClass={classNames.boxImageClass} />
                </div>

                <div className={classNames.commentsWrapper}>
                  <Field
                    multiline
                    minRows={3}
                    maxRows={3}
                    label={t(TranslationKey['Client comment'])}
                    placeholder={t(TranslationKey['Add comment'])}
                    className={classNames.commentField}
                    labelClasses={classNames.label}
                    value={boxFields.clientComment}
                    onChange={setFormField('clientComment')}
                  />

                  <Field
                    multiline
                    disabled
                    minRows={3}
                    maxRows={3}
                    label={t(TranslationKey['Storekeeper comment'])}
                    className={classNames.commentField}
                    labelClasses={classNames.label}
                    value={boxFields.storekeeperComment}
                  />
                </div>
              </div>
            }
          />

          <div>
            <PriorityForm
              setCurrentPriority={setPriority}
              setComment={setPriorityReason}
              currentPriority={priority}
              comment={priorityReason}
            />

            <Field
              multiline
              className={classNames.heightFieldAuto}
              minRows={3}
              maxRows={3}
              inputProps={{ maxLength: 1000 }}
              labelClasses={classNames.commentLabel}
              tooltipAttentionContent={t(TranslationKey['A task will be created for the prep center'])}
              label={t(TranslationKey['Write a comment on the task'])}
              placeholder={t(TranslationKey['Client comment on the task'])}
              onChange={setFormField('clientTaskComment')}
            />
          </div>
        </div>

        <div className={classNames.buttonsWrapper}>
          <Button
            disabled={disableSubmit}
            tooltipInfoContent={t(TranslationKey['Save changes to the box'])}
            className={classNames.button}
            onClick={() => {
              onSubmit(
                formItem?._id,
                {
                  ...boxFields,
                  destinationId: boxFields.destinationId || null,
                },
                formItem,
                priority,
                priorityReason,
              )
            }}
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

        <BigImagesModal
          openModal={showPhotosModal}
          setOpenModal={() => setShowPhotosModal(!showPhotosModal)}
          images={bigImagesOptions.images}
          imgIndex={bigImagesOptions.imgIndex}
          setImageIndex={imgIndex => setBigImagesOptions(() => ({ ...bigImagesOptions, imgIndex }))}
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
            showCheckbox={showCheckbox}
            storekeepers={storekeepers.filter(el => el._id === formItem?.storekeeper._id)}
            curStorekeeperId={boxFields.storekeeperId}
            curTariffId={boxFields.logicsTariffId}
            destinationsData={destinations}
            currentDestinationId={boxFields?.destinationId}
            currentVariationTariffId={boxFields?.variationTariffId}
            onSubmit={onSubmitSelectStorekeeperAndTariff}
          />
        </Modal>

        <Modal openModal={showSetBarcodeModal} setOpenModal={() => setShowSetBarcodeModal(!showSetBarcodeModal)}>
          <SetBarcodeModal
            tmpCode={curProductToEditBarcode?.tmpBarCode}
            item={curProductToEditBarcode}
            onClickSaveBarcode={data => onClickSaveBarcode(curProductToEditBarcode)(data)}
            onCloseModal={() => setShowSetBarcodeModal(!showSetBarcodeModal)}
          />
        </Modal>
      </div>
    )
  },
)

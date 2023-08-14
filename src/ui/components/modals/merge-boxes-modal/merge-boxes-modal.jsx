import { cx } from '@emotion/css'
import React, { useEffect, useState } from 'react'

import { Chip, Typography } from '@mui/material'

import { inchesCoefficient, poundsWeightCoefficient, unitsOfChangeOptions } from '@constants/configs/sizes-settings'
import { zipCodeGroups } from '@constants/configs/zip-code-groups'
import { tariffTypes } from '@constants/keys/tariff-types'
import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { BoxStatus } from '@constants/statuses/box-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TaskPriorityStatus, mapTaskPriorityStatusEnumToKey } from '@constants/task/task-priority-status'
import { UiTheme } from '@constants/theme/themes'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { WarehouseDemensions } from '@components/forms/edit-box-storekeeper-form/edit-box-storekeeper-form'
import { SelectStorekeeperAndTariffForm } from '@components/forms/select-storkeeper-and-tariff-form'
import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Field } from '@components/shared/field/field'
import { Modal } from '@components/shared/modal'
import { PriorityForm } from '@components/shared/priority-form/priority-form'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'
import { Text } from '@components/shared/text'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot, checkIsStorekeeper } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './merge-boxes-modal.style'

import { SetShippingLabelModal } from '../set-shipping-label-modal'

import { BoxForMerge } from './box-for-merge'

export const MergeBoxesModal = ({
  showCheckbox,
  userInfo,
  destinations,
  storekeepers,
  selectedBoxes,
  requestStatus,
  setOpenModal,
  onSubmit,
  onRemoveBoxFromSelected,
  destinationsFavourites,
  setDestinationsFavouritesItem,
  volumeWeightCoefficient,
}) => {
  const { classes: classNames } = useClassNames()

  // Добавил
  const isStorekeeper = checkIsStorekeeper(UserRoleCodeMap[userInfo?.role])

  const [priority, setPriority] = useState()
  const [priorityReason, setPriorityReason] = useState()

  const hasDifferentDestinations = selectedBoxes.some(
    box => box?.destination?._id !== selectedBoxes[0]?.destination?._id,
  )

  const [boxBody, setBoxBody] = useState({
    shippingLabel: null,
    destinationId: hasDifferentDestinations ? null : selectedBoxes[0]?.destination?._id,

    storekeeperId: selectedBoxes.some(box => box.storekeeper?._id !== selectedBoxes[0]?.storekeeper?._id)
      ? ''
      : selectedBoxes[0].storekeeper?._id,
    logicsTariffId: selectedBoxes.some(box => box.logicsTariff?._id !== selectedBoxes[0]?.logicsTariff?._id)
      ? ''
      : selectedBoxes[0].logicsTariff?._id,
    variationTariffId: selectedBoxes.some(box => box.variationTariff?._id !== selectedBoxes[0]?.variationTariff?._id)
      ? null
      : selectedBoxes[0].variationTariff?._id,

    fbaShipment: '',

    tmpShippingLabel: [],

    // Добавил возможность передавать размеры и файлы
    lengthCmWarehouse: 0,
    widthCmWarehouse: 0,
    heightCmWarehouse: 0,
    weighGrossKgWarehouse: 0,
    images: [],
  })

  const [destinationId, setDestinationId] = useState(boxBody?.destinationId)

  useEffect(() => {
    setDestinationId(boxBody?.destinationId)
  }, [boxBody?.destinationId])

  const setFormField = fieldName => e => {
    const newFormFields = { ...boxBody }
    const currentValue = e.target.value

    if (['weighGrossKgWarehouse', 'widthCmWarehouse', 'heightCmWarehouse', 'lengthCmWarehouse'].includes(fieldName)) {
      if (!checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(currentValue)) {
        return
      }
    }

    newFormFields[fieldName] = currentValue

    setBoxBody(newFormFields)
  }

  const [imagesOfBox, setImagesOfBox] = useState([])

  const [comment, setComment] = useState('')
  const getBoxDataToSubmit = () => {
    if (sizeSetting === unitsOfChangeOptions.US) {
      return {
        ...boxBody,
        destinationId: boxBody.destinationId || null,
        lengthCmWarehouse: toFixed(boxBody.lengthCmWarehouse * inchesCoefficient, 2),
        widthCmWarehouse: toFixed(boxBody.widthCmWarehouse * inchesCoefficient, 2),
        heightCmWarehouse: toFixed(boxBody.heightCmWarehouse * inchesCoefficient, 2),
        weighGrossKgWarehouse: toFixed(boxBody.weighGrossKgWarehouse * poundsWeightCoefficient, 2),
      }
    } else {
      return { ...boxBody, destinationId: boxBody.destinationId || null }
    }
  }

  const onCloseBoxesModal = () => {
    setOpenModal()
  }

  const [showSetShippingLabelModal, setShowSetShippingLabelModal] = useState(false)

  const setShippingLabel = () => value => {
    const newFormFields = { ...boxBody }
    newFormFields.tmpShippingLabel = value

    setBoxBody(newFormFields)
  }

  const onClickShippingLabel = () => {
    setShowSetShippingLabelModal(!showSetShippingLabelModal)
  }

  const onDeleteShippingLabel = () => {
    const newFormFields = { ...boxBody }
    newFormFields.shippingLabel = ''
    setBoxBody(newFormFields)
  }

  const [showSelectionStorekeeperAndTariffModal, setShowSelectionStorekeeperAndTariffModal] = useState(false)

  const onSubmitSelectStorekeeperAndTariff = (storekeeperId, tariffId, variationTariffId, destinationId) => {
    setBoxBody({ ...boxBody, storekeeperId, logicsTariffId: tariffId, variationTariffId })
    setDestinationId(destinationId)

    setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)
  }

  const isDifferentStorekeepers = selectedBoxes.some(el => el.storekeeper._id !== selectedBoxes[0]?.storekeeper._id)

  const disabledSubmit =
    requestStatus === loadingStatuses.isLoading ||
    boxBody.logicsTariffId === '' ||
    selectedBoxes.length < 2 ||
    (boxBody.shippingLabel?.length < 5 && boxBody.shippingLabel?.length > 0) ||
    isDifferentStorekeepers ||
    ((boxBody.shippingLabel || boxBody.tmpShippingLabel?.length) &&
      !boxBody.fbaShipment &&
      !destinations.find(el => el._id === boxBody.destinationId)?.storekeeper) ||
    (Number(priority) === mapTaskPriorityStatusEnumToKey[TaskPriorityStatus.PROBLEMATIC] && !priorityReason?.length) ||
    selectedBoxes.some(box => box?.status !== BoxStatus.IN_STOCK)

  const disabledSubmitStorekeeper =
    disabledSubmit ||
    !boxBody.lengthCmWarehouse ||
    !boxBody.lengthCmWarehouse ||
    !boxBody.widthCmWarehouse ||
    !boxBody.heightCmWarehouse ||
    !boxBody.weighGrossKgWarehouse

  const curDestination = destinations.find(el => el._id === boxBody.destinationId)

  const firstNumOfCode = curDestination?.zipCode[0]

  const regionOfDeliveryName = zipCodeGroups.find(el => el.codes.includes(Number(firstNumOfCode)))?.name

  const currentStorekeeper = storekeepers.find(el => el._id === boxBody.storekeeperId)
  const currentLogicsTariff = currentStorekeeper?.tariffLogistics.find(el => el._id === boxBody.logicsTariffId)

  const tariffName = currentLogicsTariff?.name

  const tariffRate =
    currentLogicsTariff?.conditionsByRegion[regionOfDeliveryName]?.rate ||
    currentLogicsTariff?.destinationVariations?.find(el => el._id === boxBody?.variationTariffId)?.pricePerKgUsd

  const boxData = selectedBoxes.map(box => box.items)

  const finalBoxData = Object.values(
    boxData.flat().reduce((acc, item) => {
      if (!acc[item.product.asin] && acc[item.product.asin]?.order?._id !== item.order._id) {
        acc[item.product.asin] = { ...item }
      } else if (
        acc[item.product.asin] &&
        !acc[item.product.asin + 'mark'] &&
        acc[item.product.asin]?.order?._id !== item.order._id
      ) {
        acc[item.product.asin + 'mark'] = { ...item }
      } else if (acc[item.product.asin + 'mark'] && acc[item.product.asin + 'mark']?.order?._id === item.order._id) {
        acc[item.product.asin + 'mark'].amount = acc[item.product.asin + 'mark'].amount + item.amount
      } else {
        acc[item.product.asin].amount = acc[item.product.asin].amount + item.amount
      }
      return acc
    }, {}),
  )

  // Добавил
  const [sizeSetting, setSizeSetting] = useState(unitsOfChangeOptions.EU)

  const handleChange = condition => {
    setSizeSetting(condition)

    if (condition === unitsOfChangeOptions.US) {
      setBoxBody({
        ...boxBody,
        lengthCmWarehouse: toFixed(boxBody.lengthCmWarehouse / inchesCoefficient, 2),
        widthCmWarehouse: toFixed(boxBody.widthCmWarehouse / inchesCoefficient, 2),
        heightCmWarehouse: toFixed(boxBody.heightCmWarehouse / inchesCoefficient, 2),
        weighGrossKgWarehouse: toFixed(boxBody.weighGrossKgWarehouse / poundsWeightCoefficient, 2),
      })
    } else {
      setBoxBody({
        ...boxBody,
        lengthCmWarehouse: toFixed(boxBody.lengthCmWarehouse * inchesCoefficient, 2),
        widthCmWarehouse: toFixed(boxBody.widthCmWarehouse * inchesCoefficient, 2),
        heightCmWarehouse: toFixed(boxBody.heightCmWarehouse * inchesCoefficient, 2),
        weighGrossKgWarehouse: toFixed(boxBody.weighGrossKgWarehouse * poundsWeightCoefficient, 2),
      })
    }
  }

  return (
    <div>
      <div className={classNames.modalTitleWrapper}>
        <Typography className={classNames.modalTitle}>{t(TranslationKey['Merging boxes'])}</Typography>
        <img src="/assets/img/merge.png" />
      </div>
      <div className={classNames.mainWrapper}>
        <div>
          <Typography className={classNames.boxTitle}>{t(TranslationKey['Source boxes'])}</Typography>
          <div className={classNames.marginBox}>
            {selectedBoxes.map((box, boxIndex) => (
              <BoxForMerge
                key={boxIndex}
                index={boxIndex}
                box={box}
                destinations={destinations}
                // showFullCard={showFullCard}
                // setShowFullCard={setShowFullCard}
                onRemoveBox={onRemoveBoxFromSelected}
              />
            ))}
          </div>
        </div>

        <div>
          <Typography className={classNames.boxTitle}>{t(TranslationKey['Final box data'])}</Typography>
          {/* <Typography>{t(TranslationKey['Please note the change in stock and method of delivery!!!'])}</Typography> */}
          <div className={classNames.finalBoxWrapper}>
            {finalBoxData &&
              finalBoxData.map((order, orderIndex) => (
                <div key={orderIndex} className={classNames.order}>
                  <img className={classNames.img} src={getAmazonImageUrl(order.product?.images[0])} />
                  <div>
                    <div className={classNames.asinWrapper}>
                      <Typography className={classNames.asinTitle}>{t(TranslationKey.ASIN)}</Typography>
                      <div className={classNames.asinTextWrapper}>
                        <Typography className={classNames.asinValue}>{order.product?.asin}</Typography>
                        {order.product?.asin && <CopyValue text={order.product?.asin} />}
                      </div>
                    </div>
                    <div className={classNames.asinWrapper}>
                      <Typography className={classNames.asinTitle}>{t(TranslationKey.Order)}</Typography>
                      <Typography className={classNames.asinValue}>{order.order.id}</Typography>
                    </div>

                    <Typography className={classNames.title}>{order.product?.amazonTitle}</Typography>
                  </div>

                  <div>
                    <Field
                      disabled
                      label={t(TranslationKey.Quantity)}
                      className={classNames.orderInput}
                      labelClasses={classNames.label}
                      value={order?.amount}
                      tooltipInfoContent={t(TranslationKey['Number of product units in the box'])}
                    />
                  </div>
                </div>
              ))}

            <div className={classNames.itemSubWrapper}>
              <Field
                containerClasses={classNames.field}
                tooltipInfoContent={t(TranslationKey["Amazon's final warehouse in the USA, available for change"])}
                label={t(TranslationKey.Destination)}
                labelClasses={classNames.label}
                inputComponent={
                  <WithSearchSelect
                    width={220}
                    selectedItemName={
                      destinations?.find(el => el._id === boxBody.destinationId)?.name ||
                      t(TranslationKey['Not chosen'])
                    }
                    data={
                      boxBody.logicsTariffId &&
                      currentLogicsTariff?.tariffType === tariffTypes.WEIGHT_BASED_LOGISTICS_TARIFF
                        ? destinations.filter(
                            el => el?._id === (destinationId || selectedBoxes[0]?.variationTariff?.destinationId),
                          )
                        : destinations?.filter(el => el.storekeeper?._id !== selectedBoxes[0]?.storekeeper?._id)
                    }
                    searchFields={['name']}
                    favourites={destinationsFavourites}
                    onClickSetDestinationFavourite={setDestinationsFavouritesItem}
                    onClickNotChosen={() => setBoxBody({ ...boxBody, destinationId: '' })}
                    onClickSelect={el => setBoxBody({ ...boxBody, destinationId: el._id })}
                  />
                }
              />
              <Field
                containerClasses={classNames.field}
                tooltipInfoContent={t(TranslationKey['Prep Center in China, available for change'])}
                label={`${t(TranslationKey['Int warehouse'])} / ` + t(TranslationKey.Tariff)}
                labelClasses={classNames.label}
                inputComponent={
                  <Button
                    disabled={isDifferentStorekeepers}
                    variant={boxBody.logicsTariffId && 'text'}
                    className={cx(classNames.storekeeperBtnDefault, {
                      [classNames.storekeeperBtn]: !boxBody.logicsTariffId,
                      [classNames.storekeeperBtnDark]: SettingsModel.uiTheme === UiTheme.dark,
                    })}
                    onClick={() => setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)}
                  >
                    {boxBody.logicsTariffId
                      ? `${tariffName}${tariffRate ? ' / ' + tariffRate + ' $' : ''}`
                      : t(TranslationKey.Select)}
                  </Button>
                }
              />
              <Field
                tooltipInfoContent={t(TranslationKey['Enter or edit FBA Shipment'])}
                containerClasses={classNames.field}
                inputClasses={cx(classNames.fieldInput, {
                  [classNames.inputAccent]:
                    (boxBody.shippingLabel || boxBody.tmpShippingLabel?.length) &&
                    !boxBody.fbaShipment &&
                    !destinations.find(el => el._id === boxBody.destinationId)?.storekeeper,
                })}
                labelClasses={classNames.label}
                inputProps={{ maxLength: 255 }}
                label={t(TranslationKey['FBA Shipment'])}
                value={boxBody.fbaShipment}
                onChange={e => setBoxBody({ ...boxBody, fbaShipment: e.target.value })}
              />
              <Field
                label={t(TranslationKey['Shipping label']) + ':'}
                tooltipInfoContent={t(TranslationKey['Add or replace the shipping label'])}
                labelClasses={classNames.label}
                inputComponent={
                  <Chip
                    classes={{
                      root: classNames.barcodeChip,
                      clickable: classNames.barcodeChipHover,
                      deletable: classNames.barcodeChipHover,
                      deleteIcon: classNames.barcodeChipIcon,
                      label: classNames.barcodeChiplabel,
                    }}
                    className={cx({ [classNames.barcodeChipExists]: boxBody.shippingLabel })}
                    size="small"
                    label={
                      boxBody.tmpShippingLabel?.length
                        ? t(TranslationKey['File added'])
                        : boxBody.shippingLabel
                        ? boxBody.shippingLabel
                        : t(TranslationKey['Set Shipping Label'])
                    }
                    onClick={() => onClickShippingLabel()}
                    onDelete={!boxBody.shippingLabel ? undefined : () => onDeleteShippingLabel()}
                  />
                }
              />
            </div>

            {/* Рендерится если это сторкипер */}
            {isStorekeeper && (
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

                      <div className={classNames.customSwitcherWrapper}>
                        <CustomSwitcher
                          condition={sizeSetting}
                          nameFirstArg={unitsOfChangeOptions.EU}
                          nameSecondArg={unitsOfChangeOptions.US}
                          firstArgValue={unitsOfChangeOptions.EU}
                          secondArgValue={unitsOfChangeOptions.US}
                          changeConditionHandler={condition => handleChange(condition)}
                        />
                      </div>
                    </div>

                    <WarehouseDemensions
                      orderBox={boxBody}
                      sizeSetting={sizeSetting}
                      volumeWeightCoefficient={volumeWeightCoefficient}
                      setFormField={setFormField}
                    />

                    <div className={classNames.imageFileInputWrapper}>
                      <UploadFilesInput images={imagesOfBox} setImages={setImagesOfBox} maxNumber={50} />
                    </div>

                    {/* <div className={classNames.boxPhotoWrapperS}>
                      <div className={classNames.boxPhotoWrapper}>
                        <Typography className={classNames.standartLabel}>
                          {t(TranslationKey['Photos of the box taken at the warehouse:'])}
                        </Typography>
                        <PhotoCarousel files={boxBody.images} imageClass={classNames.boxImageClass} />
                      </div>
                    </div> */}
                  </div>
                }
              />
            )}
          </div>
        </div>

        {/* Рендерится не у сторкипера  */}
        {!isStorekeeper && (
          <div>
            <PriorityForm
              setCurrentPriority={setPriority}
              setComment={setPriorityReason}
              currentPriority={priority}
              comment={priorityReason}
            />
            <Field
              multiline
              labelClasses={classNames.commentLabel}
              className={classNames.heightFieldAuto}
              minRows={3}
              maxRows={3}
              inputProps={{ maxLength: 2000 }}
              label={t(TranslationKey['Client comment on the task'])}
              placeholder={t(TranslationKey['Client comment on the task'])}
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
          </div>
        )}
      </div>
      <div className={cx(classNames.modalFooter, { [classNames.modalAlternateFooter]: !isDifferentStorekeepers })}>
        {isDifferentStorekeepers && (
          <Typography className={classNames.attentionDifStorekeepers}>
            {t(TranslationKey['Intermediate warehouses must match!'])}
          </Typography>
        )}
        <div className={classNames.buttonsWrapper}>
          <Button
            tooltipInfoContent={t(TranslationKey['Create a task to merge boxes'])}
            // Проверка для дизейбла
            disabled={isStorekeeper ? disabledSubmitStorekeeper : disabledSubmit}
            className={classNames.button}
            onClick={() => onSubmit(getBoxDataToSubmit(), comment, priority, priorityReason)}
          >
            {t(TranslationKey.Merge)}
          </Button>
          <Button
            tooltipInfoContent={t(TranslationKey['Close the form without saving'])}
            disabled={requestStatus === loadingStatuses.isLoading}
            variant="text"
            className={cx(classNames.button, classNames.cancelButton)}
            onClick={onCloseBoxesModal}
          >
            {t(TranslationKey.Cancel)}
          </Button>
        </div>
      </div>

      <Modal
        openModal={showSetShippingLabelModal}
        setOpenModal={() => setShowSetShippingLabelModal(!showSetShippingLabelModal)}
      >
        <SetShippingLabelModal
          tmpShippingLabel={boxBody.tmpShippingLabel}
          item={boxBody}
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
          destinationsData={destinations}
          storekeepers={storekeepers?.filter(el => el._id === selectedBoxes[0]?.storekeeper._id)}
          curStorekeeperId={boxBody?.storekeeperId}
          curTariffId={boxBody?.logicsTariffId}
          currentDestinationId={boxBody?.destinationId}
          currentVariationTariffId={boxBody?.variationTariffId}
          onSubmit={onSubmitSelectStorekeeperAndTariff}
        />
      </Modal>
    </div>
  )
}

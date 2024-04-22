import { useState } from 'react'

import { Typography } from '@mui/material'

import { inchesCoefficient, poundsWeightCoefficient, unitsOfChangeOptions } from '@constants/configs/sizes-settings'
import { tariffTypes } from '@constants/keys/tariff-types'
import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { BoxStatus } from '@constants/statuses/box-status'
import { TaskPriorityStatus, mapTaskPriorityStatusEnumToKey } from '@constants/task/task-priority-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { ChangeChipCell } from '@components/data-grid/data-grid-cells'
import { BoxMerge } from '@components/shared/boxes/box-merge'
import { Button } from '@components/shared/button'
import { CopyValue } from '@components/shared/copy-value'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Field } from '@components/shared/field/field'
import { Modal } from '@components/shared/modal'
import { PriorityForm } from '@components/shared/priority-form/priority-form'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'
import { Text } from '@components/shared/text'
import { UploadFilesInput } from '@components/shared/upload-files-input'
import { WarehouseDemensions } from '@components/shared/warehouse-demensions'

import { checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot, checkIsStorekeeper } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getShortenStringIfLongerThanCount, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/enums/button-style'
import { loadingStatus } from '@typings/enums/loading-status'
import { UiTheme } from '@typings/enums/ui-theme'

import { useGetDestinationTariffInfo } from '@hooks/use-get-destination-tariff-info'
import { useTariffVariation } from '@hooks/use-tariff-variation'

import { useStyles } from './merge-boxes-modal.style'

import { ConfirmationModal } from '../confirmation-modal'
import { SetShippingLabelModal } from '../set-shipping-label-modal'
import { SupplierApproximateCalculationsModal } from '../supplier-approximate-calculations'

import { BoxForMerge } from './box-for-merge'

export const MergeBoxesModal = ({
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
  const { classes: styles, cx } = useStyles()

  const isStorekeeper = checkIsStorekeeper(UserRoleCodeMap[userInfo?.role])

  const [priority, setPriority] = useState()
  const [priorityReason, setPriorityReason] = useState()

  const selectedDestination = selectedBoxes.some(box => box?.destination?._id !== selectedBoxes[0]?.destination?._id)
    ? null
    : selectedBoxes[0]?.destination
  const selectedStorekeepers = selectedBoxes.some(box => box?.storekeeper?._id !== selectedBoxes[0]?.storekeeper?._id)
    ? null
    : selectedBoxes[0]?.storekeeper
  const selectedLogicsTariffs = selectedBoxes.some(
    box => box?.logicsTariff?._id !== selectedBoxes[0]?.logicsTariff?._id,
  )
    ? null
    : selectedBoxes[0]?.logicsTariff
  const selectedVariationTariffs = selectedBoxes.some(
    box => box?.variationTariff?._id !== selectedBoxes[0]?.variationTariff?._id,
  )

  const [boxBody, setBoxBody] = useState({
    shippingLabel: null,

    storekeeper: selectedStorekeepers,
    destination: selectedDestination,
    logicsTariff: selectedLogicsTariffs,
    variationTariff: selectedVariationTariffs,

    destinationId: selectedDestination?._id,
    storekeeperId: selectedStorekeepers?._id,
    logicsTariffId: selectedLogicsTariffs?._id,
    variationTariffId: selectedVariationTariffs?._id,

    fbaShipment: '',

    tmpShippingLabel: [],
    lengthCmWarehouse: 0,
    widthCmWarehouse: 0,
    heightCmWarehouse: 0,
    weighGrossKgWarehouse: 0,
    images: [],

    items: selectedBoxes.map(box => box.items)?.flat(),
  })

  const {
    destinationId,

    onSubmitSelectStorekeeperAndTariff,

    showConfirmModal,
    setShowConfirmModal,

    confirmModalSettings,

    handleSetDestination,
    handleResetDestination,

    showSelectionStorekeeperAndTariffModal,
    setShowSelectionStorekeeperAndTariffModal,
  } = useTariffVariation(boxBody.destinationId, setBoxBody)

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
        images: imagesOfBox,
      }
    } else {
      return { ...boxBody, destinationId: boxBody.destinationId || null, images: imagesOfBox }
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

  const isDifferentStorekeepers = selectedBoxes.some(el => el.storekeeper._id !== selectedBoxes[0]?.storekeeper._id)

  const disabledSubmit =
    requestStatus === loadingStatus.IS_LOADING ||
    boxBody.logicsTariffId === '' ||
    selectedBoxes.length < 2 ||
    (boxBody.shippingLabel?.length < 5 && boxBody.shippingLabel?.length > 0) ||
    isDifferentStorekeepers ||
    ((boxBody.shippingLabel || boxBody.tmpShippingLabel?.length) &&
      !boxBody.fbaShipment &&
      !destinations.find(el => el._id === boxBody.destinationId)?.storekeeper) ||
    (Number(priority) === mapTaskPriorityStatusEnumToKey[TaskPriorityStatus.PROBLEMATIC] && !priorityReason?.length) ||
    selectedBoxes.some(box => box?.status !== BoxStatus.IN_STOCK) ||
    !boxBody.logicsTariffId

  const disabledSubmitStorekeeper =
    disabledSubmit ||
    !boxBody.lengthCmWarehouse ||
    !boxBody.lengthCmWarehouse ||
    !boxBody.widthCmWarehouse ||
    !boxBody.heightCmWarehouse ||
    !boxBody.weighGrossKgWarehouse ||
    !boxBody.logicsTariffId

  const { tariffName, tariffRate, currentTariff } = useGetDestinationTariffInfo(
    destinations,
    storekeepers,
    boxBody.destinationId,
    boxBody.storekeeperId,
    boxBody.logicsTariffId,
    boxBody.variationTariffId,
  )

  const finalBoxData = Object.values(
    boxBody?.items.reduce((acc, item) => {
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

  const [sizeSetting, setSizeSetting] = useState(unitsOfChangeOptions.EU)

  const handleChange = newAlignment => {
    if (newAlignment !== sizeSetting) {
      const multiplier = newAlignment === unitsOfChangeOptions.US ? inchesCoefficient : 1 / inchesCoefficient

      setBoxBody({
        ...boxBody,
        lengthCmWarehouse: toFixed(boxBody.lengthCmWarehouse / multiplier, 2),
        widthCmWarehouse: toFixed(boxBody.widthCmWarehouse / multiplier, 2),
        heightCmWarehouse: toFixed(boxBody.heightCmWarehouse / multiplier, 2),
        weighGrossKgWarehouse: toFixed(boxBody.weighGrossKgWarehouse / multiplier, 2),
      })

      setSizeSetting(newAlignment)
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.modalTitleWrapper}>
        <Typography className={styles.modalTitle}>{t(TranslationKey['Merging boxes'])}</Typography>
        <BoxMerge />
      </div>
      <div className={styles.mainWrapper}>
        <div>
          <Typography className={styles.boxTitle}>{t(TranslationKey['Source boxes'])}</Typography>
          <div className={styles.marginBox}>
            {selectedBoxes.map((box, boxIndex) => (
              <BoxForMerge
                key={boxIndex}
                index={boxIndex}
                box={box}
                destinations={destinations}
                onRemoveBox={onRemoveBoxFromSelected}
              />
            ))}
          </div>
        </div>

        <div>
          <Typography className={styles.boxTitle}>{t(TranslationKey['Final box data'])}</Typography>

          <div className={styles.finalBoxWrapper}>
            {finalBoxData &&
              finalBoxData.map((order, orderIndex) => (
                <div key={orderIndex} className={styles.order}>
                  <img className={styles.img} src={getAmazonImageUrl(order.product?.images[0])} />
                  <div>
                    <div className={styles.asinWrapper}>
                      <Typography className={styles.asinTitle}>{t(TranslationKey.ASIN)}</Typography>
                      <div className={styles.asinTextWrapper}>
                        <Typography className={styles.asinValue}>{order.product?.asin}</Typography>
                        {order.product?.asin && <CopyValue text={order.product?.asin} />}
                      </div>
                    </div>
                    <div className={styles.asinWrapper}>
                      <Typography className={styles.asinTitle}>{t(TranslationKey.Order)}</Typography>
                      <Typography className={styles.asinValue}>{order.order.id}</Typography>
                    </div>

                    <Typography className={styles.title}>
                      {getShortenStringIfLongerThanCount(order.product?.amazonTitle, 85)}
                    </Typography>
                  </div>

                  <div>
                    <Field
                      disabled
                      label={t(TranslationKey.Quantity)}
                      className={styles.orderInput}
                      labelClasses={styles.label}
                      value={order?.amount}
                      tooltipInfoContent={t(TranslationKey['Number of product units in the box'])}
                    />
                  </div>
                </div>
              ))}

            <div className={styles.itemSubWrapper}>
              <Field
                containerClasses={styles.field}
                tooltipInfoContent={t(TranslationKey["Amazon's final warehouse in the USA, available for change"])}
                label={t(TranslationKey.Destination)}
                labelClasses={styles.label}
                inputComponent={
                  <WithSearchSelect
                    width={220}
                    selectedItemName={
                      destinations?.find(el => el._id === boxBody.destinationId)?.name ||
                      t(TranslationKey['Not chosen'])
                    }
                    data={
                      boxBody.logicsTariffId && currentTariff?.tariffType === tariffTypes.WEIGHT_BASED_LOGISTICS_TARIFF
                        ? destinations.filter(
                            el => el?._id === (destinationId || selectedBoxes[0]?.variationTariff?.destinationId),
                          )
                        : destinations?.filter(el => el.storekeeper?._id !== selectedBoxes[0]?.storekeeper?._id)
                    }
                    searchFields={['name']}
                    favourites={destinationsFavourites}
                    onClickSetDestinationFavourite={setDestinationsFavouritesItem}
                    onClickNotChosen={handleResetDestination}
                    onClickSelect={handleSetDestination}
                  />
                }
              />
              <Field
                containerClasses={styles.field}
                tooltipInfoContent={t(TranslationKey['Prep Center in China, available for change'])}
                label={`${t(TranslationKey['Int warehouse'])} / ` + t(TranslationKey.Tariff)}
                labelClasses={styles.label}
                inputComponent={
                  <Button
                    disabled={isDifferentStorekeepers}
                    className={cx(styles.storekeeperBtnDefault, {
                      [styles.storekeeperBtn]: !boxBody.logicsTariffId,
                      [styles.storekeeperBtnDark]: SettingsModel.uiTheme === UiTheme.dark,
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
                containerClasses={styles.field}
                inputClasses={cx(styles.fieldInput, {
                  [styles.inputAccent]:
                    (boxBody.shippingLabel || boxBody.tmpShippingLabel?.length) &&
                    !boxBody.fbaShipment &&
                    !destinations.find(el => el._id === boxBody.destinationId)?.storekeeper,
                })}
                labelClasses={styles.label}
                inputProps={{ maxLength: 255 }}
                label={t(TranslationKey['FBA Shipment'])}
                value={boxBody.fbaShipment}
                onChange={e => setBoxBody({ ...boxBody, fbaShipment: e.target.value })}
              />
              <Field
                label={t(TranslationKey['Shipping label']) + ':'}
                tooltipInfoContent={t(TranslationKey['Add or replace the shipping label'])}
                labelClasses={styles.label}
                inputComponent={
                  <ChangeChipCell
                    isChipOutTable
                    text={!boxBody.tmpShippingLabel?.length ? t(TranslationKey['Set Shipping Label']) : ''}
                    value={boxBody?.tmpShippingLabel?.[0]?.file?.name || boxBody?.tmpShippingLabel?.[0]}
                    onClickChip={onClickShippingLabel}
                    onDeleteChip={!boxBody.shippingLabel ? undefined : () => onDeleteShippingLabel()}
                  />
                }
              />
            </div>

            {isStorekeeper && (
              <Field
                containerClasses={styles.blockOfNewBoxContainer}
                label={t(TranslationKey['Box data'])}
                inputComponent={
                  <div className={styles.blockOfNewBoxWrapper}>
                    <div className={styles.sizesTitleWrapper}>
                      <Text
                        tooltipInfoContent={t(TranslationKey['The dimensions of the box specified by the prep center'])}
                        className={styles.standartLabel}
                      >
                        {t(TranslationKey.Dimensions)}
                      </Text>

                      <div className={styles.customSwitcherWrapper}>
                        <CustomSwitcher
                          condition={sizeSetting}
                          switcherSettings={[
                            { label: () => unitsOfChangeOptions.EU, value: unitsOfChangeOptions.EU },
                            { label: () => unitsOfChangeOptions.US, value: unitsOfChangeOptions.US },
                          ]}
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

                    <UploadFilesInput images={imagesOfBox} setImages={setImagesOfBox} />
                  </div>
                }
              />
            )}
          </div>
        </div>

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
              labelClasses={styles.commentLabel}
              className={styles.heightFieldAuto}
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
      <div className={cx(styles.modalFooter, { [styles.modalAlternateFooter]: !isDifferentStorekeepers })}>
        {isDifferentStorekeepers ? (
          <Typography className={styles.attentionDifStorekeepers}>
            {t(TranslationKey['Intermediate warehouses must match!'])}
          </Typography>
        ) : (
          <div />
        )}
        <div className={styles.buttonsWrapper}>
          <Button
            tooltipInfoContent={t(TranslationKey['Create a task to merge boxes'])}
            disabled={isStorekeeper ? disabledSubmitStorekeeper : disabledSubmit}
            className={styles.button}
            onClick={() => onSubmit(getBoxDataToSubmit(), comment, priority, priorityReason)}
          >
            {t(TranslationKey.Merge)}
          </Button>
          <Button
            tooltipInfoContent={t(TranslationKey['Close the form without saving'])}
            disabled={requestStatus === loadingStatus.IS_LOADING}
            variant={ButtonVariant.OUTLINED}
            className={cx(styles.button, styles.cancelButton)}
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

      {showSelectionStorekeeperAndTariffModal ? (
        <SupplierApproximateCalculationsModal
          isTariffsSelect
          openModal={showSelectionStorekeeperAndTariffModal}
          setOpenModal={() => setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)}
          box={boxBody}
          onClickSubmit={onSubmitSelectStorekeeperAndTariff}
        />
      ) : null}

      {showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
          isWarning={confirmModalSettings?.isWarning}
          openModal={showConfirmModal}
          setOpenModal={() => setShowConfirmModal(false)}
          title={t(TranslationKey.Attention)}
          message={confirmModalSettings?.confirmMessage}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={confirmModalSettings?.onClickConfirm}
          onClickCancelBtn={confirmModalSettings?.onClickCancelBtn}
        />
      ) : null}
    </div>
  )
}

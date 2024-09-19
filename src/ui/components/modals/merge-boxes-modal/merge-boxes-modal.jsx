import { useState } from 'react'

import { Typography } from '@mui/material'

import { tariffTypes } from '@constants/keys/tariff-types'
import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { TaskPriorityStatus, mapTaskPriorityStatusEnumToKey } from '@constants/task/task-priority-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChangeChipCell } from '@components/data-grid/data-grid-cells'
import { PriorityForm } from '@components/forms/priority-form/priority-form'
import { BoxMerge } from '@components/shared/boxes/box-merge'
import { Button } from '@components/shared/button'
import { CopyValue } from '@components/shared/copy-value'
import { Field } from '@components/shared/field/field'
import { Modal } from '@components/shared/modal'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'
import { SizeSwitcher } from '@components/shared/size-switcher'
import { Text } from '@components/shared/text'
import { UploadFilesInput } from '@components/shared/upload-files-input'
import { WarehouseDimensions } from '@components/shared/warehouse-dimensions'

import { checkIsStorekeeper } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getShortenStringIfLongerThanCount, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { Dimensions } from '@typings/enums/dimensions'
import { loadingStatus } from '@typings/enums/loading-status'
import { TariffModal } from '@typings/enums/tariff-modal'

import { INCHES_COEFFICIENT, POUNDS_COEFFICIENT, useChangeDimensions } from '@hooks/dimensions/use-change-dimensions'
import { useGetDestinationTariffInfo } from '@hooks/use-get-destination-tariff-info'
import { useTariffVariation } from '@hooks/use-tariff-variation'

import { useStyles } from './merge-boxes-modal.style'

import { SetFileForm } from '../../forms/set-file-form'
import { ConfirmationModal } from '../confirmation-modal'
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
    lengthCmWarehouse: '',
    widthCmWarehouse: '',
    heightCmWarehouse: '',
    weighGrossKgWarehouse: '',
    images: [],

    items: selectedBoxes.map(box => box.items)?.flat(),
  })

  const [sizeSetting, setSizeSetting] = useState(Dimensions.EU)
  const { onChangeDimensions } = useChangeDimensions({
    data: boxBody,
    setData: setBoxBody,
    sizeSetting,
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

  const [imagesOfBox, setImagesOfBox] = useState([])
  const [comment, setComment] = useState('')

  const handleSubmit = () => {
    const updateBoxFields = { ...boxBody }

    if (sizeSetting === Dimensions.US) {
      updateBoxFields.lengthCmWarehouse = Number(toFixed(updateBoxFields.lengthCmWarehouse * INCHES_COEFFICIENT))
      updateBoxFields.widthCmWarehouse = Number(toFixed(updateBoxFields.widthCmWarehouse * INCHES_COEFFICIENT))
      updateBoxFields.heightCmWarehouse = Number(toFixed(updateBoxFields.heightCmWarehouse * INCHES_COEFFICIENT))
      updateBoxFields.weighGrossKgWarehouse = Number(
        toFixed(updateBoxFields.weighGrossKgWarehouse * POUNDS_COEFFICIENT),
      )
    } else {
      updateBoxFields.lengthCmWarehouse = Number(updateBoxFields.lengthCmWarehouse)
      updateBoxFields.widthCmWarehouse = Number(updateBoxFields.widthCmWarehouse)
      updateBoxFields.heightCmWarehouse = Number(updateBoxFields.heightCmWarehouse)
      updateBoxFields.weighGrossKgWarehouse = Number(updateBoxFields.weighGrossKgWarehouse)
    }

    const { items, logicsTariff, storekeeper, finalWeight, volumeWeight, variationTariff, destination, ...other } =
      updateBoxFields

    onSubmit(
      {
        ...other,
        destinationId: boxBody.destinationId || null,
        images: imagesOfBox,
      },
      comment,
      priority,
      priorityReason,
    )
  }

  const onCloseBoxesModal = () => {
    setOpenModal()
  }

  const [showSetShippingLabelModal, setShowSetShippingLabelModal] = useState(false)

  const setShippingLabel = value => {
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
    !boxBody.logicsTariffId ||
    selectedBoxes.length < 2 ||
    (boxBody.shippingLabel?.length < 5 && boxBody.shippingLabel?.length > 0) ||
    isDifferentStorekeepers ||
    ((boxBody.shippingLabel || boxBody.tmpShippingLabel?.length) &&
      !boxBody.fbaShipment &&
      !destinations.find(el => el._id === boxBody.destinationId)?.storekeeper) ||
    (Number(priority) === mapTaskPriorityStatusEnumToKey[TaskPriorityStatus.PROBLEMATIC] && !priorityReason?.length)

  const disabledSubmitStorekeeper =
    disabledSubmit ||
    ['lengthCmWarehouse', 'widthCmWarehouse', 'heightCmWarehouse', 'weighGrossKgWarehouse'].some(
      dim => Number(boxBody[dim]) <= 0,
    )

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
                      <Text className={styles.asinValue} text={order.product?.asin} />
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
                    onClickSelect={el => handleSetDestination(el?._id)}
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
                      <p
                        title={t(TranslationKey['The dimensions of the box specified by the prep center'])}
                        className={styles.standartLabel}
                      >
                        {t(TranslationKey.Dimensions)}
                      </p>

                      <SizeSwitcher condition={sizeSetting} onChangeCondition={setSizeSetting} />
                    </div>

                    <WarehouseDimensions
                      dimensions={boxBody}
                      sizeSetting={sizeSetting}
                      onChangeDimensions={onChangeDimensions}
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
            onClick={handleSubmit}
          >
            {t(TranslationKey.Merge)}
          </Button>
          <Button
            tooltipInfoContent={t(TranslationKey['Close the form without saving'])}
            disabled={requestStatus === loadingStatus.IS_LOADING}
            styleType={ButtonStyle.CASUAL}
            onClick={onCloseBoxesModal}
          >
            {t(TranslationKey.Close)}
          </Button>
        </div>
      </div>

      <Modal
        openModal={showSetShippingLabelModal}
        setOpenModal={() => setShowSetShippingLabelModal(!showSetShippingLabelModal)}
      >
        <SetFileForm
          data={boxBody?.shippingLabel}
          onSubmit={setShippingLabel}
          onClose={() => setShowSetShippingLabelModal(!showSetShippingLabelModal)}
        />
      </Modal>

      {showSelectionStorekeeperAndTariffModal ? (
        <SupplierApproximateCalculationsModal
          isTariffsSelect
          isSkipWeightCheck
          tariffModalType={TariffModal.WAREHOUSE}
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

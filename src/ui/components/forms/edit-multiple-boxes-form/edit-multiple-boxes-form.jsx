/* eslint-disable no-unused-vars */
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import DoneIcon from '@mui/icons-material/Done'
import { Checkbox, Chip, Typography } from '@mui/material'

import { tariffTypes } from '@constants/keys/tariff-types'
import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { BoxStatus } from '@constants/statuses/box-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChangeChipCell } from '@components/data-grid/data-grid-cells'
import { SelectStorekeeperAndTariffForm } from '@components/forms/select-storkeeper-and-tariff-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { SetBarcodeModal } from '@components/modals/set-barcode-modal'
import { SetFilesModal } from '@components/modals/set-files-modal'
import { SetShippingLabelModal } from '@components/modals/set-shipping-label-modal'
import { BoxEdit } from '@components/shared/boxes/box-edit'
import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'
import { Modal } from '@components/shared/modal'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'

import { checkIsStorekeeper } from '@utils/checks'
import { trimBarcode } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/enums/button-style'

import { useGetDestinationTariffInfo } from '@hooks/use-get-destination-tariff-info'

import { useStyles } from './edit-multiple-boxes-form.style'

import { NewBoxes } from './new-boxes/new-boxes'

export const EditMultipleBoxesForm = observer(
  ({
    showCheckbox,
    userInfo,
    destinations,
    storekeepers,
    onSubmit,
    onCloseModal,
    selectedBoxes,
    destinationsFavourites,
    setDestinationsFavouritesItem,
  }) => {
    const { classes: styles, cx } = useStyles()

    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [confirmModalSettings, setConfirmModalSettings] = useState(undefined)

    const [showSetFilesModal, setShowSetFilesModal] = useState(false)
    const [filesConditions, setFilesConditions] = useState({ tmpFiles: [] })

    const [sharedFields, setSharedFields] = useState({
      destinationId: null,
      logicsTariffId: null,
      variationTariffId: null,
      shippingLabel: null,
      fbaShipment: '',
      isShippingLabelAttachedByStorekeeper: false,

      isBarCodeAttachedByTheStorekeeper: false,
      isBarCodeAlreadyAttachedByTheSupplier: false,

      isTransparencyFileAttachedByTheStorekeeper: false,
      isTransparencyFileAlreadyAttachedByTheSupplier: false,

      storekeeperId: selectedBoxes[0]?.storekeeper?._id || undefined,
      tmpShippingLabel: [],
      tmpBarCode: [],
      tmpTransparencyFile: [],
    })

    const [destinationId, setDestinationId] = useState(sharedFields.destinationId)

    useEffect(() => {
      setDestinationId(sharedFields.destinationId)
    }, [sharedFields.destinationId])

    const onChangeSharedFields = (event, field) => {
      const newFormFields = { ...sharedFields }

      if (['isShippingLabelAttachedByStorekeeper'].includes(field)) {
        newFormFields[field] = event.target.checked
      } else if (
        [
          'isBarCodeAlreadyAttachedByTheSupplier',
          'isBarCodeAttachedByTheStorekeeper',
          'isTransparencyFileAttachedByTheStorekeeper',
          'isTransparencyFileAlreadyAttachedByTheSupplier',
        ].includes(field)
      ) {
        if (field === 'isBarCodeAlreadyAttachedByTheSupplier' && event.target.checked) {
          newFormFields[field] = event.target.checked
          newFormFields.isBarCodeAttachedByTheStorekeeper = false
        } else if (field === 'isBarCodeAttachedByTheStorekeeper' && event.target.checked) {
          newFormFields[field] = event.target.checked
          newFormFields.isBarCodeAlreadyAttachedByTheSupplier = false
        } else if (field === 'isTransparencyFileAttachedByTheStorekeeper') {
          newFormFields[field] = event.target.checked
          newFormFields.isTransparencyFileAlreadyAttachedByTheSupplier = false
        } else if (field === 'isTransparencyFileAlreadyAttachedByTheSupplier') {
          newFormFields[field] = event.target.checked
          newFormFields.isTransparencyFileAttachedByTheStorekeeper = false
        } else {
          newFormFields[field] = event.target.checked
        }
      } else {
        newFormFields[field] = event.target.value
      }

      setSharedFields(newFormFields)
    }

    const [showSelectionStorekeeperAndTariffModal, setShowSelectionStorekeeperAndTariffModal] = useState(false)
    const [showSetShippingLabelModal, setShowSetShippingLabelModal] = useState(false)
    const [showSetBarcodeModal, setShowSetBarcodeModal] = useState(false)

    const onClickBarcode = () => {
      setShowSetBarcodeModal(!showSetBarcodeModal)
    }

    const onClickSaveBarcode = product => value => {
      onChangeSharedFields({ target: { value } }, 'tmpBarCode')

      setShowSetBarcodeModal(!showSetBarcodeModal)
    }

    const onSubmitSelectStorekeeperAndTariff = (
      storekeeperId,
      tariffId,
      variationTariffId,
      destinationId,
      isSelectedDestinationNotValid,
    ) => {
      if (isSelectedDestinationNotValid) {
        setConfirmModalSettings({
          isWarning: false,
          title: t(TranslationKey.Attention),
          confirmMessage: t(TranslationKey['Wish to change a destination?']),

          onClickConfirm: () => {
            setSharedFields({
              ...sharedFields,
              storekeeperId,
              logicsTariffId: tariffId,
              variationTariffId,
              destinationId,
            })
            setDestinationId(destinationId)
            setShowConfirmModal(false)
            setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)
          },

          onClickCancelBtn: () => {
            setSharedFields({
              ...sharedFields,
              storekeeperId,
              logicsTariffId: tariffId,
              variationTariffId,
              destinationId: null,
            })
            setDestinationId(null)
            setShowConfirmModal(false)
            setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)
          },
        })

        setShowConfirmModal(true)
      } else {
        setSharedFields({ ...sharedFields, storekeeperId, logicsTariffId: tariffId, variationTariffId })
        setDestinationId(destinationId)

        setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)
      }
    }

    const setShippingLabel = () => value => {
      onChangeSharedFields({ target: { value } }, 'tmpShippingLabel')
    }

    const onClickShippingLabel = () => {
      setShowSetShippingLabelModal(!showSetShippingLabelModal)
    }

    const onDeleteShippingLabel = () => {
      onChangeSharedFields({ target: { value: '' } }, 'shippingLabel')
    }

    const [newBoxes, setNewBoxes] = useState(
      selectedBoxes.map(el => ({
        ...el,
        destinationId: el.destination?._id || null,
        storekeeperId: el.storekeeper?._id || null,
        logicsTariffId: el.logicsTariff?._id || null,
        variationTariffId: el?.variationTariff?._id || null,

        tmpShippingLabel: [],
        items: el?.items ? [...el.items.map(el => ({ ...el, changeBarCodInInventory: false, tmpBarCode: [] }))] : [],

        isSameDestination: true,
      })),
    )

    const [visibleBoxes, setVisibleBoxes] = useState([])

    const [applyBtnsClicked, setApplyBtnsClicked] = useState({
      destinationId: false,
      logicsTariffId: false,
      fbaShipment: false,
      tmpShippingLabel: false,
      tmpBarCode: false,
      tmpTransparencyFile: false,
      isShippingLabelAttachedByStorekeeper: false,
      isBarcodeLabelAttached: false,
    })

    const onRemoveBox = boxId => {
      const arr = newBoxes.filter(box => box._id !== boxId)
      setNewBoxes([...arr])
    }

    useEffect(() => {
      if (!newBoxes.length) {
        onCloseModal()
      }
    }, [newBoxes.length])

    const onChangeField = (e, field, boxId, itemIndex) => {
      setNewBoxes(prevBoxes =>
        prevBoxes.map(newBox => {
          if (newBox._id === boxId) {
            if (field === 'part') {
              return {
                ...newBox,
                ...e,
              }
            } else if (field === 'items') {
              newBox.items[itemIndex] = e
              return newBox
            } else {
              return {
                ...newBox,
                [field]: field === 'isShippingLabelAttachedByStorekeeper' ? e.target.checked : e.target.value,
              }
            }
          }
          return newBox
        }),
      )
    }

    const onApplySharedValuesToAllBoxes = field => {
      const visibleBoxesIds = visibleBoxes.map(el => el._id)

      let updatedNewBoxes

      if (field === 'tmpBarCode') {
        updatedNewBoxes = newBoxes.map(newBox =>
          visibleBoxesIds.includes(newBox._id)
            ? {
                ...newBox,
                items: newBox?.items
                  ? newBox.items.map(el => ({
                      ...el,
                      changeBarCodInInventory: false,
                      tmpBarCode: sharedFields.tmpBarCode,
                    }))
                  : [],
              }
            : newBox,
        )
      } else if (field === 'tmpTransparencyFile') {
        updatedNewBoxes = newBoxes.map(newBox =>
          visibleBoxesIds.includes(newBox._id)
            ? {
                ...newBox,
                items: newBox?.items
                  ? newBox.items.map(el => ({
                      ...el,
                      changeBarCodInInventory: false,
                      tmpTransparencyFile: sharedFields.tmpTransparencyFile,
                    }))
                  : [],
              }
            : newBox,
        )
      } else if (field === 'isBarcodeLabelAttached') {
        updatedNewBoxes = newBoxes.map(newBox =>
          visibleBoxesIds.includes(newBox._id)
            ? {
                ...newBox,
                items: newBox?.items
                  ? newBox.items.map(el => ({
                      ...el,
                      isBarCodeAlreadyAttachedByTheSupplier: sharedFields.isBarCodeAlreadyAttachedByTheSupplier,
                      isBarCodeAttachedByTheStorekeeper: sharedFields.isBarCodeAttachedByTheStorekeeper,
                      isTransparencyFileAttachedByTheStorekeeper:
                        sharedFields.isTransparencyFileAttachedByTheStorekeeper,
                      isTransparencyFileAlreadyAttachedByTheSupplier:
                        sharedFields.isTransparencyFileAlreadyAttachedByTheSupplier,
                    }))
                  : [],
              }
            : newBox,
        )
      } else if (field === 'logicsTariffId') {
        updatedNewBoxes = newBoxes.map(newBox =>
          visibleBoxesIds.includes(newBox._id)
            ? {
                ...newBox,
                logicsTariffId: sharedFields.logicsTariffId,
                variationTariffId: sharedFields.variationTariffId,
              }
            : newBox,
        )
      } else {
        updatedNewBoxes = newBoxes.map(newBox =>
          visibleBoxesIds.includes(newBox._id)
            ? {
                ...newBox,
                [field]: sharedFields[field],
              }
            : newBox,
        )
      }

      setApplyBtnsClicked({ ...applyBtnsClicked, [field]: true })

      setTimeout(() => setApplyBtnsClicked({ ...applyBtnsClicked, [field]: false }), 1000)

      setNewBoxes(updatedNewBoxes)
    }

    const onClickSubmit = () => {
      onSubmit(newBoxes, selectedBoxes)
    }

    const { tariffName, tariffRate, currentTariff } = useGetDestinationTariffInfo(
      destinations,
      storekeepers,
      sharedFields.destinationId,
      sharedFields.storekeeperId,
      sharedFields.logicsTariffId,
      sharedFields.variationTariffId,
    )

    const disabledSubmitBtn =
      newBoxes.some(
        el =>
          !el.isSameDestination ||
          !el.logicsTariffId ||
          ((el.shippingLabel || el.tmpShippingLabel?.length) &&
            !el.fbaShipment &&
            !destinations.find(e => e._id === el.destinationId)?.storekeeper),
      ) || selectedBoxes.some(box => box?.status !== BoxStatus.IN_STOCK)

    const disabledApplyBtn = !visibleBoxes.length

    return (
      <div className={styles.root}>
        <div className={styles.modalTitleWrapper}>
          <Typography className={styles.modalTitle}>{t(TranslationKey['Editing boxes'])}</Typography>
          <BoxEdit />
        </div>

        <div className={styles.boxesWrapper}>
          <div className={styles.currentBox}>
            <div className={styles.currentBoxTitle}>
              <Typography className={styles.sectionTitle}>{t(TranslationKey['Shared options'])}</Typography>
            </div>

            <div className={styles.sharedItemSubWrapper}>
              <div>
                <Field
                  containerClasses={styles.field}
                  tooltipInfoContent={t(TranslationKey["Amazon's final warehouse in the USA, available for change"])}
                  label={t(TranslationKey.Destination)}
                  labelClasses={styles.label}
                  inputComponent={
                    <WithSearchSelect
                      width={230}
                      favourites={destinationsFavourites}
                      selectedItemName={
                        destinations.find(el => el._id === sharedFields.destinationId)?.name ||
                        t(TranslationKey['Not chosen'])
                      }
                      data={
                        sharedFields.variationTariffId &&
                        currentTariff?.tariffType === tariffTypes.WEIGHT_BASED_LOGISTICS_TARIFF
                          ? destinations.filter(el => el?._id === destinationId)
                          : destinations.filter(el => el.storekeeper?._id !== sharedFields.storekeeperId)
                      }
                      searchFields={['name']}
                      onClickNotChosen={() => onChangeSharedFields({ target: { value: null } }, 'destinationId')}
                      onClickSelect={el => onChangeSharedFields({ target: { value: el._id } }, 'destinationId')}
                      onClickSetDestinationFavourite={setDestinationsFavouritesItem}
                    />
                  }
                />

                <Button
                  disabled={disabledApplyBtn}
                  className={cx(styles.applyButton, {
                    [styles.applyButtonClicked]: applyBtnsClicked.destinationId,
                  })}
                  onClick={() => onApplySharedValuesToAllBoxes('destinationId')}
                >
                  {applyBtnsClicked.destinationId ? <DoneIcon /> : t(TranslationKey.Apply)}
                </Button>
              </div>

              <div>
                <Field
                  containerClasses={styles.field}
                  tooltipInfoContent={t(TranslationKey['Prep Center in China, available for change'])}
                  label={`${t(TranslationKey['Int warehouse'])} / ` + t(TranslationKey.Tariff)}
                  labelClasses={styles.label}
                  inputComponent={
                    <Button
                      className={styles.button}
                      onClick={() => setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)}
                    >
                      {sharedFields.logicsTariffId
                        ? `${
                            sharedFields.logicsTariffId
                              ? `${tariffName}${tariffRate ? ' / ' + tariffRate + ' $' : ''}`
                              : 'none'
                          }`
                        : t(TranslationKey.Select)}
                    </Button>
                  }
                />

                <Button
                  disabled={disabledApplyBtn}
                  className={cx(styles.applyButton, {
                    [styles.applyButtonClicked]: applyBtnsClicked.logicsTariffId,
                  })}
                  onClick={() => onApplySharedValuesToAllBoxes('logicsTariffId')}
                >
                  {applyBtnsClicked.logicsTariffId ? <DoneIcon /> : t(TranslationKey.Apply)}
                </Button>
              </div>

              <div>
                <Field
                  inputProps={{ maxLength: 255 }}
                  tooltipInfoContent={t(TranslationKey['Enter or edit FBA Shipment'])}
                  containerClasses={styles.field}
                  labelClasses={styles.label}
                  className={styles.fieldInput}
                  label={t(TranslationKey['FBA Shipment'])}
                  value={sharedFields.fbaShipment}
                  onChange={e => onChangeSharedFields(e, 'fbaShipment')}
                />

                <Button
                  disabled={disabledApplyBtn}
                  className={cx(styles.applyButton, {
                    [styles.applyButtonClicked]: applyBtnsClicked.fbaShipment,
                  })}
                  onClick={() => onApplySharedValuesToAllBoxes('fbaShipment')}
                >
                  {applyBtnsClicked.fbaShipment ? <DoneIcon /> : t(TranslationKey.Apply)}
                </Button>
              </div>

              <div>
                <Field
                  label={t(TranslationKey['Shipping label']) + ':'}
                  tooltipInfoContent={t(TranslationKey['Add or replace the shipping label'])}
                  labelClasses={styles.label}
                  inputComponent={
                    <Chip
                      classes={{
                        root: styles.barcodeChip,
                        clickable: styles.barcodeChipHover,
                        deletable: styles.barcodeChipHover,
                        deleteIcon: styles.barcodeChipIcon,
                        label: styles.barcodeChiplabel,
                      }}
                      className={cx({ [styles.barcodeChipExists]: sharedFields.shippingLabel })}
                      size="small"
                      label={
                        sharedFields.tmpShippingLabel?.length
                          ? t(TranslationKey['File added'])
                          : sharedFields.shippingLabel
                          ? trimBarcode(sharedFields.shippingLabel)
                          : t(TranslationKey['Set Shipping Label'])
                      }
                      onClick={() => onClickShippingLabel()}
                      onDelete={!sharedFields.shippingLabel ? undefined : () => onDeleteShippingLabel()}
                    />
                  }
                />
                <Button
                  disabled={disabledApplyBtn}
                  className={cx(styles.applyButton, {
                    [styles.applyButtonClicked]: applyBtnsClicked.tmpShippingLabel,
                  })}
                  onClick={() => onApplySharedValuesToAllBoxes('tmpShippingLabel')}
                >
                  {applyBtnsClicked.tmpShippingLabel ? <DoneIcon /> : t(TranslationKey.Apply)}
                </Button>
              </div>

              <div>
                <Field
                  labelClasses={styles.label}
                  label={t(TranslationKey.BarCode)}
                  inputComponent={
                    <ChangeChipCell
                      isChipOutTable
                      text={!sharedFields?.tmpBarCode?.length && t(TranslationKey['Set Barcode'])}
                      value={sharedFields?.tmpBarCode?.[0]?.file?.name || sharedFields?.tmpBarCode?.[0]}
                      onClickChip={() => onClickBarcode(sharedFields)}
                      onDeleteChip={() => setSharedFields(prev => ({ ...prev, tmpBarCode: [] }))}
                    />
                  }
                />
                <Button
                  disabled={disabledApplyBtn}
                  className={cx(styles.applyButton, {
                    [styles.applyButtonClicked]: applyBtnsClicked.tmpBarCode,
                  })}
                  onClick={() => onApplySharedValuesToAllBoxes('tmpBarCode')}
                >
                  {applyBtnsClicked.tmpBarCode ? <DoneIcon /> : t(TranslationKey.Apply)}
                </Button>
              </div>

              <div>
                <Field
                  labelClasses={styles.label}
                  label={t(TranslationKey['Transparency codes'])}
                  inputComponent={
                    <ChangeChipCell
                      isChipOutTable
                      text={!sharedFields?.tmpTransparencyFile?.length && t(TranslationKey.Transparency)}
                      value={
                        sharedFields?.tmpTransparencyFile?.[0]?.file?.name || sharedFields?.tmpTransparencyFile?.[0]
                      }
                      onClickChip={() => {
                        setShowSetFilesModal(true)
                        setFilesConditions({ tmpFiles: sharedFields?.tmpTransparencyFile })
                      }}
                      onDeleteChip={() => setSharedFields(prev => ({ ...prev, tmpTransparencyFile: [] }))}
                    />
                  }
                />
                <Button
                  disabled={disabledApplyBtn}
                  className={cx(styles.applyButton, {
                    [styles.applyButtonClicked]: applyBtnsClicked.tmpTransparencyFile,
                  })}
                  onClick={() => onApplySharedValuesToAllBoxes('tmpTransparencyFile')}
                >
                  {applyBtnsClicked.tmpBarCode ? <DoneIcon /> : t(TranslationKey.Apply)}
                </Button>
              </div>

              {checkIsStorekeeper(UserRoleCodeMap[userInfo?.role]) ? (
                <div>
                  <Field
                    oneLine
                    labelClasses={styles.label}
                    label={t(TranslationKey['Shipping label was glued to the warehouse'])}
                    inputComponent={
                      <div className={styles.checkboxWrapper}>
                        <Checkbox
                          color="primary"
                          checked={sharedFields.isShippingLabelAttachedByStorekeeper}
                          onChange={e => onChangeSharedFields(e, 'isShippingLabelAttachedByStorekeeper')}
                        />
                        {/* <Typography className={styles.checkboxLabel}>{t(TranslationKey.FBA)}</Typography> */}
                      </div>
                    }
                  />
                  <Button
                    disabled={disabledApplyBtn}
                    className={cx(styles.applyButton, {
                      [styles.applyButtonClicked]: applyBtnsClicked.isShippingLabelAttachedByStorekeeper,
                    })}
                    onClick={() => onApplySharedValuesToAllBoxes('isShippingLabelAttachedByStorekeeper')}
                  >
                    {applyBtnsClicked.isShippingLabelAttachedByStorekeeper ? <DoneIcon /> : t(TranslationKey.Apply)}
                  </Button>
                </div>
              ) : null}

              {checkIsStorekeeper(UserRoleCodeMap[userInfo?.role]) && (
                <div>
                  <Field
                    oneLine
                    labelClasses={styles.label}
                    tooltipInfoContent={t(TranslationKey['The supplier has glued the barcode before shipment'])}
                    containerClasses={styles.checkboxContainer}
                    label={t(TranslationKey['The barcode is glued by the supplier'])}
                    inputComponent={
                      <Checkbox
                        checked={sharedFields.isBarCodeAlreadyAttachedByTheSupplier}
                        onChange={e => onChangeSharedFields(e, 'isBarCodeAlreadyAttachedByTheSupplier')}
                      />
                    }
                  />
                  <Field
                    oneLine
                    labelClasses={styles.label}
                    tooltipInfoContent={t(
                      TranslationKey['The barcode was glued on when the box was accepted at the prep center'],
                    )}
                    containerClasses={styles.checkboxContainer}
                    label={t(TranslationKey['The barcode is glued by the Storekeeper'])}
                    inputComponent={
                      <Checkbox
                        checked={sharedFields.isBarCodeAttachedByTheStorekeeper}
                        onChange={e => onChangeSharedFields(e, 'isBarCodeAttachedByTheStorekeeper')}
                      />
                    }
                  />

                  <Field
                    oneLine
                    labelClasses={styles.label}
                    containerClasses={styles.checkboxContainer}
                    label={t(TranslationKey['Transparency codes glued by the supplier'])}
                    inputComponent={
                      <Checkbox
                        checked={sharedFields.isTransparencyFileAlreadyAttachedByTheSupplier}
                        onChange={e => onChangeSharedFields(e, 'isTransparencyFileAlreadyAttachedByTheSupplier')}
                      />
                    }
                  />

                  <Field
                    oneLine
                    labelClasses={styles.label}
                    containerClasses={styles.checkboxContainer}
                    label={t(TranslationKey['Transparency codes are glued by storekeeper'])}
                    inputComponent={
                      <Checkbox
                        checked={sharedFields.isTransparencyFileAttachedByTheStorekeeper}
                        onChange={e => onChangeSharedFields(e, 'isTransparencyFileAttachedByTheStorekeeper')}
                      />
                    }
                  />

                  <Button
                    disabled={disabledApplyBtn}
                    className={cx(styles.applyButton, {
                      [styles.applyButtonClicked]: applyBtnsClicked.isBarcodeLabelAttached,
                    })}
                    onClick={() => onApplySharedValuesToAllBoxes('isBarcodeLabelAttached')}
                  >
                    {applyBtnsClicked.isBarcodeLabelAttached ? <DoneIcon /> : t(TranslationKey.Apply)}
                  </Button>
                </div>
              )}
            </div>
          </div>

          <NewBoxes
            showCheckbox={showCheckbox}
            userInfo={userInfo}
            visibleBoxes={visibleBoxes}
            newBoxes={newBoxes}
            destinations={destinations}
            storekeepers={storekeepers}
            destinationsFavourites={destinationsFavourites}
            setDestinationsFavouritesItem={setDestinationsFavouritesItem}
            setVisibleBoxes={setVisibleBoxes}
            setNewBoxes={setNewBoxes}
            onChangeField={onChangeField}
            onRemoveBox={onRemoveBox}
          />
        </div>

        <div className={styles.buttonsWrapper}>
          <Button disabled={disabledSubmitBtn} className={styles.button} onClick={onClickSubmit}>
            {t(TranslationKey.Edit)}
          </Button>

          <Button
            variant={ButtonVariant.OUTLINED}
            tooltipInfoContent={t(TranslationKey['Close the form without saving'])}
            className={cx(styles.button, styles.cancelButton)}
            onClick={onCloseModal}
          >
            {t(TranslationKey.Cancel)}
          </Button>
        </div>

        <Modal
          openModal={showSetShippingLabelModal}
          setOpenModal={() => setShowSetShippingLabelModal(!showSetShippingLabelModal)}
        >
          <SetShippingLabelModal
            tmpShippingLabel={sharedFields.tmpShippingLabel}
            item={sharedFields}
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
            RemoveDestinationRestriction
            showCheckbox={showCheckbox}
            destinationsData={destinations}
            storekeepers={
              sharedFields?.storekeeperId
                ? storekeepers?.filter(el => el._id === sharedFields?.storekeeperId)
                : storekeepers.filter(el => el._id === selectedBoxes[0]?.storekeeper?._id)
            }
            curStorekeeperId={sharedFields?.storekeeperId}
            curTariffId={sharedFields?.logicsTariffId}
            currentDestinationId={sharedFields?.destinationId}
            currentVariationTariffId={sharedFields?.variationTariffId}
            onSubmit={onSubmitSelectStorekeeperAndTariff}
          />
        </Modal>

        <Modal openModal={showSetBarcodeModal} setOpenModal={() => setShowSetBarcodeModal(!showSetBarcodeModal)}>
          <SetBarcodeModal
            tmpCode={sharedFields?.tmpBarCode}
            barCode={sharedFields?.barCode}
            onClickSaveBarcode={data => onClickSaveBarcode(sharedFields)(data)}
            onCloseModal={() => setShowSetBarcodeModal(!showSetBarcodeModal)}
          />
        </Modal>

        <Modal openModal={showSetFilesModal} setOpenModal={setShowSetFilesModal}>
          <SetFilesModal
            modalTitle={t(TranslationKey.Transparency)}
            LabelTitle={t(TranslationKey['Transparency codes'])}
            currentFiles={filesConditions.currentFiles}
            tmpFiles={filesConditions.tmpFiles}
            onClickSave={value => {
              onChangeSharedFields({ target: { value } }, 'tmpTransparencyFile')
              setShowSetFilesModal(false)
            }}
            onCloseModal={setShowSetFilesModal}
          />
        </Modal>

        <ConfirmationModal
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
      </div>
    )
  },
)

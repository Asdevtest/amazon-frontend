/* eslint-disable no-unused-vars */
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import DoneIcon from '@mui/icons-material/Done'
import { Checkbox, Typography } from '@mui/material'

import { tariffTypes } from '@constants/keys/tariff-types'
import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { BoxStatus } from '@constants/statuses/box-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChangeChipCell } from '@components/data-grid/data-grid-cells'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { SetBarcodeModal } from '@components/modals/set-barcode-modal'
import { SetFilesModal } from '@components/modals/set-files-modal'
import { SetShippingLabelModal } from '@components/modals/set-shipping-label-modal'
import { SupplierApproximateCalculationsModal } from '@components/modals/supplier-approximate-calculations'
import { BoxEdit } from '@components/shared/boxes/box-edit'
import { Button } from '@components/shared/button'
import { Field } from '@components/shared/field'
import { Modal } from '@components/shared/modal'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'

import { checkIsStorekeeper } from '@utils/checks'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { TariffModal } from '@typings/enums/tariff-modal'

import { useGetDestinationTariffInfo } from '@hooks/use-get-destination-tariff-info'
import { useTariffVariation } from '@hooks/use-tariff-variation'

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

      destination: {
        _id: null,
      },
      logicsTariff: {
        _id: null,
      },
      variationTariff: {
        _id: null,
      },

      storekeeper: selectedBoxes[0]?.storekeeper,

      items: selectedBoxes?.map(box => box?.items).flat(),
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
    } = useTariffVariation(sharedFields.destinationId, setSharedFields)

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

    const [showSetShippingLabelModal, setShowSetShippingLabelModal] = useState(false)
    const [showSetBarcodeModal, setShowSetBarcodeModal] = useState(false)

    const onClickBarcode = () => {
      setShowSetBarcodeModal(!showSetBarcodeModal)
    }

    const onClickSaveBarcode = product => value => {
      onChangeSharedFields({ target: { value } }, 'tmpBarCode')

      setShowSetBarcodeModal(!showSetBarcodeModal)
    }

    const setShippingLabel = value => {
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
      } else if (field === 'tmpShippingLabel') {
        updatedNewBoxes = newBoxes.map(newBox =>
          visibleBoxesIds.includes(newBox._id)
            ? {
                ...newBox,
                tmpShippingLabel: sharedFields.tmpShippingLabel,
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

                logicsTariff: sharedFields.logicsTariff,
                variationTariff: sharedFields.variationTariff,
              }
            : newBox,
        )
      } else if (field === 'destinationId') {
        updatedNewBoxes = newBoxes.map(newBox =>
          visibleBoxesIds.includes(newBox._id)
            ? {
                ...newBox,

                destination: sharedFields.destination,
                destinationId: sharedFields.destinationId,
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
                      onClickSelect={el => handleSetDestination(el?._id)}
                      onClickNotChosen={handleResetDestination}
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
                    <ChangeChipCell
                      isChipOutTable
                      text={!sharedFields.tmpShippingLabel?.length && t(TranslationKey['Set Shipping Label'])}
                      value={sharedFields?.tmpShippingLabel?.[0]?.file?.name || sharedFields?.tmpShippingLabel?.[0]}
                      onClickChip={onClickShippingLabel}
                      onDeleteChip={!sharedFields.shippingLabel ? undefined : () => onDeleteShippingLabel()}
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
                  {applyBtnsClicked.tmpTransparencyFile ? <DoneIcon /> : t(TranslationKey.Apply)}
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
            styleType={ButtonStyle.CASUAL}
            tooltipInfoContent={t(TranslationKey['Close the form without saving'])}
            className={cx(styles.button, styles.cancelButton)}
            onClick={onCloseModal}
          >
            {t(TranslationKey.Close)}
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
              setShippingLabel(shippingLabel)
              setShowSetShippingLabelModal(!showSetShippingLabelModal)
            }}
            onCloseModal={() => setShowSetShippingLabelModal(!showSetShippingLabelModal)}
          />
        </Modal>

        {showSelectionStorekeeperAndTariffModal ? (
          <SupplierApproximateCalculationsModal
            isTariffsSelect
            tariffModalType={TariffModal.WAREHOUSE}
            openModal={showSelectionStorekeeperAndTariffModal}
            setOpenModal={() => setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)}
            box={sharedFields}
            onClickSubmit={onSubmitSelectStorekeeperAndTariff}
          />
        ) : null}

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
  },
)

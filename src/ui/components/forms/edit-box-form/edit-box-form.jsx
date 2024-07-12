import { memo, useState } from 'react'

import { Divider, Typography } from '@mui/material'

import { BoxStatus } from '@constants/statuses/box-status'
import { TaskPriorityStatus, mapTaskPriorityStatusEnumToKey } from '@constants/task/task-priority-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChangeChipCell } from '@components/data-grid/data-grid-cells'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { SetBarcodeModal } from '@components/modals/set-barcode-modal'
import { SetFilesModal } from '@components/modals/set-files-modal'
import { SetShippingLabelModal } from '@components/modals/set-shipping-label-modal'
import { SupplierApproximateCalculationsModal } from '@components/modals/supplier-approximate-calculations'
import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { BoxEdit } from '@components/shared/boxes/box-edit'
import { Button } from '@components/shared/button'
import { Checkbox } from '@components/shared/checkbox'
import { CustomSlider } from '@components/shared/custom-slider'
import { Field } from '@components/shared/field'
import { Input } from '@components/shared/input'
import { Modal } from '@components/shared/modal'
import { PriorityForm } from '@components/shared/priority-form/priority-form'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'
import { SizeSwitcher } from '@components/shared/size-switcher'
import { SlideshowGallery } from '@components/shared/slideshow-gallery'
import { Text } from '@components/shared/text'
import { WarehouseDimensions } from '@components/shared/warehouse-dimensions'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { Dimensions } from '@typings/enums/dimensions'
import { loadingStatus } from '@typings/enums/loading-status'
import { TariffModal } from '@typings/enums/tariff-modal'

import { useChangeDimensions } from '@hooks/dimensions/use-change-dimensions'
import { useGetDestinationTariffInfo } from '@hooks/use-get-destination-tariff-info'
import { useTariffVariation } from '@hooks/use-tariff-variation'

import { useStyles } from './edit-box-form.style'

export const EditBoxForm = memo(
  ({
    formItem,
    onSubmit,
    onTriggerOpenModal,
    requestStatus,
    destinations,
    storekeepers,
    destinationsFavourites,
    setDestinationsFavouritesItem,
  }) => {
    const { classes: styles, cx } = useStyles()
    const [priority, setPriority] = useState()
    const [priorityReason, setPriorityReason] = useState()
    const [showSetShippingLabelModal, setShowSetShippingLabelModal] = useState(false)
    const [curProductToEditBarcode, setCurProductToEditBarcode] = useState(undefined)
    const [showSetFilesModal, setShowSetFilesModal] = useState(false)
    const [filesConditions, setFilesConditions] = useState({ tmpFiles: [], currentFiles: '', index: undefined })
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
      newFormFields.items = boxFields.items.map(el =>
        el.product._id === product.product._id ? { ...el, tmpBarCode: newBarCodeData } : el,
      )
      setBoxFields(newFormFields)
      setShowSetBarcodeModal(!showSetBarcodeModal)
    }

    const onClickSaveTransparencyFile = (newTransparencyFileData, index) => {
      const newFormFields = { ...boxFields }
      newFormFields.items[index] = { ...newFormFields.items[index], tmpTransparencyFile: newTransparencyFileData }
      setBoxFields(newFormFields)
      setShowSetFilesModal(false)
    }

    const boxInitialState = {
      ...formItem,

      lengthCmWarehouse: String(formItem?.lengthCmWarehouse) || '',
      widthCmWarehouse: String(formItem?.widthCmWarehouse) || '',
      heightCmWarehouse: String(formItem?.heightCmWarehouse) || '',
      weighGrossKgWarehouse: String(formItem?.weighGrossKgWarehouse) || '',

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
        ? formItem.items.map(el => ({ ...el, changeBarCodInInventory: false, tmpBarCode: [], tmpTransparencyFile: [] }))
        : [],
    }

    const [boxFields, setBoxFields] = useState(boxInitialState)

    const [sizeSetting, setSizeSetting] = useState(Dimensions.EU)
    const { onChangeDimensions } = useChangeDimensions({
      data: boxFields,
      setData: setBoxFields,
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
    } = useTariffVariation(boxFields.destinationId, setBoxFields)

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
        item.product._id === productId
          ? { ...item, barCode: '', tmpBarCode: '', changeBarCodInInventory: false }
          : item,
      )
      setBoxFields(newFormFields)
    }

    const onDeleteTransparencyFile = productId => {
      const newFormFields = { ...boxFields }
      newFormFields.items = boxFields.items.map(item =>
        item.product._id === productId ? { ...item, transparencyFile: '', tmpTransparencyFile: [] } : item,
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

    const getBoxDataToSubmit = () => {
      return {
        ...boxFields,
        destinationId: boxFields.destinationId || null,
      }
    }

    const disableSubmit =
      JSON.stringify(boxInitialState) === JSON.stringify(boxFields) ||
      requestStatus === loadingStatus.IS_LOADING ||
      !boxFields.storekeeperId ||
      !boxFields.logicsTariffId ||
      ((boxFields.shippingLabel || boxFields.tmpShippingLabel.length) &&
        !boxFields.fbaShipment &&
        !destinations.find(el => el._id === boxFields.destinationId)?.storekeeper) ||
      (Number(priority) === mapTaskPriorityStatusEnumToKey[TaskPriorityStatus.PROBLEMATIC] &&
        !priorityReason?.length) ||
      boxFields.status !== BoxStatus.IN_STOCK

    const { tariffName, tariffRate } = useGetDestinationTariffInfo(
      destinations,
      storekeepers,
      boxFields.destinationId,
      boxFields.storekeeperId,
      boxFields.logicsTariffId,
      boxFields.variationTariffId,
    )

    const allItemsCount =
      boxFields.items.reduce((ac, cur) => (ac = ac + cur.amount), 0) * (boxFields.amount < 1 ? 1 : boxFields.amount)

    return (
      <div className={styles.root}>
        <div className={styles.titleWrapper}>
          <Typography className={styles.title}>{t(TranslationKey['Editing the box'])}</Typography>
          <BoxEdit />
        </div>

        <div className={styles.form}>
          <Field
            label={t(TranslationKey.Edit)}
            inputComponent={
              <div className={styles.editBlockWrapper}>
                <div className={styles.editBlockHeaderWrapper}>
                  <div className={styles.titlePrepIdSubWrapper}>
                    <Field
                      oneLine
                      labelClasses={styles.standartLabel}
                      containerClasses={styles.containerTitleField}
                      label={`${t(TranslationKey.Box)} №`}
                      inputComponent={
                        <div className={styles.boxTitleWrapper}>
                          <Typography className={styles.tableTitle}>{`${
                            formItem && formItem.humanFriendlyId
                          }`}</Typography>
                        </div>
                      }
                    />

                    <Field
                      oneLine
                      labelClasses={styles.standartLabel}
                      label={`ID:`}
                      inputComponent={
                        <Input
                          className={styles.itemInput}
                          classes={{ input: styles.input }}
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
                    labelClasses={styles.standartLabel}
                    inputClasses={styles.disabledNumInput}
                    containerClasses={styles.containerField}
                    label={t(TranslationKey['Total goods In Box'])}
                    value={allItemsCount}
                  />
                </div>
                <Typography className={styles.amountSpan}>
                  {boxFields.amount > 1 ? `super x ${boxFields.amount}` : ''}
                </Typography>

                <Divider className={styles.divider} />

                <div className={styles.productsWrapper}>
                  <CustomSlider alignButtons="end">
                    {boxFields.items.map((item, index) => {
                      const barcodeChecked =
                        item.barCode &&
                        (item.isBarCodeAlreadyAttachedByTheSupplier || !item.isBarCodeAttachedByTheStorekeeper)
                      const barcodeText = barcodeChecked
                        ? item.isBarCodeAlreadyAttachedByTheSupplier
                          ? t(TranslationKey['BarCode is glued by supplier'])
                          : t(TranslationKey['BarCode is glued by storekeeper'])
                        : t(TranslationKey['Barсode is not glued'])
                      const transparencyChecked =
                        item.isTransparencyFileAttachedByTheStorekeeper ||
                        item.isTransparencyFileAlreadyAttachedByTheSupplier
                      const transparencyText = transparencyChecked
                        ? item.isTransparencyFileAttachedByTheStorekeeper
                          ? t(TranslationKey['Transparency codes are glued by storekeeper'])
                          : t(TranslationKey['Transparency codes glued by the supplier'])
                        : item.transparencyFile
                        ? t(TranslationKey['Transperensy сode is not glued'])
                        : null

                      return (
                        <div key={index} className={styles.productWrapper}>
                          <div className={styles.leftProductColumn}>
                            <SlideshowGallery slidesToShow={2} files={item.product.images} />

                            <div>
                              <Field
                                containerClasses={styles.field}
                                tooltipAttentionContent={
                                  !item.barCode && t(TranslationKey['A task will be created for the prep center'])
                                }
                                tooltipInfoContent={
                                  !item.barCode && t(TranslationKey['Add a product barcode to the box'])
                                }
                                labelClasses={styles.standartLabel}
                                label={t(TranslationKey.BarCode)}
                                inputComponent={
                                  <ChangeChipCell
                                    isChipOutTable
                                    text={!item.barCode && !item?.tmpBarCode?.[0] && t(TranslationKey['Set Barcode'])}
                                    value={item?.tmpBarCode?.[0]?.file?.name || item?.tmpBarCode?.[0] || item.barCode}
                                    onClickChip={() => onClickBarcode(item)}
                                    onDoubleClickChip={() => onDoubleClickBarcode(item)}
                                    onDeleteChip={() => onDeleteBarcode(item.product._id)}
                                  />
                                }
                              />

                              <Field
                                containerClasses={styles.field}
                                labelClasses={styles.standartLabel}
                                label={t(TranslationKey['Transparency codes'])}
                                inputComponent={
                                  <ChangeChipCell
                                    isChipOutTable
                                    text={
                                      !item.transparencyFile &&
                                      !item?.tmpTransparencyFile?.[0] &&
                                      t(TranslationKey.Transparency)
                                    }
                                    value={
                                      item?.tmpTransparencyFile?.[0]?.file?.name ||
                                      item?.tmpTransparencyFile?.[0] ||
                                      item.transparencyFile
                                    }
                                    onClickChip={() => {
                                      setFilesConditions({
                                        tmpFiles: item?.tmpTransparencyFile,
                                        currentFiles: item.transparencyFile,
                                        index,
                                      })
                                      setShowSetFilesModal(true)
                                    }}
                                    onDeleteChip={() => onDeleteTransparencyFile(item.product._id)}
                                  />
                                }
                              />

                              {!!item.tmpBarCode.length && (
                                <Field
                                  oneLine
                                  labelClasses={styles.standartLabel}
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
                              )}

                              <div>
                                <p>{barcodeText}</p>
                                <p>{transparencyText}</p>
                              </div>
                            </div>
                          </div>

                          <div className={styles.rightProductColumn}>
                            <Typography className={styles.amazonTitle}>{item.product.amazonTitle}</Typography>

                            {item.product.asin ? (
                              <AsinOrSkuLink withCopyValue withAttributeTitle="asin" link={item.product.asin} />
                            ) : null}

                            <Field
                              oneLine
                              disabled
                              labelClasses={styles.standartLabel}
                              inputClasses={styles.disabledNumInput}
                              label={t(TranslationKey['Quantity units of product'])}
                              value={item.amount}
                            />

                            <Field
                              multiline
                              disabled
                              minRows={5}
                              maxRows={5}
                              labelClasses={styles.standartLabel}
                              inputClasses={styles.multiline}
                              label={t(TranslationKey['Comments on order'])}
                              value={item.order.clientComment}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </CustomSlider>
                </div>

                <Divider className={styles.divider} />
                <div className={styles.shareBoxWrapper}>
                  <div className={styles.shareBoxSubWrapper}>
                    <Field
                      labelClasses={styles.standartLabel}
                      containerClasses={styles.field}
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
                            boxFields?.variationTariffId
                              ? destinations.filter(
                                  el => el?._id === (destinationId || boxFields?.variationTariff?.destinationId),
                                )
                              : destinations.filter(el => el.storekeeper?._id !== boxFields?.storekeeper._id)
                          }
                          searchFields={['name']}
                          favourites={destinationsFavourites}
                          onClickSetDestinationFavourite={setDestinationsFavouritesItem}
                          onClickNotChosen={handleResetDestination}
                          onClickSelect={el => handleSetDestination(el._id)}
                        />
                      }
                    />

                    <Field
                      labelClasses={styles.standartLabel}
                      containerClasses={styles.field}
                      label={`${t(TranslationKey['Int warehouse'])} / ${t(TranslationKey.Tariff)}`}
                      tooltipInfoContent={t(TranslationKey['Prep Center in China, available for change'])}
                      tooltipAttentionContent={
                        !tariffName && t(TranslationKey['The tariff is invalid or has been removed!'])
                      }
                      inputComponent={
                        <Button
                          onClick={() =>
                            setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)
                          }
                        >
                          {boxFields.storekeeperId && (tariffName || tariffRate)
                            ? `${tariffName ? tariffName : ''}${tariffRate ? ' / ' + tariffRate + ' $' : ''}`
                            : t(TranslationKey.Select)}
                        </Button>
                      }
                    />
                  </div>
                  <div className={styles.shareBoxSubWrapper}>
                    <Field
                      labelClasses={styles.standartLabel}
                      containerClasses={styles.field}
                      inputClasses={cx(styles.fbaShipmentInput, {
                        [styles.inputAccent]:
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
                      labelClasses={styles.standartLabel}
                      containerClasses={styles.field}
                      tooltipInfoContent={t(TranslationKey['Add or replace the shipping label'])}
                      tooltipAttentionContent={t(
                        TranslationKey['When re-sticking will create a task for the prep center'],
                      )}
                      label={t(TranslationKey['Shipping label'])}
                      inputComponent={
                        <ChangeChipCell
                          isChipOutTable
                          text={
                            !boxFields.shippingLabel &&
                            !boxFields.tmpShippingLabel.length &&
                            t(TranslationKey['Set Shipping Label'])
                          }
                          value={
                            boxFields.tmpShippingLabel?.[0]?.file?.name ||
                            boxFields.tmpShippingLabel?.[0] ||
                            boxFields.shippingLabel
                          }
                          onClickChip={() => onClickShippingLabel()}
                          onDeleteChip={() => onDeleteShippingLabel()}
                        />
                      }
                    />
                  </div>

                  <div className={styles.shareBoxSubWrapper}>
                    <Field
                      labelClasses={styles.standartLabel}
                      containerClasses={styles.field}
                      inputClasses={cx(styles.fbaShipmentInput)}
                      inputProps={{ maxLength: 255 }}
                      label={t(TranslationKey['Reference id'])}
                      value={boxFields.referenceId}
                      onChange={setFormField('referenceId')}
                    />

                    <Field
                      labelClasses={styles.standartLabel}
                      containerClasses={styles.field}
                      inputClasses={cx(styles.fbaShipmentInput)}
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

                  <SizeSwitcher condition={sizeSetting} onChangeCondition={setSizeSetting} />
                </div>

                <WarehouseDimensions
                  disabled
                  dimensions={boxFields}
                  sizeSetting={sizeSetting}
                  onChangeDimensions={onChangeDimensions}
                />

                <div className={styles.boxPhotoWrapper}>
                  <Typography className={styles.standartLabel}>
                    {t(TranslationKey['Photos of the box taken at the warehouse:'])}
                  </Typography>

                  <SlideshowGallery slidesToShow={2} files={boxFields.images} />
                </div>

                <div className={styles.commentsWrapper}>
                  <Field
                    multiline
                    minRows={3}
                    maxRows={3}
                    label={t(TranslationKey['Client comment'])}
                    placeholder={t(TranslationKey['Add comment'])}
                    className={styles.commentField}
                    labelClasses={styles.label}
                    value={boxFields.clientComment}
                    onChange={setFormField('clientComment')}
                  />

                  <Field
                    multiline
                    disabled
                    minRows={3}
                    maxRows={3}
                    label={t(TranslationKey['Storekeeper comment'])}
                    className={styles.commentField}
                    labelClasses={styles.label}
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
              className={styles.heightFieldAuto}
              minRows={3}
              maxRows={3}
              inputProps={{ maxLength: 1000 }}
              labelClasses={styles.commentLabel}
              tooltipAttentionContent={t(TranslationKey['A task will be created for the prep center'])}
              label={t(TranslationKey['Write a comment on the task'])}
              placeholder={t(TranslationKey['Client comment on the task'])}
              onChange={setFormField('clientTaskComment')}
            />
          </div>
        </div>

        <div className={styles.buttonsWrapper}>
          <Button
            disabled={disableSubmit}
            tooltipInfoContent={t(TranslationKey['Save changes to the box'])}
            onClick={() => onSubmit(formItem?._id, getBoxDataToSubmit(), formItem, priority, priorityReason)}
          >
            {t(TranslationKey.Save)}
          </Button>

          <Button
            styleType={ButtonStyle.CASUAL}
            tooltipInfoContent={t(TranslationKey['Close the form without saving'])}
            onClick={onTriggerOpenModal}
          >
            {t(TranslationKey.Close)}
          </Button>
        </div>

        <Modal
          openModal={showSetShippingLabelModal}
          setOpenModal={() => setShowSetShippingLabelModal(!showSetShippingLabelModal)}
        >
          <SetShippingLabelModal
            tmpShippingLabel={boxFields.tmpShippingLabel}
            item={boxFields}
            requestStatus={requestStatus}
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
            tariffModalType={TariffModal.WAREHOUSE}
            openModal={showSelectionStorekeeperAndTariffModal}
            setOpenModal={() => setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)}
            box={boxFields}
            onClickSubmit={onSubmitSelectStorekeeperAndTariff}
          />
        ) : null}

        <Modal openModal={showSetBarcodeModal} setOpenModal={() => setShowSetBarcodeModal(!showSetBarcodeModal)}>
          <SetBarcodeModal
            tmpCode={curProductToEditBarcode?.tmpBarCode}
            barCode={curProductToEditBarcode?.barCode}
            onClickSaveBarcode={data => onClickSaveBarcode(curProductToEditBarcode)(data)}
            onCloseModal={() => setShowSetBarcodeModal(!showSetBarcodeModal)}
          />
        </Modal>

        <Modal openModal={showSetFilesModal} setOpenModal={setShowSetFilesModal}>
          <SetFilesModal
            modalTitle={t(TranslationKey.Transparency)}
            LabelTitle={t(TranslationKey['Transparency codes'])}
            currentFiles={filesConditions.currentFiles}
            tmpFiles={filesConditions.tmpFiles}
            onClickSave={value => onClickSaveTransparencyFile(value, filesConditions.index)}
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

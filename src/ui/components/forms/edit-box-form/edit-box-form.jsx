import { cx } from '@emotion/css'
import { memo, useEffect, useState } from 'react'

import { Checkbox, Divider, Typography } from '@mui/material'

import { unitsOfChangeOptions } from '@constants/configs/sizes-settings'
import { tariffTypes } from '@constants/keys/tariff-types'
import { BoxStatus } from '@constants/statuses/box-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TaskPriorityStatus, mapTaskPriorityStatusEnumToKey } from '@constants/task/task-priority-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChangeChipCell } from '@components/data-grid/data-grid-cells/data-grid-cells'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { ImageModal } from '@components/modals/image-modal/image-modal'
import { SetBarcodeModal } from '@components/modals/set-barcode-modal'
import { SetShippingLabelModal } from '@components/modals/set-shipping-label-modal'
import { BoxEdit } from '@components/shared/boxes/box-edit'
import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value'
import { CustomSlider } from '@components/shared/custom-slider'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Field } from '@components/shared/field'
import { Input } from '@components/shared/input'
import { Modal } from '@components/shared/modal'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'
import { PriorityForm } from '@components/shared/priority-form/priority-form'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'
import { Text } from '@components/shared/text'

import { calcFinalWeightForBox, calcVolumeWeightForBox } from '@utils/calculation'
import { t } from '@utils/translations'

import { useGetDestinationTariffInfo } from '@hooks/use-get-destination-tariff-info'

import { useStyles } from './edit-box-form.style'

import { SelectStorekeeperAndTariffForm } from '../select-storkeeper-and-tariff-form'

import { WarehouseDemensions } from './warehouse-demensions/warehouse-demensions'

export const EditBoxForm = memo(
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
    const { classes: styles } = useStyles()
    const [priority, setPriority] = useState()
    const [priorityReason, setPriorityReason] = useState()
    const [showSetShippingLabelModal, setShowSetShippingLabelModal] = useState(false)
    const [showPhotosModal, setShowPhotosModal] = useState(false)
    const [bigImagesOptions, setBigImagesOptions] = useState({ images: [], imgIndex: 0 })
    const [curProductToEditBarcode, setCurProductToEditBarcode] = useState(undefined)

    const [showSetBarcodeModal, setShowSetBarcodeModal] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [confirmModalSettings, setConfirmModalSettings] = useState(undefined)

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
        item.product._id === productId
          ? { ...item, barCode: '', tmpBarCode: [''], changeBarCodInInventory: false }
          : item,
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
            setBoxFields({ ...boxFields, storekeeperId, logicsTariffId: tariffId, variationTariffId, destinationId })
            setDestinationId(destinationId)

            setShowConfirmModal(false)
            setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)
          },

          onClickCancelBtn: () => {
            setBoxFields({
              ...boxFields,
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
        setBoxFields({ ...boxFields, storekeeperId, logicsTariffId: tariffId, variationTariffId })
        setDestinationId(destinationId)
        setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)
      }
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

    const { tariffName, tariffRate, currentTariff } = useGetDestinationTariffInfo(
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
                    {boxFields.items.map((item, index) => (
                      <div key={index} className={styles.productWrapper}>
                        <div className={styles.leftProductColumn}>
                          <div className={styles.photoWrapper}>
                            <PhotoAndFilesSlider withoutFiles files={item.product.images} />
                          </div>

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
                                  text={!item.barCode && !item?.tmpBarCode?.length && t(TranslationKey['Set Barcode'])}
                                  value={item?.tmpBarCode?.[0]?.file?.name || item?.tmpBarCode?.[0] || item.barCode}
                                  onClickChip={() => onClickBarcode(item)}
                                  onDoubleClickChip={() => onDoubleClickBarcode(item)}
                                  onDeleteChip={() => onDeleteBarcode(item.product._id)}
                                />
                              }
                            />

                            {item.tmpBarCode.length ? (
                              <Field
                                oneLine
                                labelClasses={styles.standartLabel}
                                containerClasses={styles.checkboxContainer}
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
                              <Typography className={styles.noBarCodeGlued}>
                                {t(TranslationKey['Not glued!'])}
                              </Typography>
                            ) : (
                              <div>
                                {item.isBarCodeAlreadyAttachedByTheSupplier ? (
                                  <Field
                                    oneLine
                                    labelClasses={styles.standartLabel}
                                    tooltipInfoContent={t(
                                      TranslationKey['The supplier has glued the barcode before shipment'],
                                    )}
                                    containerClasses={styles.checkboxContainer}
                                    label={t(TranslationKey['The barcode is glued by the supplier'])}
                                    inputComponent={
                                      <Checkbox disabled checked={item.isBarCodeAlreadyAttachedByTheSupplier} />
                                    }
                                  />
                                ) : (
                                  <Field
                                    oneLine
                                    labelClasses={styles.standartLabel}
                                    tooltipInfoContent={t(
                                      TranslationKey[
                                        'The barcode was glued on when the box was accepted at the prep center'
                                      ],
                                    )}
                                    containerClasses={styles.checkboxContainer}
                                    label={t(TranslationKey['The barcode is glued by the Storekeeper'])}
                                    inputComponent={
                                      <Checkbox disabled checked={item.isBarCodeAttachedByTheStorekeeper} />
                                    }
                                  />
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className={styles.rightProductColumn}>
                          <Typography className={styles.amazonTitle}>{item.product.amazonTitle}</Typography>

                          <Field
                            oneLine
                            containerClasses={styles.field}
                            labelClasses={styles.standartLabel}
                            label={`${t(TranslationKey.ASIN)}:`}
                            inputComponent={
                              <div className={styles.asinTextWrapper}>
                                <Typography className={styles.asinText}>{item.product.asin}</Typography>{' '}
                                {item.product.asin && <CopyValue text={item.product.asin} />}
                              </div>
                            }
                          />

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
                    ))}
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
                            boxFields.logicsTariffId &&
                            currentTariff?.tariffType === tariffTypes.WEIGHT_BASED_LOGISTICS_TARIFF
                              ? destinations.filter(
                                  el => el?._id === (destinationId || formItem?.variationTariff?.destinationId),
                                )
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
                      labelClasses={styles.standartLabel}
                      containerClasses={styles.field}
                      label={`${t(TranslationKey['Int warehouse'])} / ${t(TranslationKey.Tariff)}`}
                      tooltipInfoContent={t(TranslationKey['Prep Center in China, available for change'])}
                      error={!tariffName && t(TranslationKey['The tariff is invalid or has been removed!'])}
                      inputComponent={
                        <Button
                          disableElevation
                          color="primary"
                          // disabled={!boxFields.storekeeperId}
                          className={cx({
                            [styles.storekeeperBtn]: !boxFields.storekeeperId,
                          })}
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

                  <div>
                    <CustomSwitcher
                      condition={sizeSetting}
                      switcherSettings={[
                        { label: () => unitsOfChangeOptions.EU, value: unitsOfChangeOptions.EU },
                        { label: () => unitsOfChangeOptions.US, value: unitsOfChangeOptions.US },
                      ]}
                      changeConditionHandler={condition => setSizeSetting(condition)}
                    />
                  </div>
                </div>

                <WarehouseDemensions orderBox={boxFields} sizeSetting={sizeSetting} />

                <div className={styles.boxPhotoWrapper}>
                  <Typography className={styles.standartLabel}>
                    {t(TranslationKey['Photos of the box taken at the warehouse:'])}
                  </Typography>
                  <PhotoAndFilesSlider withoutFiles files={boxFields.images} />
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
            className={styles.button}
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
            className={cx(styles.button, styles.cancelBtn)}
            variant="text"
            onClick={onTriggerOpenModal}
          >
            {t(TranslationKey.Cancel)}
          </Button>
        </div>

        {showPhotosModal && (
          <ImageModal
            isOpenModal={showPhotosModal}
            handleOpenModal={() => setShowPhotosModal(!showPhotosModal)}
            files={bigImagesOptions.images}
            currentFileIndex={bigImagesOptions.imgIndex}
            handleCurrentFileIndex={imgIndex => setBigImagesOptions(() => ({ ...bigImagesOptions, imgIndex }))}
          />
        )}

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
            RemoveDestinationRestriction
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

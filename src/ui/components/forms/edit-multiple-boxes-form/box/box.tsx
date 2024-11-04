/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo, useEffect, useState } from 'react'
import { MdArrowDropDown, MdArrowDropUp, MdDeleteOutline } from 'react-icons/md'

import { IconButton } from '@mui/material'

import { tariffTypes } from '@constants/keys/tariff-types'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChangeChipCell } from '@components/data-grid/data-grid-cells'
import { SetFileForm } from '@components/forms/set-file-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { SetBarcodeModal } from '@components/modals/set-barcode-modal'
import { SetFilesModal } from '@components/modals/set-files-modal'
import { SupplierApproximateCalculationsModal } from '@components/modals/supplier-approximate-calculations'
import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { Button } from '@components/shared/button'
import { CustomCheckbox } from '@components/shared/custom-checkbox'
import { Field } from '@components/shared/field'
import { Modal } from '@components/shared/modal'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { TariffModal } from '@typings/enums/tariff-modal'
import { isStorekeeper } from '@typings/guards/roles'
import { IDestination, IDestinationStorekeeper } from '@typings/shared/destinations'

import { useGetDestinationTariffInfo } from '@hooks/use-get-destination-tariff-info'
import { useTariffVariation } from '@hooks/use-tariff-variation'

import { useStyles } from './box.style'

interface BoxProps {
  showCheckbox?: boolean
  userInfo: any
  newBoxes: any
  box: any
  destinations: IDestination[]
  storekeepers: IDestinationStorekeeper[]
  destinationsFavourites?: any
  onRemoveBox: (boxIndex: string) => void
  setNewBoxes: (newBoxes: any) => void
  setDestinationsFavouritesItem: (destinationId: string) => void
  onChangeField: (e: any, field: string, boxId: string, itemIndex?: number) => void
}

export const Box: FC<BoxProps> = memo(props => {
  const { classes: styles, cx } = useStyles()
  const {
    userInfo,
    destinations,
    storekeepers,
    box,
    newBoxes,
    destinationsFavourites,
    setNewBoxes,
    onChangeField,
    onRemoveBox,
    setDestinationsFavouritesItem,
  } = props

  const [showSetShippingLabelModal, setShowSetShippingLabelModal] = useState(false)
  const [showSetBarcodeModal, setShowSetBarcodeModal] = useState(false)

  const [curProductToEditBarcode, setCurProductToEditBarcode] = useState<any>(null)

  const [showSetFilesModal, setShowSetFilesModal] = useState(false)
  const [filesConditions, setFilesConditions] = useState<{
    tmpFiles: any
    currentFiles: any
    index: number
  }>({
    tmpFiles: [],
    currentFiles: '',
    index: 0,
  })

  const onClickBarcode = (item: any) => {
    setCurProductToEditBarcode(item)
    setShowSetBarcodeModal(!showSetBarcodeModal)
  }

  const setBoxBody = (prevData: any) => (newData: any) => onChangeField(newData(prevData), 'part', box._id)

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
  } = useTariffVariation(box.destinationId, setBoxBody(box))

  const isMasterBox = box.amount && box.amount > 1

  const [showFullCard, setShowFullCard] = useState(true)

  const onClickSaveBarcode = (product: any) => (value: any) => {
    const targetBox = newBoxes.filter((newBox: any) => newBox._id === box._id)[0]
    const newFormFields = { ...targetBox }
    newFormFields.items = [
      ...targetBox.items.map((el: any) => (el.product._id === product.product._id ? { ...el, tmpBarCode: value } : el)),
    ]
    const updatedNewBoxes = newBoxes.map((newBox: any) => (newBox._id === box._id ? newFormFields : newBox))
    setNewBoxes(updatedNewBoxes)
    setShowSetBarcodeModal(!showSetBarcodeModal)
  }

  const onChangeBarcodeGlued = (product: any, field: any) => (value: any) => {
    const targetBox = newBoxes.filter((newBox: any) => newBox._id === box._id)[0]
    const newFormFields = { ...targetBox }
    if (field === 'isBarCodeAttachedByTheStorekeeper' && value) {
      newFormFields.items = targetBox.items.map((el: any) =>
        el.product._id === product.product._id
          ? { ...el, [field]: value, isBarCodeAlreadyAttachedByTheSupplier: false }
          : el,
      )
    } else if (field === 'isBarCodeAlreadyAttachedByTheSupplier' && value) {
      newFormFields.items = targetBox.items.map((el: any) =>
        el.product._id === product.product._id
          ? { ...el, [field]: value, isBarCodeAttachedByTheStorekeeper: false }
          : el,
      )
    } else if (field === 'isTransparencyFileAlreadyAttachedByTheSupplier' && value) {
      newFormFields.items = targetBox.items.map((el: any) =>
        el.product._id === product.product._id
          ? { ...el, [field]: value, isTransparencyFileAttachedByTheStorekeeper: false }
          : el,
      )
    } else if (field === 'isTransparencyFileAttachedByTheStorekeeper' && value) {
      newFormFields.items = targetBox.items.map((el: any) =>
        el.product._id === product.product._id
          ? { ...el, [field]: value, isTransparencyFileAlreadyAttachedByTheSupplier: false }
          : el,
      )
    } else {
      newFormFields.items = [
        ...targetBox.items.map((el: any) => (el.product._id === product.product._id ? { ...el, [field]: value } : el)),
      ]
    }
    const updatedNewBoxes = newBoxes.map((newBox: any) => (newBox._id === box._id ? newFormFields : newBox))
    setNewBoxes(updatedNewBoxes)
  }

  const onClickShippingLabel = () => {
    setShowSetShippingLabelModal(!showSetShippingLabelModal)
  }
  const setShippingLabel = (value: any) => {
    onChangeField({ target: { value } }, 'tmpShippingLabel', box._id)
    setShowSetShippingLabelModal(!showSetShippingLabelModal)
  }
  const onDeleteShippingLabel = () => {
    onChangeField({ target: { value: '' } }, 'shippingLabel', box._id)
    onChangeField({ target: { value: [] } }, 'tmpShippingLabel', box._id)
  }

  const onDeleteBarcode = (value: any, index: number) => {
    onChangeField(value, 'items', box._id, index)
  }

  const onSaveTransparencyFile = (value: any, index: number) => {
    onChangeField(value, 'items', box._id, index)
  }

  const curDestination = destinations.find(el => el._id === box.destinationId)
  const currentStorekeeper = storekeepers.find(el => el._id === box.storekeeperId)
  const currentLogicsTariff = currentStorekeeper?.tariffLogistics.find(el => el._id === box.logicsTariffId)

  const selectedVariationTariff = currentLogicsTariff?.destinationVariations?.find(
    el => el._id === box?.variationTariffId,
  )

  const { tariffName, tariffRate } = useGetDestinationTariffInfo(
    destinations,
    storekeepers,
    box.destinationId,
    box.storekeeperId,
    box.logicsTariffId,
    box.variationTariffId,
  )

  const isSameDestination = selectedVariationTariff?.destination?._id === curDestination?._id
  const isShippingLabelMissing = (item: any) => !item.tmpShippingLabel.length && !item.shippingLabel
  const isBarCodeMissing = (item: any) => !item.tmpBarCode.length && !item.barCode
  const isTransparencyFileMissing = (item: any) => !item?.tmpTransparencyFile?.length && !item?.transparencyFile

  useEffect(() => {
    if (box?.variationTariffId) {
      onChangeField({ isSameDestination }, 'part', box._id)
    }
  }, [isSameDestination, box?.variationTariffId, box?._id])

  return (
    <div className={styles.box}>
      <div className={styles.itemWrapper}>
        <div className={styles.orderWrapper}>
          {box.items.map((order: any, orderIndex: number) => (
            <div key={`box_${box._id}_${orderIndex}`} className={styles.orderWrapper}>
              <div key={orderIndex} className={styles.order}>
                <img className={styles.img} src={getAmazonImageUrl(order.product?.images[0])} />
                <div>
                  <div className={styles.asinWrapper}>
                    <p className={styles.asinTitle}>{t(TranslationKey.Box)}</p>
                    <p className={styles.asinValue}>{box.xid}</p>
                  </div>

                  <AsinOrSkuLink withCopyValue withAttributeTitle="asin" link={order.product.asin} />
                  <AsinOrSkuLink withCopyValue withAttributeTitle="sku" link={order.product.skuByClient} />

                  <p className={styles.title}>{order.product.amazonTitle}</p>

                  <Field
                    labelClasses={styles.label}
                    label={t(TranslationKey.BarCode)}
                    inputComponent={
                      <ChangeChipCell
                        isChipOutTable
                        text={!order.tmpBarCode?.length && !order.barCode ? t(TranslationKey['Set Barcode']) : ''}
                        value={order.tmpBarCode?.[0]?.file?.name || order.tmpBarCode?.[0] || order.barCode}
                        onClickChip={() => onClickBarcode(order)}
                        onDeleteChip={() => onDeleteBarcode({ ...order, tmpBarCode: [], barCode: '' }, orderIndex)}
                      />
                    }
                  />

                  <Field
                    labelClasses={styles.label}
                    label="Transparency Codes"
                    inputComponent={
                      <ChangeChipCell
                        isChipOutTable
                        disabled={isStorekeeper(userInfo.role)}
                        text={
                          !order?.tmpTransparencyFile?.length && !order?.transparencyFile
                            ? t(TranslationKey.Transparency)
                            : ''
                        }
                        value={
                          order?.tmpTransparencyFile?.[0]?.file?.name ||
                          order?.tmpTransparencyFile?.[0] ||
                          order?.transparencyFile
                        }
                        onClickChip={() => {
                          setShowSetFilesModal(true)
                          setFilesConditions({
                            tmpFiles: order?.tmpTransparencyFile,
                            currentFiles: order?.transparencyFile,
                            index: orderIndex,
                          })
                        }}
                        onDeleteChip={() =>
                          onDeleteBarcode({ ...order, tmpTransparencyFile: [], transparencyFile: '' }, orderIndex)
                        }
                      />
                    }
                  />

                  {isStorekeeper(userInfo.role) ? (
                    <div>
                      <CustomCheckbox
                        isRow
                        disabled={isBarCodeMissing(order)}
                        label="The barcode is glued by the supplier"
                        labelClassName={styles.label}
                        wrapperClassName={styles.checkboxContainer}
                        tooltipLabel="The supplier has glued the barcode before shipment"
                        checked={order.isBarCodeAlreadyAttachedByTheSupplier}
                        onClick={() =>
                          onChangeBarcodeGlued(
                            order,
                            'isBarCodeAlreadyAttachedByTheSupplier',
                          )(!order.isBarCodeAlreadyAttachedByTheSupplier)
                        }
                      />
                      <CustomCheckbox
                        isRow
                        disabled={isBarCodeMissing(order)}
                        label="The barcode is glued by the Storekeeper"
                        labelClassName={styles.label}
                        wrapperClassName={styles.checkboxContainer}
                        tooltipLabel="The barcode was glued on when the box was accepted at the prep center"
                        checked={order.isBarCodeAttachedByTheStorekeeper}
                        onClick={() =>
                          onChangeBarcodeGlued(
                            order,
                            'isBarCodeAttachedByTheStorekeeper',
                          )(!order.isBarCodeAttachedByTheStorekeeper)
                        }
                      />
                      <CustomCheckbox
                        isRow
                        disabled={isTransparencyFileMissing(order)}
                        label="Transparency Codes glued by the supplier"
                        labelClassName={styles.label}
                        wrapperClassName={styles.checkboxContainer}
                        checked={order.isTransparencyFileAlreadyAttachedByTheSupplier}
                        onChange={e =>
                          onChangeBarcodeGlued(
                            order,
                            'isTransparencyFileAlreadyAttachedByTheSupplier',
                          )(e.target.checked)
                        }
                      />

                      <CustomCheckbox
                        isRow
                        disabled={isTransparencyFileMissing(order)}
                        label="Transparency Codes are glued by storekeeper"
                        labelClassName={styles.label}
                        wrapperClassName={styles.checkboxContainer}
                        checked={order.isTransparencyFileAttachedByTheStorekeeper}
                        onChange={e =>
                          onChangeBarcodeGlued(order, 'isTransparencyFileAttachedByTheStorekeeper')(e.target.checked)
                        }
                      />
                    </div>
                  ) : null}
                </div>

                <div>
                  <Field
                    disabled
                    label={t(TranslationKey.Quantity)}
                    className={styles.orderInput}
                    labelClasses={styles.label}
                    value={order.amount}
                    tooltipInfoContent={t(TranslationKey['Number of product units in the box'])}
                  />

                  {isMasterBox ? <p className={styles.superBox}>{`SB x ${box.amount}`}</p> : null}
                </div>
              </div>
              {isMasterBox ? (
                <p className={styles.subTitle}>{`${t(TranslationKey['Units in a box'])} ${box.items[0].amount}`}</p>
              ) : null}
            </div>
          ))}
          {showFullCard ? (
            <div className={styles.itemSubWrapper}>
              <Field
                error={!box.isSameDestination && t(TranslationKey['Incorrect destination or tariff'])}
                tooltipInfoContent={t(TranslationKey["Amazon's final warehouse in the USA, available for change"])}
                label={t(TranslationKey.Destination)}
                labelClasses={styles.label}
                inputComponent={
                  <WithSearchSelect
                    // @ts-ignore
                    width={230}
                    favourites={destinationsFavourites}
                    selectedItemName={
                      destinations.find(el => el._id === box.destinationId)?.name || t(TranslationKey['Not chosen'])
                    }
                    data={
                      box.variationTariffId &&
                      currentLogicsTariff?.tariffType === tariffTypes.WEIGHT_BASED_LOGISTICS_TARIFF
                        ? destinations.filter(el => el?._id === (destinationId || box?.variationTariff?.destinationId))
                        : destinations.filter(el => el?.storekeeper?._id !== box?.storekeeperId)
                    }
                    searchFields={['name']}
                    onClickNotChosen={handleResetDestination}
                    onClickSelect={(el: IDestination) => handleSetDestination(el._id)}
                    onClickSetDestinationFavourite={setDestinationsFavouritesItem}
                  />
                }
              />

              <Field
                tooltipInfoContent={t(TranslationKey['Prep Center in China, available for change'])}
                label={`${t(TranslationKey['Int warehouse'])} / ` + t(TranslationKey.Tariff)}
                labelClasses={styles.label}
                inputComponent={
                  <Button
                    onClick={() => setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)}
                  >
                    {box.logicsTariffId
                      ? `${box.logicsTariffId ? `${tariffName}${tariffRate ? ' / ' + tariffRate + ' $' : ''}` : 'none'}`
                      : t(TranslationKey.Select)}
                  </Button>
                }
              />

              <Field
                // @ts-ignore
                inputProps={{ maxLength: 255 }}
                tooltipInfoContent={t(TranslationKey['Enter or edit FBA Shipment'])}
                labelClasses={styles.label}
                inputClasses={cx(styles.fieldInput, {
                  [styles.inputAccent]:
                    (box.shippingLabel || box.tmpShippingLabel?.length) &&
                    !box.fbaShipment &&
                    !curDestination?.storekeeper,
                })}
                label="FBA Shipment"
                value={box.fbaShipment}
                // @ts-ignore
                onChange={e => onChangeField(e, 'fbaShipment', box._id)}
              />

              <Field
                label="Shipping label:"
                tooltipInfoContent={t(TranslationKey['Add or replace the shipping label'])}
                labelClasses={styles.label}
                inputComponent={
                  <ChangeChipCell
                    isChipOutTable
                    text={isShippingLabelMissing(box) ? t(TranslationKey['Set Shipping Label']) : ''}
                    value={box?.tmpShippingLabel?.[0]?.file?.name || box?.tmpShippingLabel?.[0] || box.shippingLabel}
                    onClickChip={onClickShippingLabel}
                    onDeleteChip={isShippingLabelMissing(box) ? undefined : () => onDeleteShippingLabel()}
                  />
                }
              />

              {isStorekeeper(userInfo.role) ? (
                <CustomCheckbox
                  isRow
                  disabled={isShippingLabelMissing(box)}
                  label="Shipping label was glued to the warehouse"
                  labelClassName={styles.label}
                  wrapperClassName={styles.checkboxContainer}
                  checked={box.isShippingLabelAttachedByStorekeeper}
                  onChange={e => onChangeField(e, 'isShippingLabelAttachedByStorekeeper', box._id)}
                />
              ) : null}
            </div>
          ) : null}

          <div className={styles.bottomBlockWrapper}>
            <IconButton classes={{ root: styles.icon }} onClick={() => onRemoveBox(box._id)}>
              <MdDeleteOutline size={24} className={styles.deleteBtn} />
            </IconButton>
            <div className={styles.incomingBtnWrapper}>
              <div className={styles.tablePanelSortWrapper} onClick={() => setShowFullCard(!showFullCard)}>
                <p className={styles.tablePanelViewText}>
                  {showFullCard ? t(TranslationKey.Hide) : t(TranslationKey.Details)}
                </p>

                {!showFullCard ? (
                  <MdArrowDropDown size={22} className={styles.blue} />
                ) : (
                  <MdArrowDropUp size={22} className={styles.blue} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        openModal={showSetShippingLabelModal}
        setOpenModal={() => setShowSetShippingLabelModal(!showSetShippingLabelModal)}
      >
        <SetFileForm
          data={box?.shippingLabel}
          onSubmit={setShippingLabel}
          onClose={() => setShowSetShippingLabelModal(!showSetShippingLabelModal)}
        />
      </Modal>

      {showSelectionStorekeeperAndTariffModal ? (
        <SupplierApproximateCalculationsModal
          isTariffsSelect
          tariffModalType={TariffModal.WAREHOUSE}
          openModal={showSelectionStorekeeperAndTariffModal}
          setOpenModal={() => setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)}
          box={box}
          onClickSubmit={onSubmitSelectStorekeeperAndTariff}
        />
      ) : null}

      <Modal openModal={showSetBarcodeModal} setOpenModal={() => setShowSetBarcodeModal(!showSetBarcodeModal)}>
        <SetBarcodeModal
          // @ts-ignore
          tmpCode={curProductToEditBarcode?.tmpBarCode}
          barCode={curProductToEditBarcode?.barCode}
          onClickSaveBarcode={(data: any) => onClickSaveBarcode(curProductToEditBarcode)(data)}
          onCloseModal={() => setShowSetBarcodeModal(!showSetBarcodeModal)}
        />
      </Modal>

      <Modal openModal={showSetFilesModal} setOpenModal={setShowSetFilesModal}>
        <SetFilesModal
          modalTitle={t(TranslationKey.Transparency)}
          LabelTitle="Transparency Codes"
          currentFiles={filesConditions.currentFiles}
          tmpFiles={filesConditions.tmpFiles}
          onClickSave={value => {
            onSaveTransparencyFile(
              { ...box.items[filesConditions.index], tmpTransparencyFile: value },
              filesConditions.index,
            )
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
})

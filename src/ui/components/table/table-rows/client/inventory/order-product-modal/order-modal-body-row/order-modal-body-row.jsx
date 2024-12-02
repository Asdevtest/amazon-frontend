import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { BsFillBoxSeamFill } from 'react-icons/bs'
import { MdOutlineDelete } from 'react-icons/md'

import { IconButton, TableCell, TableRow } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChangeChipCell, ProductCell, StringListCell } from '@components/data-grid/data-grid-cells'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { DeadlineForm } from '@components/modals/order-product-modal/deadline-form/deadline-form'
import { SupplierApproximateCalculationsModal } from '@components/modals/supplier-approximate-calculations'
import { CustomButton } from '@components/shared/custom-button'
import { CustomCheckbox } from '@components/shared/custom-checkbox'
import { CustomDatePicker } from '@components/shared/custom-date-picker'
import { CustomInput } from '@components/shared/custom-input'
import { Field } from '@components/shared/field/field'
import { Input } from '@components/shared/input'
import { Modal } from '@components/shared/modal'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'
import { TruckIcon } from '@components/shared/svg-icons'

import { calcProductsPriceWithDelivery } from '@utils/calculation'
import { toFixed, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import '@typings/enums/button-style'
import { TariffModal } from '@typings/enums/tariff-modal'

import { useGetDestinationTariffInfo } from '@hooks/use-get-destination-tariff-info'
import { useTariffVariation } from '@hooks/use-tariff-variation'

import { useStyles } from './order-modal-body-row.style'

export const OrderModalBodyRow = ({
  platformSettings,
  destinations,
  storekeepers,
  item,
  itemIndex,
  isPendingOrder,
  setOrderStateFiled,
  onClickBarcode,
  onClickExpressChinaDelivery,
  onDoubleClickBarcode,
  onClickPriority,
  onDeleteBarcode,
  orderState,
  onRemoveProduct,
  withRemove,
  destinationsFavourites,
  onClickSetDestinationFavourite,
  onClickTransparency,
}) => {
  const { classes: styles, cx } = useStyles()

  const [isLocalPriseOutOfLimit, setIsLocalPriseOutOfLimit] = useState(false)
  const [pricePerUnit, setPerPriceUnit] = useState(null)

  const priceVariations = item?.currentSupplierCard?.priceVariations

  const { tariffName, tariffRate, tariffDestination } = useGetDestinationTariffInfo(
    destinations,
    storekeepers,
    item.destinationId,
    item.storekeeperId,
    item.logicsTariffId,
    item.variationTariffId,
  )

  const weightOfOneBox = item.currentSupplierCard
    ? Math.max(
        Math.round(
          (((item.currentSupplierCard?.boxProperties?.boxWidthCm || 0) *
            (item.currentSupplierCard?.boxProperties?.boxLengthCm || 0) *
            (item.currentSupplierCard?.boxProperties?.boxHeightCm || 0)) /
            platformSettings?.volumeWeightCoefficient) *
            100,
        ) / 100 || 0,
        item.currentSupplierCard?.boxProperties?.boxWeighGrossKg,
      ) / item.currentSupplierCard?.boxProperties?.amountInBox
    : ''

  const weightOfBatch = weightOfOneBox * orderState.amount || ''

  const costDeliveryOfBatch = weightOfBatch * tariffRate || ''

  const onChangeInput = (event, nameInput) => {
    if (nameInput === 'deadline') {
      const transformedDate = event ? dayjs(event).format() : event

      setOrderStateFiled(nameInput)(transformedDate)
    } else if (nameInput === 'tariff') {
      setOrderStateFiled(nameInput)(event)
    } else {
      setOrderStateFiled(nameInput)(event.target.value)
    }
  }

  const setBoxBody = prevData => newData => onChangeInput(newData(prevData), 'tariff')

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
  } = useTariffVariation(item.destinationId, setBoxBody(item))

  useEffect(() => {
    if (toFixed(calcProductsPriceWithDelivery(item, orderState), 2) < platformSettings?.orderAmountLimit) {
      setIsLocalPriseOutOfLimit(true)
    } else {
      setIsLocalPriseOutOfLimit(false)
    }
  }, [orderState.amount])

  useEffect(() => {
    if (orderState.amount > 0 && costDeliveryOfBatch) {
      setPerPriceUnit(
        toFixed(
          (+toFixed(costDeliveryOfBatch, 2) + +toFixed(calcProductsPriceWithDelivery(item, orderState), 2)) /
            +orderState.amount,
          2,
        ),
      )
    } else {
      setPerPriceUnit(t(TranslationKey['No data']))
    }
  }, [costDeliveryOfBatch, item, orderState, orderState.amount])

  useEffect(() => {
    if (item.mainTariffVariation) {
      item.destinationId = item.mainTariffVariation.destination._id
      item.storekeeperId = item.mainTariffVariation?.storekeeperTariffLogistics.storekeeperId
      item.logicsTariffId = item.mainTariffVariation?.storekeeperTariffLogistics._id
      item.variationTariffId = item.mainTariffVariation._id
    }
  }, [])

  const productionTerm = item.currentSupplierCard
    ? `${item.currentSupplierCard?.minProductionTerm} - ${item.currentSupplierCard?.maxProductionTerm}`
    : t(TranslationKey['No data'])

  const [boxQuantity, setBoxQuantity] = useState(item?.valueForOrder || 0)

  useEffect(() => {
    const dinamicBoxQuantity = toFixed(
      orderState?.amount / (item?.currentSupplierCard?.boxProperties?.amountInBox || 1),
      1,
    )

    setBoxQuantity(dinamicBoxQuantity)
  }, [orderState?.amount])

  const quantityInputSuffix =
    boxQuantity > 0 ? (
      <>
        <BsFillBoxSeamFill className={styles.boxGray} />
        <span className={styles.boxGray}>{boxQuantity}</span>
      </>
    ) : (
      <></> // without layout, the input loses focus as the suffix redraws.
    )

  const [showDeadlineModal, setShowDeadlineModal] = useState(false)

  const tariffForRender = (
    <p className={styles.tariffText}>
      <span>{tariffName}</span> / <span>{tariffDestination?.destination?.name}</span> / <span>{tariffRate}</span>
    </p>
  )
  return (
    <>
      <TableRow
        key={item._id}
        hover
        role="checkbox"
        className={cx(styles.row, { [styles.noCurrentSupplier]: !item.currentSupplierCard })}
      >
        <TableCell className={cx(styles.cell, styles.productCell)}>
          <ProductCell image={item.images[0]} title={item.amazonTitle} asin={item.asin} sku={item.skuByClient} />
          {!item.currentSupplierCard && (
            <p className={styles.warningText}>{t(TranslationKey['No supplier selected!'])}</p>
          )}
        </TableCell>

        <TableCell className={styles.cell}>
          <p>{item.currentSupplierCard ? toFixed(item.currentSupplierCard?.priceInUsd, 2) : <span>—</span>}</p>
        </TableCell>

        <TableCell className={styles.cell}>
          <p>
            {item.currentSupplierCard ? (
              toFixed(item.currentSupplierCard?.batchDeliveryCostInDollar / item.currentSupplierCard?.amount, 2)
            ) : (
              <span>—</span>
            )}
          </p>
        </TableCell>

        <TableCell className={styles.cell}>
          <CustomInput
            fullWidth
            maxLength={6}
            value={orderState.amount}
            suffix={quantityInputSuffix}
            className={styles.inputQuantity}
            onChange={e => onChangeInput(e, 'amount')}
          />
          <span className={styles.warningText}>
            {item.currentSupplierCard?.multiplicity &&
              item.currentSupplierCard?.boxProperties?.amountInBox &&
              (orderState.amount % item.currentSupplierCard?.boxProperties?.amountInBox !== 0 || !orderState.amount) &&
              ` ${t(TranslationKey['Not a multiple of'])} ${item.currentSupplierCard?.boxProperties?.amountInBox}`}
          </span>
          <span className={styles.textSuccess}>
            {item.currentSupplierCard?.multiplicity &&
              item.currentSupplierCard?.boxProperties?.amountInBox &&
              orderState.amount % item.currentSupplierCard?.boxProperties?.amountInBox === 0 &&
              !!orderState.amount &&
              ` ${t(TranslationKey['Value multiple of'])} ${item.currentSupplierCard?.boxProperties?.amountInBox}`}
          </span>
        </TableCell>

        <TableCell className={styles.cell}>
          <p className={cx({ [styles.errorSpace]: isLocalPriseOutOfLimit })}>
            {toFixed(calcProductsPriceWithDelivery(item, orderState), 2)}
          </p>
          {isLocalPriseOutOfLimit && (
            <p className={styles.warningText}>
              {t(TranslationKey['At least'])} {platformSettings?.orderAmountLimit}$
            </p>
          )}
        </TableCell>

        <TableCell className={styles.cell}>
          <div className={styles.priceVariationsCell}>
            {priceVariations?.length > 0 ? (
              <StringListCell
                data={priceVariations?.map(
                  el =>
                    `${el.quantity} ${t(TranslationKey['pcs.'])}. / ${toFixedWithDollarSign(
                      el?.price / platformSettings?.yuanToDollarRate,
                      2,
                    )} ${t(TranslationKey.Per).toLowerCase()} ${t(TranslationKey['pcs.'])}`,
                )}
              />
            ) : (
              <span>—</span>
            )}
          </div>
        </TableCell>

        <TableCell className={styles.cell}>
          <div className={styles.buttonWrapper}>
            <ChangeChipCell
              text={!orderState.barCode && !orderState.tmpBarCode.length && t(TranslationKey['Set Barcode'])}
              value={orderState.tmpBarCode?.[0]?.file?.name || orderState.tmpBarCode?.[0] || orderState.barCode}
              onClickChip={() => onClickBarcode(item, itemIndex)}
              onDoubleClickChip={() => onDoubleClickBarcode(item, itemIndex)}
              onDeleteChip={() => onDeleteBarcode(item, itemIndex)}
            />

            <ChangeChipCell
              text={
                !orderState.transparencyFile && !orderState.tmpTransparencyFile.length && t(TranslationKey.Transparency)
              }
              value={
                orderState.tmpTransparencyFile?.[0]?.file?.name ||
                orderState.tmpTransparencyFile?.[0] ||
                orderState.transparencyFile
              }
              onClickChip={() =>
                onClickTransparency({
                  tmpFiles: orderState.tmpTransparencyFile,
                  currentFiles: orderState.transparencyFile,
                  index: itemIndex,
                })
              }
              onDeleteChip={() => {
                setOrderStateFiled('transparencyFile')('')
                setOrderStateFiled('tmpTransparencyFile')([])
              }}
            />

            {orderState.transparency && !orderState.transparencyFile && !orderState.tmpTransparencyFile.length && (
              <p className={styles.warningText}>{t(TranslationKey['No Transparency Codes'])}</p>
            )}
          </div>
        </TableCell>

        <TableCell className={styles.cell}>
          <CustomButton
            type={item.logicsTariffId ? 'default' : 'primary'}
            onClick={() => setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)}
          >
            {item.logicsTariffId ? tariffForRender : t(TranslationKey.Select)}
          </CustomButton>
        </TableCell>

        <TableCell className={styles.cell}>
          <WithSearchSelect
            width={160}
            widthPopover={220}
            selectedItemName={
              destinations.find(el => el._id === item.destinationId)?.name || t(TranslationKey['Not chosen'])
            }
            data={
              item?.variationTariffId
                ? destinations.filter(el => el?._id === (destinationId || item?.variationTariff?.destinationId))
                : destinations
            }
            favourites={destinationsFavourites}
            searchFields={['name']}
            onClickSetDestinationFavourite={onClickSetDestinationFavourite}
            onClickNotChosen={handleResetDestination}
            onClickSelect={el => handleSetDestination(el?._id)}
          />
        </TableCell>

        <TableCell className={styles.cell}>
          <Input
            multiline
            minRows={3}
            maxRows={3}
            inputProps={{ maxLength: 500 }}
            className={styles.commentInput}
            value={item?.clientComment}
            classes={{ inputMultiline: styles.inputMultiline }}
            onChange={e => onChangeInput(e, 'clientComment')}
          />
        </TableCell>

        <TableCell className={styles.cell}>
          <CustomDatePicker
            inputReadOnly
            open={false}
            format="DD.MM.YYYY"
            status={isPendingOrder && !item.deadline && 'error'}
            value={item?.deadline ? dayjs(item.deadline) : null}
            onClick={() => setShowDeadlineModal(!showDeadlineModal)}
          />
        </TableCell>

        {withRemove && (
          <TableCell className={styles.deleteCell}>
            <IconButton onClick={() => onRemoveProduct(item._id)}>
              <MdOutlineDelete size={24} />
            </IconButton>
          </TableCell>
        )}

        {showSelectionStorekeeperAndTariffModal ? (
          <SupplierApproximateCalculationsModal
            isTariffsSelect
            isGetAllStorekeepers
            tariffModalType={TariffModal.ORDER}
            openModal={showSelectionStorekeeperAndTariffModal}
            setOpenModal={() => setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)}
            box={item}
            onClickSubmit={onSubmitSelectStorekeeperAndTariff}
          />
        ) : null}
      </TableRow>

      <TableRow key={item._id + `+`}>
        <TableCell colSpan={12}>
          <div className={styles.sumsWrapper}>
            <Field
              oneLine
              containerClasses={styles.containerField}
              labelClasses={styles.labelField}
              label={`${t(TranslationKey['Production time'])}, ${t(TranslationKey.days)}`}
              inputComponent={<p className={styles.sumText}>{productionTerm}</p>}
            />

            <Field
              oneLine
              containerClasses={styles.containerField}
              labelClasses={styles.labelField}
              label={`${t(TranslationKey['Minimum batch'])}, ${t(TranslationKey.units)}`}
              inputComponent={<p className={styles.sumText}>{item.currentSupplierCard?.minlot}</p>}
            />

            <Field
              oneLine
              containerClasses={styles.containerField}
              labelClasses={styles.labelField}
              label={t(TranslationKey['Weight 1 unit'])}
              inputComponent={
                <p className={styles.sumText}>{toFixed(weightOfOneBox, 2) || t(TranslationKey['No data'])}</p>
              }
            />

            <Field
              oneLine
              containerClasses={styles.containerField}
              labelClasses={styles.labelField}
              label={t(TranslationKey['Batch weight'])}
              inputComponent={
                <p className={styles.sumText}>{toFixed(weightOfBatch, 2) || t(TranslationKey['No data'])}</p>
              }
            />

            <Field
              oneLine
              containerClasses={styles.containerField}
              labelClasses={styles.labelField}
              label={t(TranslationKey['Batch delivery cost']) + ',$'}
              inputComponent={
                <p className={styles.sumText}>
                  {toFixed(item.currentSupplierCard?.batchDeliveryCostInDollar, 2) || t(TranslationKey['No data'])}
                </p>
              }
            />

            <Field
              oneLine
              containerClasses={styles.containerField}
              labelClasses={styles.labelField}
              label={t(TranslationKey['Cost per unit in the USA']) + ',$'}
              inputComponent={<p className={styles.sumText}>{pricePerUnit}</p>}
            />
          </div>
          <div className={styles.mainCheckboxWrapper}>
            <div className={styles.checkboxWrapper}>
              <div className={styles.expressWrapper} onClick={onClickPriority}>
                <CustomCheckbox
                  className={styles.checkbox}
                  labelClassName={styles.sumText}
                  checked={item.priority === '40'}
                >
                  Mark an order as urgent
                </CustomCheckbox>
                <img className={styles.deliveryImg} src="/assets/icons/fire.svg" alt="" />
              </div>
              <div className={styles.expressWrapper} onClick={onClickExpressChinaDelivery}>
                <CustomCheckbox className={styles.checkbox} checked={item.expressChinaDelivery} />
                <p className={styles.sumText}>{t(TranslationKey['Order express delivery in China'])}</p>
                <TruckIcon className={styles.deliveryImg} />
              </div>
            </div>
          </div>
        </TableCell>

        {showConfirmModal ? (
          <ConfirmationModal
            // @ts-ignore
            isWarning={confirmModalSettings?.isWarning}
            openModal={showConfirmModal}
            setOpenModal={() => setShowConfirmModal(prev => !prev)}
            title={t(TranslationKey.Attention)}
            message={confirmModalSettings?.confirmMessage}
            successBtnText={t(TranslationKey.Yes)}
            cancelBtnText={t(TranslationKey.No)}
            onClickSuccessBtn={confirmModalSettings?.onClickConfirm}
            onClickCancelBtn={confirmModalSettings?.onClickCancelBtn}
          />
        ) : null}

        <Modal openModal={showDeadlineModal} setOpenModal={setShowDeadlineModal}>
          <DeadlineForm
            selectedDeadline={item?.deadline ? dayjs(item.deadline) : null}
            maxProductionTerm={item?.currentSupplierCard?.maxProductionTerm}
            onSubmit={value => onChangeInput(value, 'deadline')}
            onClose={() => setShowDeadlineModal(false)}
          />
        </Modal>
      </TableRow>
    </>
  )
}

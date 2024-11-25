import { isValid } from 'date-fns'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { MdOutlineDelete } from 'react-icons/md'

import { IconButton, TableCell, TableRow } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChangeChipCell, ProductCell, StringListCell } from '@components/data-grid/data-grid-cells'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { SupplierApproximateCalculationsModal } from '@components/modals/supplier-approximate-calculations'
import { CustomButton } from '@components/shared/custom-button'
import { CustomCheckbox } from '@components/shared/custom-checkbox'
import { DatePicker } from '@components/shared/date-picker'
import { Field } from '@components/shared/field/field'
import { Input } from '@components/shared/input'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'
import { TruckIcon } from '@components/shared/svg-icons'

import { calcProductsPriceWithDelivery } from '@utils/calculation'
import { convertLocalDateToUTC } from '@utils/date-time'
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
  const minDate = new Date(dayjs().add(2, 'day'))
  const [deadline, setDeadline] = useState(item.deadline ? new Date(item.deadline) : item.deadline)

  const [pricePerUnit, setPerPriceUnit] = useState(null)

  const priceVariations = item?.currentSupplierCard?.priceVariations

  const { tariffName, tariffRate } = useGetDestinationTariffInfo(
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
          (((item.currentSupplierCard.boxProperties?.boxWidthCm || 0) *
            (item.currentSupplierCard.boxProperties?.boxLengthCm || 0) *
            (item.currentSupplierCard.boxProperties?.boxHeightCm || 0)) /
            platformSettings?.volumeWeightCoefficient) *
            100,
        ) / 100 || 0,
        item.currentSupplierCard.boxProperties?.boxWeighGrossKg,
      ) / item.currentSupplierCard.boxProperties?.amountInBox
    : ''

  const weightOfBatch = weightOfOneBox * orderState.amount || ''

  const costDeliveryOfBatch = weightOfBatch * tariffRate || ''

  const onChangeInput = (event, nameInput) => {
    if (nameInput === 'deadline') {
      let value

      if (isValid(event)) {
        value = new Date(convertLocalDateToUTC(new Date(event)))
      } else {
        value = null
      }

      setOrderStateFiled(nameInput)(value)
      setDeadline(value)
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

  const productionTerm = item.currentSupplierCard
    ? `${item.currentSupplierCard.minProductionTerm} - ${item.currentSupplierCard.maxProductionTerm}`
    : t(TranslationKey['No data'])

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
            <p className={styles.noCurrentSupplierText}>{t(TranslationKey['No supplier selected!'])}</p>
          )}
        </TableCell>

        <TableCell className={styles.cell}>
          <p className={styles.standartText}>
            {item.currentSupplierCard ? toFixed(item.currentSupplierCard?.priceInUsd, 2) : <span>—</span>}
          </p>
        </TableCell>

        <TableCell className={styles.cell}>
          <p className={styles.standartText}>
            {item.currentSupplierCard ? (
              toFixed(item.currentSupplierCard.batchDeliveryCostInDollar / item.currentSupplierCard.amount, 2)
            ) : (
              <span>—</span>
            )}
          </p>
        </TableCell>

        <TableCell className={styles.cell}>
          <Field
            containerClasses={cx(styles.containerField, styles.containerFieldCell)}
            inputClasses={styles.amountCell}
            error={
              item.currentSupplierCard?.multiplicity &&
              item.currentSupplierCard?.boxProperties?.amountInBox &&
              (orderState.amount % item.currentSupplierCard?.boxProperties?.amountInBox !== 0 || !orderState.amount) &&
              ` ${t(TranslationKey['Not a multiple of'])} ${item.currentSupplierCard.boxProperties?.amountInBox}`
            }
            successText={
              item.currentSupplierCard?.multiplicity &&
              item.currentSupplierCard?.boxProperties?.amountInBox &&
              orderState.amount % item.currentSupplierCard?.boxProperties?.amountInBox === 0 &&
              !!orderState.amount &&
              ` ${t(TranslationKey['Value multiple of'])} ${item.currentSupplierCard.boxProperties?.amountInBox}`
            }
            inputProps={{ maxLength: 6, min: 0 }}
            value={orderState.amount}
            onChange={e => {
              onChangeInput(e, 'amount')
            }}
          />
        </TableCell>

        <TableCell className={styles.cell}>
          <p className={cx(styles.standartText, { [styles.errorSpace]: isLocalPriseOutOfLimit })}>
            {toFixed(calcProductsPriceWithDelivery(item, orderState), 2)}
          </p>
          {isLocalPriseOutOfLimit && (
            <p className={styles.error}>
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
            block
            className={styles.button}
            type={item.logicsTariffId ? 'default' : 'primary'}
            onClick={() => setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)}
          >
            {item.logicsTariffId ? (
              <>
                <p>{tariffName}</p>
                <p>{tariffRate}</p>
              </>
            ) : (
              t(TranslationKey.Select)
            )}
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
          <div className={styles.datePickerWrapper}>
            <DatePicker
              disablePast
              error={isPendingOrder && !deadline}
              minDate={minDate}
              value={deadline}
              onChange={e => onChangeInput(e, 'deadline')}
            />
          </div>
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
                  {toFixed(item.currentSupplierCard.batchDeliveryCostInDollar, 2) || t(TranslationKey['No data'])}
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
      </TableRow>
    </>
  )
}

import { isValid } from 'date-fns'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

import DeleteIcon from '@material-ui/icons/Delete'
import { Checkbox, IconButton, TableCell, TableRow, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChangeChipCell, ProductAsinCell } from '@components/data-grid/data-grid-cells'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { SupplierApproximateCalculationsModal } from '@components/modals/supplier-approximate-calculations'
import { Button } from '@components/shared/button'
import { DatePicker } from '@components/shared/date-picker'
import { Field } from '@components/shared/field/field'
import { Input } from '@components/shared/input'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'
import { TruckIcon } from '@components/shared/svg-icons'

import { calcProductsPriceWithDelivery } from '@utils/calculation'
import { toFixed, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
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

  const priceVariations = item.currentSupplier?.priceVariations

  const { tariffName, tariffRate } = useGetDestinationTariffInfo(
    destinations,
    storekeepers,
    item.destinationId,
    item.storekeeperId,
    item.logicsTariffId,
    item.variationTariffId,
  )

  const weightOfOneBox = item.currentSupplier
    ? Math.max(
        Math.round(
          (((item.currentSupplier.boxProperties?.boxWidthCm || 0) *
            (item.currentSupplier.boxProperties?.boxLengthCm || 0) *
            (item.currentSupplier.boxProperties?.boxHeightCm || 0)) /
            platformSettings?.volumeWeightCoefficient) *
            100,
        ) / 100 || 0,
        item.currentSupplier.boxProperties?.boxWeighGrossKg,
      ) / item.currentSupplier.boxProperties?.amountInBox
    : ''

  const weightOfBatch = weightOfOneBox * orderState.amount || ''

  const costDeliveryOfBatch = weightOfBatch * tariffRate || ''

  const onChangeInput = (event, nameInput) => {
    if (nameInput === 'deadline') {
      setOrderStateFiled(nameInput)(isValid(event) ? event : null)
      setDeadline(isValid(event) ? event : null)
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

  const productionTerm = item.currentSupplier
    ? `${item.currentSupplier.minProductionTerm} - ${item.currentSupplier.maxProductionTerm}`
    : t(TranslationKey['No data'])

  return (
    <>
      <TableRow
        key={item._id}
        hover
        role="checkbox"
        className={cx(styles.row, { [styles.noCurrentSupplier]: !item.currentSupplier })}
      >
        <TableCell className={cx(styles.cell, styles.productCell)}>
          <ProductAsinCell
            image={item.images[0]}
            amazonTitle={item.amazonTitle}
            asin={item.asin}
            skuByClient={item.skuByClient}
          />

          {!item.currentSupplier && (
            <Typography className={styles.noCurrentSupplierText}>
              {t(TranslationKey['No supplier selected!'])}
            </Typography>
          )}
        </TableCell>

        <TableCell className={styles.cell}>
          <Typography className={styles.standartText}>
            {item.currentSupplier ? toFixed(item.currentSupplier.price, 2) : <span>—</span>}
          </Typography>
        </TableCell>

        <TableCell className={styles.cell}>
          <Typography className={styles.standartText}>
            {item.currentSupplier ? (
              toFixed(item.currentSupplier.batchDeliveryCostInDollar / item.currentSupplier.amount, 2)
            ) : (
              <span>—</span>
            )}
          </Typography>
        </TableCell>

        <TableCell className={styles.cell}>
          <Field
            containerClasses={cx(styles.containerField, styles.containerFieldCell)}
            inputClasses={styles.amountCell}
            error={
              item.currentSupplier?.multiplicity &&
              item.currentSupplier?.boxProperties?.amountInBox &&
              (orderState.amount % item.currentSupplier?.boxProperties?.amountInBox !== 0 || !orderState.amount) &&
              ` ${t(TranslationKey['Not a multiple of'])} ${item.currentSupplier.boxProperties?.amountInBox}`
            }
            successText={
              item.currentSupplier?.multiplicity &&
              item.currentSupplier?.boxProperties?.amountInBox &&
              orderState.amount % item.currentSupplier?.boxProperties?.amountInBox === 0 &&
              !!orderState.amount &&
              ` ${t(TranslationKey['Value multiple of'])} ${item.currentSupplier.boxProperties?.amountInBox}`
            }
            inputProps={{ maxLength: 6, min: 0 }}
            value={orderState.amount}
            onChange={e => {
              onChangeInput(e, 'amount')
            }}
          />
        </TableCell>

        <TableCell className={styles.cell}>
          <Typography className={cx(styles.standartText, { [styles.errorSpace]: isLocalPriseOutOfLimit })}>
            {toFixed(calcProductsPriceWithDelivery(item, orderState), 2)}
          </Typography>
          {isLocalPriseOutOfLimit && (
            <Typography className={styles.error}>
              {t(TranslationKey['At least'])} {platformSettings?.orderAmountLimit}$
            </Typography>
          )}
        </TableCell>

        <TableCell className={styles.cell}>
          <div className={styles.priceVariationsCell}>
            {priceVariations?.length > 0 ? (
              priceVariations?.map((el, index) => (
                <div key={index}>
                  {el.quantity} {t(TranslationKey['pcs.'])}. /{' '}
                  {toFixedWithDollarSign(el?.price / platformSettings?.yuanToDollarRate, 2)}{' '}
                  {t(TranslationKey.Per).toLowerCase()} {t(TranslationKey['pcs.'])}
                </div>
              ))
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
          <Button
            fullWidth
            className={styles.button}
            styleType={item.logicsTariffId ? ButtonStyle.DEFAULT : ButtonStyle.PRIMARY}
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
          </Button>
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
                : destinations.filter(el => el?.storekeeper?._id !== item?.storekeeper?._id)
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
              // error={!isValid(parsedDeadline) || isPast(parsedDeadline)}
              minDate={minDate}
              value={deadline}
              onChange={e => onChangeInput(e, 'deadline')}
            />
          </div>
        </TableCell>

        {withRemove && (
          <TableCell className={styles.deleteCell}>
            <IconButton onClick={() => onRemoveProduct(item._id)}>
              <DeleteIcon />
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
              inputComponent={<Typography className={styles.sumText}>{productionTerm}</Typography>}
            />

            <Field
              oneLine
              containerClasses={styles.containerField}
              labelClasses={styles.labelField}
              label={`${t(TranslationKey['Minimum batch'])}, ${t(TranslationKey.units)}`}
              inputComponent={<Typography className={styles.sumText}>{item.currentSupplier?.minlot}</Typography>}
            />

            <Field
              oneLine
              containerClasses={styles.containerField}
              labelClasses={styles.labelField}
              label={t(TranslationKey['Weight 1 unit'])}
              inputComponent={
                <Typography className={styles.sumText}>
                  {toFixed(weightOfOneBox, 2) || t(TranslationKey['No data'])}
                </Typography>
              }
            />

            <Field
              oneLine
              containerClasses={styles.containerField}
              labelClasses={styles.labelField}
              label={t(TranslationKey['Batch weight'])}
              inputComponent={
                <Typography className={styles.sumText}>
                  {toFixed(weightOfBatch, 2) || t(TranslationKey['No data'])}
                </Typography>
              }
            />

            <Field
              oneLine
              containerClasses={styles.containerField}
              labelClasses={styles.labelField}
              label={t(TranslationKey['Batch delivery cost']) + ',$'}
              inputComponent={
                <Typography className={styles.sumText}>
                  {toFixed(costDeliveryOfBatch, 2) || t(TranslationKey['No data'])}
                </Typography>
              }
            />

            <Field
              oneLine
              containerClasses={styles.containerField}
              labelClasses={styles.labelField}
              label={t(TranslationKey['Cost per unit in the USA']) + ',$'}
              inputComponent={<Typography className={styles.sumText}>{pricePerUnit}</Typography>}
            />
          </div>
          <div className={styles.mainCheckboxWrapper}>
            <div className={styles.checkboxWrapper}>
              <div className={styles.expressWrapper} onClick={onClickPriority}>
                <Checkbox className={styles.checkbox} checked={item.priority === '40'} color="primary" />
                <Typography className={styles.sumText}>{t(TranslationKey['Mark an order as urgent'])}</Typography>
                <img className={styles.deliveryImg} src="/assets/icons/fire.svg" alt="" />
              </div>
              <div className={styles.expressWrapper} onClick={onClickExpressChinaDelivery}>
                <Checkbox className={styles.checkbox} checked={item.expressChinaDelivery} color="primary" />
                <Typography className={styles.sumText}>
                  {t(TranslationKey['Order express delivery in China'])}
                </Typography>
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

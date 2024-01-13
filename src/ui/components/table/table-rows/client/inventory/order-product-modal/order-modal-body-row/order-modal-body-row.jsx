import { isValid } from 'date-fns'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

import DeleteIcon from '@material-ui/icons/Delete'
import { Checkbox, IconButton, TableCell, TableRow, Typography } from '@mui/material'

import { zipCodeGroups } from '@constants/configs/zip-code-groups'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChangeChipCell } from '@components/data-grid/data-grid-cells/data-grid-cells'
import { SelectStorekeeperAndTariffForm } from '@components/forms/select-storkeeper-and-tariff-form'
import { SupplierApproximateCalculationsForm } from '@components/forms/supplier-approximate-calculations-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { Button } from '@components/shared/buttons/button'
import { NewDatePicker } from '@components/shared/date-picker/date-picker'
import { Field } from '@components/shared/field/field'
import { Input } from '@components/shared/input'
import { Modal } from '@components/shared/modal'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'

import { calcProductsPriceWithDelivery } from '@utils/calculation'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { toFixed, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

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

  const [showSelectionStorekeeperAndTariffModal, setShowSelectionStorekeeperAndTariffModal] = useState(false)
  const [showSupplierApproximateCalculationsModal, setShowSupplierApproximateCalculationsModal] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)

  const [pricePerUnit, setPerPriceUnit] = useState(null)
  const [destinationId, setDestinationId] = useState(item?.destinationId)
  const [confirmModalSettings, setConfirmModalSettings] = useState({
    isWarning: false,
    confirmMessage: '',
    onClickConfirm: () => {},
    onClickCancelBtn: () => {},
  })

  const curDestination = destinations.find(el => el._id === orderState.destinationId)
  const currentStorkeeper = storekeepers.find(el => el._id === orderState.storekeeperId)
  const currentLogicsTariff = currentStorkeeper?.tariffLogistics?.find(el => el._id === item.logicsTariffId)
  const priceVariations = item.currentSupplier?.priceVariations
  const firstNumOfCode = curDestination?.zipCode[0]

  const tariffName = currentLogicsTariff?.name
  const regionOfDeliveryName = zipCodeGroups.find(el => el.codes.includes(Number(firstNumOfCode)))?.name
  const tariffRate =
    currentLogicsTariff?.conditionsByRegion[regionOfDeliveryName]?.rate ||
    currentLogicsTariff?.destinationVariations?.find(el => el._id === item?.variationTariffId)?.pricePerKgUsd

  const curStorekeeper = storekeepers.find(el => el._id === orderState.storekeeperId)
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
  const curTariffRate =
    curStorekeeper?.tariffLogistics.find(el => el._id === orderState.logicsTariffId)?.conditionsByRegion[
      regionOfDeliveryName
    ]?.rate ||
    curStorekeeper?.tariffLogistics
      ?.find(el => el?._id === orderState?.logicsTariffId)
      ?.destinationVariations?.find(el => el.destination?._id === curDestination?._id)?.pricePerKgUsd

  const costDeliveryOfBatch = weightOfBatch * curTariffRate || ''

  const minDate = dayjs().add(2, 'day')
  const [deadline, setDeadline] = useState(item.deadline ? new Date(item.deadline) : item.deadline)

  const boxPropertiesIsFull =
    item.currentSupplier?.boxProperties?.amountInBox &&
    item.currentSupplier?.boxProperties?.boxLengthCm &&
    item.currentSupplier?.boxProperties?.boxWidthCm &&
    item.currentSupplier?.boxProperties?.boxHeightCm &&
    item.currentSupplier?.boxProperties?.boxWeighGrossKg &&
    item.currentSupplier?.amount &&
    item.currentSupplier?.minlot &&
    item.currentSupplier?.priceInYuan &&
    item.currentSupplier?.price

  const onChangeInput = (event, nameInput) => {
    if (nameInput === 'deadline') {
      setOrderStateFiled(nameInput)(isValid(event) ? event : null)
      setDeadline(isValid(event) ? event : null)
    } else {
      setOrderStateFiled(nameInput)(event.target.value)
    }
  }

  const onSubmitSelectStorekeeperAndTariff = (
    storekeeperId,
    tariffId,
    variationTariffId,
    destinationId,
    isSelectedDestinationNotValid,
    isReset,
  ) => {
    if (isSelectedDestinationNotValid) {
      setConfirmModalSettings({
        isWarning: false,
        title: t(TranslationKey.Attention),
        confirmMessage: t(TranslationKey['Wish to change a destination?']),
        onClickConfirm: () => {
          onChangeInput(
            {
              target: {
                value: {
                  storekeeperId,
                  logicsTariffId: tariffId,
                  variationTariffId,
                  destinationId,
                },
              },
            },
            'tariff',
          )
          setDestinationId(destinationId)
          setShowConfirmationModal(false)
          setShowSelectionStorekeeperAndTariffModal(false)
        },
        onClickCancelBtn: () => {
          onChangeInput(
            {
              target: {
                value: {
                  storekeeperId,
                  destinationId: undefined,
                  logicsTariffId: tariffId,
                  variationTariffId,
                },
              },
            },
            'tariff',
          )
          setDestinationId(undefined)
          setShowConfirmationModal(false)
          setShowSelectionStorekeeperAndTariffModal(false)
        },
      })

      setShowConfirmationModal(true)
    } else {
      if (item?.destinationId || isReset) {
        setDestinationId(destinationId)
        onChangeInput(
          {
            target: {
              value: {
                storekeeperId,
                logicsTariffId: tariffId,
                variationTariffId,
              },
            },
          },
          'tariff',
        )
        setShowSelectionStorekeeperAndTariffModal(false)
      } else {
        setConfirmModalSettings({
          isWarning: false,
          title: t(TranslationKey.Attention),
          confirmMessage: t(TranslationKey['Wish to set a destination?']),
          onClickConfirm: () => {
            const validDestinationId =
              destinationId ||
              storekeepers
                .find(storekeeper => storekeeper._id === storekeeperId)
                ?.tariffLogistics?.find(tariff => tariff?._id === tariffId)
                .destinationVariations.find(dest => dest._id === variationTariffId).destination?._id

            setDestinationId(validDestinationId)
            onChangeInput(
              {
                target: {
                  value: {
                    storekeeperId,
                    logicsTariffId: tariffId,
                    variationTariffId,
                    destinationId: validDestinationId,
                  },
                },
              },
              'tariff',
            )
            setShowConfirmationModal(false)
            setShowSelectionStorekeeperAndTariffModal(false)
          },
          onClickCancelBtn: () => {
            setDestinationId(destinationId)
            onChangeInput(
              {
                target: {
                  value: {
                    storekeeperId,
                    logicsTariffId: tariffId,
                    variationTariffId,
                  },
                },
              },
              'tariff',
            )
            setShowConfirmationModal(false)
            setShowSelectionStorekeeperAndTariffModal(false)
          },
        })

        setShowConfirmationModal(true)
      }
    }
  }

  useEffect(() => {
    if (toFixed(calcProductsPriceWithDelivery(item, orderState), 2) < platformSettings.orderAmountLimit) {
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
    setDestinationId(item?.destinationId)
  }, [item?.destinationId])

  return (
    <>
      <TableRow
        key={item._id}
        hover
        role="checkbox"
        className={cx(styles.row, { [styles.noCurrentSupplier]: !item.currentSupplier })}
      >
        <TableCell className={styles.asinCell}>
          <div className={styles.asinCellContainer}>
            <div>
              <img alt="" className={styles.img} src={getAmazonImageUrl(item.images[0])} />
            </div>
          </div>
        </TableCell>

        <TableCell className={styles.cell}>
          <Typography className={styles.amazonTitle}>{item.amazonTitle}</Typography>
          <AsinOrSkuLink
            withCopyValue
            withAttributeTitle={'asin'}
            asin={item?.asin}
            attributeTitleTextStyles={styles.standartText}
          />
          <AsinOrSkuLink
            withCopyValue
            withAttributeTitle={'sku'}
            sku={item?.skuByClient}
            attributeTitleTextStyles={styles.standartText}
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
            containerClasses={styles.containerField}
            inputClasses={cx(styles.amountCell, {
              [styles.errorSpaceInputCell]:
                (item.currentSupplier?.multiplicity &&
                  item.currentSupplier?.boxProperties?.amountInBox &&
                  (orderState.amount % item.currentSupplier?.boxProperties?.amountInBox !== 0 || !orderState.amount)) ||
                (item.currentSupplier?.multiplicity &&
                  item.currentSupplier?.boxProperties?.amountInBox &&
                  orderState.amount % item.currentSupplier?.boxProperties?.amountInBox === 0 &&
                  !!orderState.amount),
            })}
            error={
              item.currentSupplier?.multiplicity &&
              item.currentSupplier?.boxProperties?.amountInBox &&
              (orderState.amount % item.currentSupplier?.boxProperties?.amountInBox !== 0 || !orderState.amount) &&
              ` ${t(TranslationKey['Value is not a multiple of'])} ${item.currentSupplier.boxProperties?.amountInBox}`
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
              {t(TranslationKey['At least'])} {platformSettings.orderAmountLimit}$
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
              <p className={styles.warningText}>{t(TranslationKey['No Transparency codes'])}</p>
            )}
          </div>
        </TableCell>

        <TableCell className={styles.cell}>
          <Button
            variant={item.storekeeperId && 'text'}
            className={cx(
              { [styles.storekeeperBtn]: !item.storekeeperId },
              { [styles.standartText]: item.storekeeperId },
            )}
            onClick={() => setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)}
          >
            {item.storekeeperId
              ? `                
                ${
                  item.logicsTariffId
                    ? `${tariffName}${tariffRate ? ' / ' + toFixed(tariffRate, 2) + ' $' : ''}`
                    : 'none'
                }`
              : t(TranslationKey.Select)}
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
              // destinations
              item.logicsTariffId ? destinations.filter(el => el?._id === destinationId) : destinations
              // .filter(el => el.storekeeper?._id !== item?.storekeeperId)

              /* .filter(el => !el.storekeeperId)*/
            } // убираем дестинейшены, которые одновременно и склады
            favourites={destinationsFavourites}
            searchFields={['name']}
            onClickSetDestinationFavourite={onClickSetDestinationFavourite}
            onClickNotChosen={() => onChangeInput({ target: { value: '' } }, 'destinationId')}
            onClickSelect={el => onChangeInput({ target: { value: el._id } }, 'destinationId')}
          />
        </TableCell>

        <TableCell className={styles.cell}>
          <Input
            multiline
            minRows={3}
            maxRows={3}
            inputProps={{ maxLength: 500 }}
            className={styles.commentInput}
            classes={{ inputMultiline: styles.inputMultiline }}
            onChange={e => onChangeInput(e, 'clientComment')}
          />
        </TableCell>

        <TableCell className={styles.cell}>
          <div className={styles.datePickerWrapper}>
            <NewDatePicker
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

        <Modal
          openModal={showSelectionStorekeeperAndTariffModal}
          setOpenModal={() => setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)}
        >
          <SelectStorekeeperAndTariffForm
            showCheckbox
            RemoveDestinationRestriction
            storekeepers={storekeepers}
            curStorekeeperId={item.storekeeperId}
            curTariffId={item.logicsTariffId}
            currentDestinationId={item?.destinationId}
            currentVariationTariffId={item?.variationTariffId}
            onSubmit={onSubmitSelectStorekeeperAndTariff}
          />
        </Modal>
      </TableRow>

      <TableRow key={item._id + `+`}>
        <TableCell colSpan={12}>
          <div className={styles.sumsWrapper}>
            <Button
              tooltipAttentionContent={!boxPropertiesIsFull && t(TranslationKey['Not enough data'])}
              disabled={!boxPropertiesIsFull}
              className={styles.calculationButton}
              onClick={() => setShowSupplierApproximateCalculationsModal(!showSupplierApproximateCalculationsModal)}
            >
              {t(TranslationKey['View an oriented calculation'])}
            </Button>

            <Field
              oneLine
              containerClasses={styles.containerField}
              labelClasses={styles.labelField}
              label={`${t(TranslationKey['Production time'])}, ${t(TranslationKey.days)}`}
              inputComponent={
                <Typography className={styles.sumText}>{item.currentSupplier?.productionTerm}</Typography>
              }
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
              containerClasses={cx(styles.containerField, styles.batchWeight)}
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
                <img className={styles.deliveryImg} src="/assets/icons/truck.svg" alt="" />
              </div>
            </div>
          </div>
        </TableCell>

        <Modal
          openModal={showSupplierApproximateCalculationsModal}
          setOpenModal={() => setShowSupplierApproximateCalculationsModal(!showSupplierApproximateCalculationsModal)}
        >
          <SupplierApproximateCalculationsForm
            volumeWeightCoefficient={platformSettings?.volumeWeightCoefficient}
            product={item}
            supplier={item.currentSupplier}
            storekeepers={storekeepers}
            destinationData={destinations}
            onClose={() => setShowSupplierApproximateCalculationsModal(!showSupplierApproximateCalculationsModal)}
          />
        </Modal>

        <ConfirmationModal
          isWarning={confirmModalSettings?.isWarning}
          openModal={showConfirmationModal}
          setOpenModal={() => setShowConfirmationModal(prev => !prev)}
          title={t(TranslationKey.Attention)}
          message={confirmModalSettings?.confirmMessage}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={confirmModalSettings?.onClickConfirm}
          onClickCancelBtn={confirmModalSettings?.onClickCancelBtn}
        />
      </TableRow>
    </>
  )
}

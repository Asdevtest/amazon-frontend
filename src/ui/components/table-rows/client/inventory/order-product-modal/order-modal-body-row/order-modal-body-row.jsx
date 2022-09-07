import React, {useEffect, useState} from 'react'

import {Chip, Typography, TableCell, TableRow, IconButton} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import clsx from 'clsx'

import {TranslationKey} from '@constants/translations/translation-key'
import {zipCodeGroups} from '@constants/zip-code-groups'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'
import {SelectStorekeeperAndTariffForm} from '@components/forms/select-storkeeper-and-tariff-form'
import {Input} from '@components/input'
import {Modal} from '@components/modal'
import {WithSearchSelect} from '@components/selects/with-search-select'

import {calcProductsPriceWithDelivery} from '@utils/calculation'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {toFixed, trimBarcode} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './order-modal-body-row.style'

export const OrderModalBodyRow = ({
  volumeWeightCoefficient,
  destinations,
  storekeepers,
  item,
  itemIndex,
  setOrderStateFiled,
  onClickBarcode,
  onDoubleClickBarcode,
  onDeleteBarcode,
  orderState,
  onRemoveProduct,
  withRemove,
}) => {
  const classNames = useClassNames()

  const copyValue = value => {
    navigator.clipboard.writeText(value)
  }

  const onChangeInput = (event, nameInput) => {
    setOrderStateFiled(nameInput)(event.target.value)
  }

  const [showSelectionStorekeeperAndTariffModal, setShowSelectionStorekeeperAndTariffModal] = useState(false)
  const [pricePerUnit, setPerPriceUnit] = useState(null)

  const onSubmitSelectStorekeeperAndTariff = (storekeeperId, tariffId) => {
    onChangeInput({target: {value: storekeeperId}}, 'storekeeperId')
    onChangeInput({target: {value: tariffId}}, 'logicsTariffId')
    setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)
  }

  const weightOfOneBox = item.currentSupplier
    ? Math.max(
        Math.round(
          (((item.currentSupplier.boxProperties?.boxWidthCm || 0) *
            (item.currentSupplier.boxProperties?.boxLengthCm || 0) *
            (item.currentSupplier.boxProperties?.boxHeightCm || 0)) /
            volumeWeightCoefficient) *
            100,
        ) / 100 || 0,
        item.currentSupplier.boxProperties?.boxWeighGrossKg,
      ) / item.currentSupplier.boxProperties?.amountInBox
    : ''

  const weightOfBatch = weightOfOneBox * orderState.amount || ''

  const curDestination = destinations.find(el => el._id === orderState.destinationId)

  const firstNumOfCode = curDestination?.zipCode[0]

  const regionOfDeliveryName = zipCodeGroups.find(el => el.codes.includes(Number(firstNumOfCode)))?.name

  const tariffName = storekeepers
    .find(el => el._id === item.storekeeperId)
    ?.tariffLogistics.find(el => el._id === item.logicsTariffId)?.name

  const tariffRate = storekeepers
    .find(el => el._id === item.storekeeperId)
    ?.tariffLogistics.find(el => el._id === item.logicsTariffId)?.conditionsByRegion[regionOfDeliveryName]?.rate

  const curStorekeeper = storekeepers.find(el => el._id === orderState.storekeeperId)

  const curTariffRate = curStorekeeper?.tariffLogistics.find(el => el._id === orderState.logicsTariffId)
    ?.conditionsByRegion[regionOfDeliveryName]?.rate

  const costDeliveryOfBatch = weightOfBatch * curTariffRate || ''

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

  return (
    <React.Fragment>
      <TableRow
        key={item._id}
        hover
        role="checkbox"
        className={clsx(classNames.row, {[classNames.noCurrentSupplier]: !item.currentSupplier})}
      >
        <TableCell className={classNames.asinCell}>
          <div className={classNames.asinCellContainer}>
            <div>
              <img alt="" className={classNames.img} src={getAmazonImageUrl(item.images[0])} />
            </div>
          </div>
        </TableCell>

        <TableCell className={classNames.cell}>
          <Typography className={classNames.amazonTitle}>{item.amazonTitle}</Typography>
          <div className={classNames.copyValueWrapper}>
            <Typography>{`ASIN: ${item.asin}`}</Typography>
            {item.asin ? (
              <img
                className={classNames.copyImg}
                src="/assets/icons/copy-img.svg"
                alt=""
                onClick={e => {
                  e.stopPropagation()
                  copyValue(item.asin)
                }}
              />
            ) : null}
          </div>
          <div className={classNames.copyValueWrapper}>
            <Typography>{`SKU: ${
              item.skusByClient?.length ? item.skusByClient.join(',') : t(TranslationKey.Missing)
            }`}</Typography>
            {item.skusByClient[0] ? (
              <img
                className={classNames.copyImg}
                src="/assets/icons/copy-img.svg"
                alt=""
                onClick={e => {
                  e.stopPropagation()
                  copyValue(item.skusByClient[0])
                }}
              />
            ) : null}
          </div>

          {!item.currentSupplier && (
            <Typography className={classNames.noCurrentSupplierText}>
              {t(TranslationKey['No supplier selected!'])}
            </Typography>
          )}
        </TableCell>

        <TableCell className={classNames.cell}>
          <Typography>{item.currentSupplier && item.currentSupplier.price}</Typography>
        </TableCell>

        <TableCell className={classNames.cell}>
          <Typography>
            {item.currentSupplier &&
              toFixed(item.currentSupplier.batchDeliveryCostInDollar / item.currentSupplier.amount, 2)}
          </Typography>
        </TableCell>

        <TableCell className={classNames.cell}>
          <Input
            inputProps={{maxLength: 6, min: 0}}
            value={orderState.amount}
            className={classNames.amountCell}
            onChange={e => onChangeInput(e, 'amount')}
          />
        </TableCell>

        <TableCell className={classNames.cell}>
          <Typography>{toFixed(calcProductsPriceWithDelivery(item, orderState), 2)}</Typography>
        </TableCell>

        <TableCell className={classNames.cell}>
          <Chip
            classes={{
              root: classNames.barcodeChip,
              clickable: classNames.barcodeChipHover,
              deletable: classNames.barcodeChipHover,
              deleteIcon: classNames.barcodeChipIcon,
            }}
            className={clsx({[classNames.barcodeChipExists]: item.barCode})}
            size="small"
            label={
              orderState.tmpBarCode.length
                ? t(TranslationKey['File added'])
                : orderState.barCode
                ? trimBarcode(orderState.barCode)
                : t(TranslationKey['Set Barcode'])
            }
            onClick={() => onClickBarcode(item, itemIndex)}
            onDoubleClick={() => onDoubleClickBarcode(item, itemIndex)}
            onDelete={!orderState.barCode ? undefined : () => onDeleteBarcode(item, itemIndex)}
          />
        </TableCell>

        <TableCell className={classNames.cell}>
          <Button
            disableElevation
            color="primary"
            variant={item.storekeeperId && 'text'}
            className={clsx({[classNames.storekeeperBtn]: !item.storekeeperId})}
            onClick={() => setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)}
          >
            {item.storekeeperId
              ? `${storekeepers.find(el => el._id === item.storekeeperId).name} /  
                ${
                  item.logicsTariffId
                    ? `${tariffName}${regionOfDeliveryName ? ' / ' + regionOfDeliveryName : ''}${
                        tariffRate ? ' / ' + tariffRate + ' $' : ''
                      }`
                    : 'none'
                }`
              : t(TranslationKey.Add)}
          </Button>
        </TableCell>

        <TableCell className={classNames.cell}>
          <WithSearchSelect
            width={160}
            selectedItemName={
              destinations.find(el => el._id === item.destinationId)?.name || t(TranslationKey['Not chosen'])
            }
            data={destinations}
            fieldName="name"
            onClickNotChosen={() => onChangeInput({target: {value: ''}}, 'destinationId')}
            onClickSelect={el => onChangeInput({target: {value: el._id}}, 'destinationId')}
          />
        </TableCell>

        <TableCell className={classNames.cell}>
          <Input
            multiline
            minRows={3}
            rowsMax={3}
            inputProps={{maxLength: 500}}
            className={classNames.commentInput}
            onChange={e => onChangeInput(e, 'clientComment')}
          />
        </TableCell>

        {withRemove && (
          <TableCell>
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
            storekeepers={storekeepers}
            curStorekeeperId={item.storekeeperId}
            curTariffId={item.logicsTariffId}
            onSubmit={onSubmitSelectStorekeeperAndTariff}
          />
        </Modal>
      </TableRow>

      <TableRow key={item._id + new Date()}>
        <TableCell colSpan={11}>
          <div className={classNames.sumsWrapper}>
            <Field
              oneLine
              containerClasses={classNames.containerField}
              labelClasses={classNames.labelField}
              label={t(TranslationKey['Weight 1 unit'])}
              inputComponent={
                <Typography className={classNames.sumText}>
                  {toFixed(weightOfOneBox, 2) || t(TranslationKey['No data'])}
                </Typography>
              }
            />

            <Field
              oneLine
              containerClasses={classNames.containerField}
              labelClasses={classNames.labelField}
              label={t(TranslationKey['Batch weight'])}
              inputComponent={
                <Typography className={classNames.sumText}>
                  {toFixed(weightOfBatch, 2) || t(TranslationKey['No data'])}
                </Typography>
              }
            />

            <Field
              oneLine
              containerClasses={classNames.containerField}
              labelClasses={classNames.labelField}
              label={t(TranslationKey['Batch delivery cost']) + ',$'}
              inputComponent={
                <Typography className={classNames.sumText}>
                  {toFixed(costDeliveryOfBatch, 2) || t(TranslationKey['No data'])}
                </Typography>
              }
            />

            <Field
              oneLine
              containerClasses={classNames.containerField}
              labelClasses={classNames.labelField}
              label={t(TranslationKey['Cost per unit in the USA']) + ',$'}
              inputComponent={<Typography className={classNames.sumText}>{pricePerUnit}</Typography>}
            />
          </div>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

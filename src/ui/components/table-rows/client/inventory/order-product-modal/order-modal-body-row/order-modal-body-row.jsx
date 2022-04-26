/* eslint-disable no-unused-vars */
import React, {useState} from 'react'

import {Chip, Typography, TableCell, TableRow, NativeSelect, IconButton} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import clsx from 'clsx'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'
import {SelectStorekeeperAndTariffForm} from '@components/forms/select-storkeeper-and-tariff-form'
import {Input} from '@components/input'
import {Modal} from '@components/modal'

import {calcProductsPriceWithDelivery} from '@utils/calculation'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixed, trimBarcode} from '@utils/text'

import {useClassNames} from './order-modal-body-row.style'

const textConsts = getLocalizedTexts(texts, 'en').inventoryView

const zipCodeGroups = [
  {codes: [8, 9], name: 'west'},
  {codes: [5, 6, 7], name: 'central'},
  {codes: [0, 1, 2, 3, 4], name: 'east'},
]

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

  const onChangeInput = (event, nameInput) => {
    setOrderStateFiled(nameInput)(event.target.value)
  }

  const [showSelectionStorekeeperAndTariffModal, setShowSelectionStorekeeperAndTariffModal] = useState(false)

  const onSubmitSelectStorekeeperAndTariff = (storekeeperId, tariffId) => {
    onChangeInput({target: {value: storekeeperId}}, 'storekeeperId')
    onChangeInput({target: {value: tariffId}}, 'logicsTariffId')
    setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)
  }

  const weightOfOneBox = Math.max(
    Math.round((((item.width || 0) * (item.length || 0) * (item.height || 0)) / volumeWeightCoefficient) * 100) / 100 ||
      0,
    item.weight,
  )

  const weightOfBatch = weightOfOneBox * orderState.amount || ''

  const curDestination = destinations.find(el => el._id === orderState.destinationId)

  const firstNumOfCode = curDestination?.zipCode[0]

  const regionOfDeliveryName = zipCodeGroups.find(el => el.codes.includes(Number(firstNumOfCode)))?.name

  const curStorekeeper = storekeepers.find(el => el._id === orderState.storekeeperId)

  const curTariffRate = curStorekeeper?.tariffLogistics.find(el => el._id === orderState.logicsTariffId)
    .conditionsByRegion[regionOfDeliveryName].rate

  const costDeliveryOfBatch = weightOfBatch * curTariffRate || ''

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

        <TableCell>
          <div>
            <Typography className={classNames.amazonTitle}>{item.amazonTitle}</Typography>
            <Typography>{`ASIN: ${item.asin}`}</Typography>
            {!item.currentSupplier && (
              <Typography className={classNames.noCurrentSupplierText}>{textConsts.noCurrentSupplier}</Typography>
            )}
          </div>
        </TableCell>

        <TableCell>
          <Typography>{item.currentSupplier && item.currentSupplier.price}</Typography>
        </TableCell>

        <TableCell>
          <Typography>
            {item.currentSupplier &&
              toFixed(item.currentSupplier.batchDeliveryCostInDollar / item.currentSupplier.amount, 2)}
          </Typography>
        </TableCell>

        <TableCell>
          <Input
            inputProps={{maxLength: 6, min: 0}}
            value={orderState.amount}
            className={classNames.amountCell}
            onChange={e => onChangeInput(e, 'amount')}
          />
        </TableCell>

        <TableCell className={classNames.totalCell}>
          <Typography>{toFixed(calcProductsPriceWithDelivery(item, orderState), 2)}</Typography>
        </TableCell>

        <TableCell>
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
                ? 'FILE IS ADDED'
                : orderState.barCode
                ? trimBarcode(orderState.barCode)
                : textConsts.setBarcodeChipLabel
            }
            onClick={() => onClickBarcode(item, itemIndex)}
            onDoubleClick={() => onDoubleClickBarcode(item, itemIndex)}
            onDelete={!orderState.barCode ? undefined : () => onDeleteBarcode(item, itemIndex)}
          />
        </TableCell>

        <TableCell>
          <NativeSelect
            variant="filled"
            inputProps={{
              name: 'destinationId',
              id: 'destinationId',
            }}
            className={classNames.destinationSelect}
            input={<Input />}
            onChange={e => onChangeInput(e, 'destinationId')}
          >
            <option value={''}>{'none'}</option>

            {destinations.map(item => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </NativeSelect>
        </TableCell>

        <TableCell className={classNames.storekeeperSelectCell}>
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
                    ? storekeepers
                        .find(el => el._id === item.storekeeperId)
                        .tariffLogistics.find(el => el._id === item.logicsTariffId).name
                    : 'none'
                }`
              : 'Выбрать'}
          </Button>
        </TableCell>

        <TableCell>
          <Input
            multiline
            minRows={4}
            rowsMax={4}
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
              label={'Вес 1 ед.,кг'}
              inputComponent={
                <Typography className={classNames.sumText}>{toFixed(weightOfOneBox, 2) || 'Нет данных'}</Typography>
              }
            />

            <Field
              oneLine
              containerClasses={classNames.containerField}
              labelClasses={classNames.labelField}
              label={'Вес партии,кг'}
              inputComponent={
                <Typography className={classNames.sumText}>{toFixed(weightOfBatch, 2) || 'Нет данных'}</Typography>
              }
            />

            <Field
              oneLine
              containerClasses={classNames.containerField}
              labelClasses={classNames.labelField}
              label={'Стоимость доставки партии,$'}
              inputComponent={
                <Typography className={classNames.sumText}>
                  {toFixed(costDeliveryOfBatch, 2) || 'Нет данных'}
                </Typography>
              }
            />
          </div>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

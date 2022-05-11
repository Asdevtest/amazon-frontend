import {ToggleButton, ToggleButtonGroup} from '@mui/material'

import React, {useState} from 'react'

import {Checkbox, IconButton, TableCell, TableRow, Typography} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

import {inchesCoefficient, sizesType} from '@constants/sizes-settings'
import {texts} from '@constants/texts'

import {Input} from '@components/input'
import {Table} from '@components/table'

import {calcFinalWeightForBox, calcVolumeWeightForBox} from '@utils/calculation'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixed} from '@utils/text'

import {useClassNames} from './boxes-to-create-table.style'

const textConsts = getLocalizedTexts(texts, 'ru').boxesToCreateTable

const WAREHOUSE_RECEIVE_HEAD_CELLS = [
  {align: 'center', title: 'BOX'},
  {align: 'center', title: 'QTY'},
  {align: 'center', title: 'Sizes'},
  {align: 'center', title: 'Weight'},
  {align: 'center', title: 'Volume weight'},
  {align: 'center', title: 'Final weight'},
]

const renderHeadRow = (
  <TableRow>
    {WAREHOUSE_RECEIVE_HEAD_CELLS.map((item, index) => (
      <TableCell key={index} align={item.align}>
        {item.title}
      </TableCell>
    ))}
  </TableRow>
)

const TableBodyBoxRow = ({item, itemIndex, handlers, ...restProps}) => {
  const classNames = useClassNames()

  return (
    <TableRow className={classNames.row}>
      <TableCell>
        <Typography className={classNames.boxTitle}>{item._id}</Typography>
        <div className={classNames.descriptionWrapper}>
          <img
            className={classNames.img}
            src={
              item.items[0].product.images &&
              item.items[0].product.images[0] &&
              getAmazonImageUrl(item.items[0].product.images[0])
            }
          />
          <Typography className={classNames.title}>
            {`${itemIndex + 1}. ${item.items[0].product.amazonTitle}`}
          </Typography>
        </div>
      </TableCell>

      <TableCell className={classNames.qtyCell}>
        <div className={classNames.normalCell}>
          <Input
            disabled
            classes={{root: classNames.inputWrapper, input: classNames.input}}
            value={item.items[0].amount}
          />
        </div>
      </TableCell>

      <TableCell className={classNames.normalCell}>
        <div className={classNames.sizesWrapper}>
          <div className={classNames.sizeWrapper}>
            <Typography>{'H:'}</Typography>
            <Input
              disabled
              classes={{root: classNames.inputWrapper, input: classNames.input}}
              value={toFixed(
                item.heightCmSupplier / (restProps.sizeSetting === sizesType.INCHES ? inchesCoefficient : 1),
                2,
              )}
            />
          </div>
          <div className={classNames.sizeWrapper}>
            <Typography>{'W:'}</Typography>
            <Input
              disabled
              classes={{root: classNames.inputWrapper, input: classNames.input}}
              value={toFixed(
                item.widthCmSupplier / (restProps.sizeSetting === sizesType.INCHES ? inchesCoefficient : 1),
                2,
              )}
            />
          </div>
          <div className={classNames.sizeWrapper}>
            <Typography>{'L:'}</Typography>
            <Input
              disabled
              classes={{root: classNames.inputWrapper, input: classNames.input}}
              value={toFixed(
                item.lengthCmSupplier / (restProps.sizeSetting === sizesType.INCHES ? inchesCoefficient : 1),
                2,
              )}
            />
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className={classNames.normalCell}>
          <Input
            disabled
            classes={{root: classNames.inputWrapper, input: classNames.input}}
            value={item.weighGrossKgSupplier}
          />
        </div>
      </TableCell>
      <TableCell>
        <div className={classNames.normalCell}>
          <Input
            disabled
            classes={{root: classNames.inputWrapper, input: classNames.input}}
            value={toFixed(calcVolumeWeightForBox(item, restProps.volumeWeightCoefficient), 2)}
          />
        </div>
      </TableCell>
      <TableCell>
        <div className={classNames.normalCell}>
          <Input
            disabled
            classes={{root: classNames.inputWrapper, input: classNames.input}}
            value={toFixed(calcFinalWeightForBox(item, restProps.volumeWeightCoefficient), 2)}
          />
        </div>
      </TableCell>

      <TableCell>
        <div className={classNames.checkboxWithLabelWrapper}>
          <Checkbox
            color="primary"
            disabled={!restProps.barcodeIsExist}
            checked={item.isBarCodeAlreadyAttachedByTheSupplier}
            onChange={e => handlers.onClickBarcodeCheckbox(itemIndex)(e)}
          />
          <Typography>{textConsts.supplierAddBarCode}</Typography>
        </div>
      </TableCell>

      <TableCell>
        <div className={classNames.normalCell}>
          <IconButton onClick={() => handlers.onRemoveBox(itemIndex)}>
            <DeleteIcon className={classNames.deleteBtn} />
          </IconButton>
        </div>
      </TableCell>
    </TableRow>
  )
}

export const BoxesToCreateTable = ({
  barcodeIsExist,
  newBoxes,
  onRemoveBox,
  onClickBarcodeCheckbox,
  volumeWeightCoefficient,
}) => {
  const classNames = useClassNames()

  const [sizeSetting, setSizeSetting] = useState(sizesType.CM)

  const handleChange = (event, newAlignment) => {
    setSizeSetting(newAlignment)
  }

  return (
    <div className={classNames.newBoxes}>
      <Typography className={classNames.sectionTitle} variant="h6">
        {textConsts.newBoxesTitle}
      </Typography>

      <div className={classNames.sizesSubWrapper}>
        <ToggleButtonGroup exclusive size="small" color="primary" value={sizeSetting} onChange={handleChange}>
          <ToggleButton disabled={sizeSetting === sizesType.INCHES} value={sizesType.INCHES}>
            {'In'}
          </ToggleButton>
          <ToggleButton disabled={sizeSetting === sizesType.CM} value={sizesType.CM}>
            {'Cm'}
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      <Table
        rowsOnly
        data={newBoxes}
        BodyRow={TableBodyBoxRow}
        renderHeadRow={renderHeadRow}
        rowsHandlers={{onRemoveBox, onClickBarcodeCheckbox}}
        barcodeIsExist={barcodeIsExist}
        volumeWeightCoefficient={volumeWeightCoefficient}
        sizeSetting={sizeSetting}
      />
    </div>
  )
}

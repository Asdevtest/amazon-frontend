import { useState } from 'react'

import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Checkbox, TableCell, TableRow, Typography } from '@mui/material'

import {
  inchesCoefficient,
  poundsWeightCoefficient,
  unitsOfChangeOptions,
  volumePoundsWeightCoefficient,
} from '@constants/configs/sizes-settings'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Field } from '@components/shared/field/field'
import { Input } from '@components/shared/input'
import { Table } from '@components/shared/table'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './boxes-to-create-table.style'

const WAREHOUSE_RECEIVE_HEAD_CELLS = () => [
  { align: 'center', title: t(TranslationKey.Box) },
  { align: 'center', title: t(TranslationKey['Boxes in group']) },
  { align: 'center', title: t(TranslationKey.Quantity) },
  { align: 'center', title: t(TranslationKey.Sizes) },
  { align: 'center', title: t(TranslationKey.Weight) },
  { align: 'center', title: t(TranslationKey['Volume weight']) },
  { align: 'center', title: t(TranslationKey['Final weight']) },
]

const renderHeadRow = () => (
  <TableRow>
    {WAREHOUSE_RECEIVE_HEAD_CELLS().map((item, index) => (
      <TableCell key={index} align={item.align}>
        {item.title}
      </TableCell>
    ))}
  </TableRow>
)

const TableBodyBoxRow = ({ item, itemIndex, handlers, ...restProps }) => {
  const { classes: classNames } = useClassNames()

  const heightCmSupplier = toFixed(
    item.heightCmSupplier / (restProps.sizeSetting === unitsOfChangeOptions.US ? inchesCoefficient : 1),
    2,
  )
  const widthCmSupplier = toFixed(
    item.widthCmSupplier / (restProps.sizeSetting === unitsOfChangeOptions.US ? inchesCoefficient : 1),
    2,
  )
  const lengthCmSupplier = toFixed(
    item.lengthCmSupplier / (restProps.sizeSetting === unitsOfChangeOptions.US ? inchesCoefficient : 1),
    2,
  )
  const weighGrossKgSupplier = toFixed(
    item.weighGrossKgSupplier / (restProps.sizeSetting === unitsOfChangeOptions.US ? poundsWeightCoefficient : 1),
    2,
  )
  const volumeWeightKgSupplier = toFixed(
    (heightCmSupplier * widthCmSupplier * lengthCmSupplier) / restProps.volumeWeightCoefficient,
    2,
  )

  const weightFinalAccountingKgSupplier = Math.max(weighGrossKgSupplier, volumeWeightKgSupplier)

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
          <Input disabled classes={{ root: classNames.inputWrapper, input: classNames.input }} value={item.amount} />
        </div>
      </TableCell>

      <TableCell className={classNames.qtyCell}>
        <div className={classNames.normalCell}>
          <Input
            disabled
            classes={{ root: classNames.inputWrapper, input: classNames.input }}
            value={item.items[0].amount}
          />
        </div>
      </TableCell>

      <TableCell className={classNames.normalCell}>
        <div className={classNames.sizesWrapper}>
          <div className={classNames.sizeWrapper}>
            <Typography>{t(TranslationKey.H) + ': '}</Typography>
            <Input
              disabled
              classes={{ root: classNames.inputWrapper, input: classNames.input }}
              value={heightCmSupplier}
            />
          </div>
          <div className={classNames.sizeWrapper}>
            <Typography>{t(TranslationKey.W) + ': '}</Typography>
            <Input
              disabled
              classes={{ root: classNames.inputWrapper, input: classNames.input }}
              value={widthCmSupplier}
            />
          </div>
          <div className={classNames.sizeWrapper}>
            <Typography>{t(TranslationKey.L) + ': '}</Typography>
            <Input
              disabled
              classes={{ root: classNames.inputWrapper, input: classNames.input }}
              value={lengthCmSupplier}
            />
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className={classNames.normalCell}>
          <Input
            disabled
            classes={{ root: classNames.inputWrapper, input: classNames.input }}
            value={weighGrossKgSupplier}
          />
        </div>
      </TableCell>
      <TableCell>
        <div className={classNames.normalCell}>
          <Input
            disabled
            classes={{ root: classNames.inputWrapper, input: classNames.input }}
            value={volumeWeightKgSupplier}
          />
        </div>
      </TableCell>
      <TableCell>
        <div className={classNames.normalCell}>
          <Input
            disabled
            classes={{ root: classNames.inputWrapper, input: classNames.input }}
            value={weightFinalAccountingKgSupplier}
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
          <Field
            tooltipInfoContent={t(TranslationKey["Label the box as labeled with the supplier's barcode"])}
            label={t(TranslationKey['Supplier glued the barcode'])}
            inputClasses={classNames.hidden}
            labelClasses={classNames.label}
            containerClasses={classNames.labelWrapper}
          />
        </div>

        {!restProps.isNoBuyerSupplier ? (
          <div className={classNames.checkboxWithLabelWrapper}>
            <Checkbox
              color="primary"
              disabled={restProps.isNoBuyerSupplier}
              checked={item.tmpUseToUpdateSupplierBoxDimensions}
              onChange={e => handlers.onClickUpdateSupplierStandart(itemIndex)(e)}
            />
            <Field
              tooltipInfoContent={t(TranslationKey['Save box parameters to the current supplier'])}
              label={t(TranslationKey['Make the supplier standard'])}
              inputClasses={classNames.hidden}
              labelClasses={classNames.label}
              containerClasses={classNames.labelWrapper}
            />
          </div>
        ) : null}
      </TableCell>

      <TableCell>
        <div className={classNames.buttonCell}>
          <Button
            tooltipInfoContent={t(TranslationKey['Remove box'])}
            className={classNames.deleteBtnWrapper}
            onClick={() => handlers.onRemoveBox(itemIndex)}
          >
            <DeleteIcon className={classNames.deleteBtn} />
          </Button>
          <Button className={classNames.editBtnWrapper} onClick={() => handlers.onEditBox()}>
            <EditIcon className={classNames.editBtn} />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}

export const BoxesToCreateTable = ({
  barcodeIsExist,
  newBoxes,
  isNoBuyerSupplier,
  onRemoveBox,
  onEditBox,
  onClickBarcodeCheckbox,
  onClickUpdateSupplierStandart,
  volumeWeightCoefficient,
}) => {
  const { classes: classNames } = useClassNames()

  const [sizeSetting, setSizeSetting] = useState(unitsOfChangeOptions.EU)

  const weightCoefficient =
    sizeSetting === unitsOfChangeOptions.EU ? volumeWeightCoefficient : volumePoundsWeightCoefficient

  const handleChange = newAlignment => {
    setSizeSetting(newAlignment)
  }

  return (
    <div className={classNames.newBoxes}>
      <Typography className={classNames.sectionTitle} variant="h6">
        {t(TranslationKey['Boxes will be created'])}
      </Typography>

      <div className={classNames.sizesSubWrapper}>
        <CustomSwitcher
          condition={sizeSetting}
          switcherSettings={[
            { label: () => unitsOfChangeOptions.EU, value: unitsOfChangeOptions.EU },
            { label: () => unitsOfChangeOptions.US, value: unitsOfChangeOptions.US },
          ]}
          changeConditionHandler={condition => handleChange(condition)}
        />
      </div>

      <Table
        rowsOnly
        data={newBoxes}
        BodyRow={TableBodyBoxRow}
        renderHeadRow={renderHeadRow()}
        rowsHandlers={{ onRemoveBox, onEditBox, onClickBarcodeCheckbox, onClickUpdateSupplierStandart }}
        barcodeIsExist={barcodeIsExist}
        volumeWeightCoefficient={weightCoefficient}
        sizeSetting={sizeSetting}
        isNoBuyerSupplier={isNoBuyerSupplier}
      />
    </div>
  )
}

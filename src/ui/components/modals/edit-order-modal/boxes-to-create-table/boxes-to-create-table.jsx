import { useState } from 'react'

import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { TableCell, TableRow, Typography } from '@mui/material'

import {
  inchesCoefficient,
  poundsWeightCoefficient,
  unitsOfChangeOptions,
  volumePoundsWeightCoefficient,
} from '@constants/configs/sizes-settings'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Checkbox } from '@components/shared/checkbox'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Field } from '@components/shared/field/field'
import { Input } from '@components/shared/input'
import { Table } from '@components/shared/table'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './boxes-to-create-table.style'

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
  const { classes: styles, cx } = useStyles()

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
    <TableRow className={styles.row}>
      <TableCell>
        <Typography className={styles.boxTitle}>{item._id}</Typography>
        <div className={styles.descriptionWrapper}>
          <img
            className={styles.img}
            src={
              item.items[0].product.images &&
              item.items[0].product.images[0] &&
              getAmazonImageUrl(item.items[0].product.images[0])
            }
          />
          <Typography className={styles.title}>{`${itemIndex + 1}. ${item.items[0].product.amazonTitle}`}</Typography>
        </div>
      </TableCell>

      <TableCell className={styles.qtyCell}>
        <div className={styles.normalCell}>
          <Input disabled classes={{ root: styles.inputWrapper, input: styles.input }} value={item.amount} />
        </div>
      </TableCell>

      <TableCell className={styles.qtyCell}>
        <div className={styles.normalCell}>
          <Input disabled classes={{ root: styles.inputWrapper, input: styles.input }} value={item.items[0].amount} />
        </div>
      </TableCell>

      <TableCell className={styles.normalCell}>
        <div className={styles.sizesWrapper}>
          <div className={styles.sizeWrapper}>
            <Typography>{t(TranslationKey.H) + ': '}</Typography>
            <Input disabled classes={{ root: styles.inputWrapper, input: styles.input }} value={heightCmSupplier} />
          </div>
          <div className={styles.sizeWrapper}>
            <Typography>{t(TranslationKey.W) + ': '}</Typography>
            <Input disabled classes={{ root: styles.inputWrapper, input: styles.input }} value={widthCmSupplier} />
          </div>
          <div className={styles.sizeWrapper}>
            <Typography>{t(TranslationKey.L) + ': '}</Typography>
            <Input disabled classes={{ root: styles.inputWrapper, input: styles.input }} value={lengthCmSupplier} />
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className={styles.normalCell}>
          <Input disabled classes={{ root: styles.inputWrapper, input: styles.input }} value={weighGrossKgSupplier} />
        </div>
      </TableCell>
      <TableCell>
        <div className={styles.normalCell}>
          <Input disabled classes={{ root: styles.inputWrapper, input: styles.input }} value={volumeWeightKgSupplier} />
        </div>
      </TableCell>
      <TableCell>
        <div className={styles.normalCell}>
          <Input
            disabled
            classes={{ root: styles.inputWrapper, input: styles.input }}
            value={weightFinalAccountingKgSupplier}
          />
        </div>
      </TableCell>

      <TableCell>
        <Checkbox
          color="primary"
          disabled={!restProps.barcodeIsExist}
          checked={item.isBarCodeAlreadyAttachedByTheSupplier}
          onChange={e => handlers.onClickBarcodeCheckbox(itemIndex)(e)}
        >
          <Field
            tooltipInfoContent={t(TranslationKey["Label the box as labeled with the supplier's barcode"])}
            label={t(TranslationKey['Supplier glued the barcode'])}
            inputClasses={styles.hidden}
            labelClasses={styles.label}
            containerClasses={styles.labelWrapper}
          />
        </Checkbox>

        {item.items?.[0]?.transparencyFile && (
          <Checkbox
            color="primary"
            checked={item?.items?.[0]?.isTransparencyFileAlreadyAttachedByTheSupplier}
            onChange={e => handlers.onClickTransparency(itemIndex)(e)}
          >
            <p className={cx(styles.label, styles.transparencyCodesText)}>
              {t(TranslationKey['The supplier glued the Transparency codes'])}
            </p>
          </Checkbox>
        )}

        {!restProps.isNoBuyerSupplier && (
          <Checkbox
            color="primary"
            disabled={restProps.isNoBuyerSupplier}
            checked={item.tmpUseToUpdateSupplierBoxDimensions}
            onChange={e => handlers.onClickUpdateSupplierStandart(itemIndex)(e)}
          >
            <Field
              tooltipInfoContent={t(TranslationKey['Save box parameters to the current supplier'])}
              label={t(TranslationKey['Make the supplier standard'])}
              inputClasses={styles.hidden}
              labelClasses={styles.label}
              containerClasses={styles.labelWrapper}
            />
          </Checkbox>
        )}
      </TableCell>

      <TableCell>
        <div className={styles.buttonCell}>
          <Button
            tooltipInfoContent={t(TranslationKey['Remove box'])}
            className={styles.deleteBtnWrapper}
            onClick={() => handlers.onRemoveBox(itemIndex)}
          >
            <DeleteIcon className={styles.deleteBtn} />
          </Button>
          <Button className={styles.editBtnWrapper} onClick={() => handlers.onEditBox()}>
            <EditIcon className={styles.editBtn} />
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
  onClickTransparency,
  volumeWeightCoefficient,
  orderGoodsAmount,
}) => {
  const { classes: styles, cx } = useStyles()

  const [sizeSetting, setSizeSetting] = useState(unitsOfChangeOptions.EU)

  const weightCoefficient =
    sizeSetting === unitsOfChangeOptions.EU ? volumeWeightCoefficient : volumePoundsWeightCoefficient

  const handleChange = newAlignment => {
    setSizeSetting(newAlignment)
  }

  const itemsGoodsAmount = newBoxes?.reduce((acc, item) => {
    return acc + item?.items?.[0]?.amount * item?.amount
  }, 0)
  return (
    <div className={styles.newBoxes}>
      <p className={styles.sectionTitle}>{t(TranslationKey['Boxes will be created'])}</p>

      <div className={styles.sizesSubWrapper}>
        <CustomSwitcher
          condition={sizeSetting}
          switcherSettings={[
            { label: () => unitsOfChangeOptions.EU, value: unitsOfChangeOptions.EU },
            { label: () => unitsOfChangeOptions.US, value: unitsOfChangeOptions.US },
          ]}
          changeConditionHandler={condition => handleChange(condition)}
        />

        <p>
          {`${t(TranslationKey['Total quantity'])}:`}{' '}
          <span
            className={cx({
              [styles.itemsNotEqualTotal]: itemsGoodsAmount !== orderGoodsAmount,
              [styles.itemsEqualTotal]: itemsGoodsAmount === orderGoodsAmount,
            })}
          >
            {itemsGoodsAmount}
          </span>
          {` / `}
          <span>{orderGoodsAmount}</span>
        </p>
      </div>

      <Table
        rowsOnly
        data={newBoxes}
        BodyRow={TableBodyBoxRow}
        renderHeadRow={renderHeadRow()}
        rowsHandlers={{
          onRemoveBox,
          onEditBox,
          onClickBarcodeCheckbox,
          onClickUpdateSupplierStandart,
          onClickTransparency,
        }}
        barcodeIsExist={barcodeIsExist}
        volumeWeightCoefficient={weightCoefficient}
        sizeSetting={sizeSetting}
        isNoBuyerSupplier={isNoBuyerSupplier}
      />
    </div>
  )
}

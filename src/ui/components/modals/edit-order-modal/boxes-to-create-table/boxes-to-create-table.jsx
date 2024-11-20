import { useState } from 'react'
import { MdOutlineClose, MdOutlineEdit } from 'react-icons/md'

import { TableCell, TableRow } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomCheckbox } from '@components/shared/custom-checkbox'
import { Field } from '@components/shared/field/field'
import { Input } from '@components/shared/input'
import { SizeSwitcher } from '@components/shared/size-switcher'
import { Table } from '@components/shared/table'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import '@typings/enums/button-style'
import { Dimensions } from '@typings/enums/dimensions'

import { Entities, useShowDimensions } from '@hooks/dimensions/use-show-dimensions'

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

  const { length, width, height, weight, volumeWeight, finalWeight } = useShowDimensions({
    data: item,
    sizeSetting: restProps.sizeSetting,
    calculationField: Entities.SUPPLIER,
  })

  return (
    <TableRow className={styles.row}>
      <TableCell>
        <p className={styles.boxTitle}>{item._id}</p>
        <div className={styles.descriptionWrapper}>
          <img
            className={styles.img}
            src={
              item.items[0].product.images &&
              item.items[0].product.images[0] &&
              getAmazonImageUrl(item.items[0].product.images[0])
            }
          />
          <p className={styles.title}>{`${itemIndex + 1}. ${item.items[0].product.amazonTitle}`}</p>
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
            <p>{t(TranslationKey.H) + ': '}</p>
            <Input disabled classes={{ root: styles.inputWrapper, input: styles.input }} value={height} />
          </div>
          <div className={styles.sizeWrapper}>
            <p>{t(TranslationKey.W) + ': '}</p>
            <Input disabled classes={{ root: styles.inputWrapper, input: styles.input }} value={width} />
          </div>
          <div className={styles.sizeWrapper}>
            <p>{t(TranslationKey.L) + ': '}</p>
            <Input disabled classes={{ root: styles.inputWrapper, input: styles.input }} value={length} />
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className={styles.normalCell}>
          <Input disabled classes={{ root: styles.inputWrapper, input: styles.input }} value={weight} />
        </div>
      </TableCell>
      <TableCell>
        <div className={styles.normalCell}>
          <Input disabled classes={{ root: styles.inputWrapper, input: styles.input }} value={volumeWeight} />
        </div>
      </TableCell>
      <TableCell>
        <div className={styles.normalCell}>
          <Input disabled classes={{ root: styles.inputWrapper, input: styles.input }} value={finalWeight} />
        </div>
      </TableCell>

      <TableCell>
        <CustomCheckbox
          disabled={!restProps.barcodeIsExist}
          checked={item.isBarCodeAlreadyAttachedByTheSupplier}
          onChange={e => handlers.onClickBarcodeCheckbox(itemIndex)(e)}
        ></CustomCheckbox>

        <Field
          tooltipInfoContent={t(TranslationKey["Label the box as labeled with the supplier's barcode"])}
          label={t(TranslationKey['Supplier glued the barcode'])}
          inputClasses={styles.hidden}
          labelClasses={styles.label}
          containerClasses={styles.labelWrapper}
        />

        {item.items?.[0]?.transparencyFile && (
          <CustomCheckbox
            color="primary"
            checked={item?.items?.[0]?.isTransparencyFileAlreadyAttachedByTheSupplier}
            labelClassName={cx(styles.label, styles.transparencyCodesText)}
            onChange={e => handlers.onClickTransparency(itemIndex)(e)}
          >
            The supplier glued the Transparency Codes
          </CustomCheckbox>
        )}

        {!restProps.isNoBuyerSupplier && (
          <>
            <CustomCheckbox
              disabled={restProps.isNoBuyerSupplier}
              checked={item.tmpUseToUpdateSupplierBoxDimensions}
              onChange={e => handlers.onClickUpdateSupplierStandart(itemIndex)(e)}
            />

            <Field
              tooltipInfoContent={t(TranslationKey['Save box parameters to the current supplier'])}
              label={t(TranslationKey['Make the supplier standard'])}
              inputClasses={styles.hidden}
              labelClasses={styles.label}
              containerClasses={styles.labelWrapper}
            />
          </>
        )}
      </TableCell>

      <TableCell>
        <div className={styles.buttonCell}>
          <CustomButton
            danger
            type="primary"
            icon={<MdOutlineClose size={18} />}
            onClick={() => handlers.onRemoveBox(itemIndex)}
          />

          <CustomButton icon={<MdOutlineEdit size={18} />} onClick={() => handlers.onEditBox()}></CustomButton>
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
  orderGoodsAmount,
}) => {
  const { classes: styles, cx } = useStyles()

  const [sizeSetting, setSizeSetting] = useState(Dimensions.EU)

  const itemsGoodsAmount = newBoxes?.reduce((acc, item) => {
    return acc + item?.items?.[0]?.amount * item?.amount
  }, 0)

  return (
    <div className={styles.newBoxes}>
      <p className={styles.sectionTitle}>{t(TranslationKey['Boxes will be created'])}</p>

      <div className={styles.sizesSubWrapper}>
        <SizeSwitcher condition={sizeSetting} onChangeCondition={setSizeSetting} />

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
        wrapperClassName={styles.tableWrapper}
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
        sizeSetting={sizeSetting}
        isNoBuyerSupplier={isNoBuyerSupplier}
      />
    </div>
  )
}

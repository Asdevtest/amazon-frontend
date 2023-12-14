import React, { FC } from 'react'

import { Chip } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { trimBarcode } from '@utils/text'
import { t } from '@utils/translations'

import { IProduct } from '@typings/product'

import { useStyles } from './barcode-cell.style'

interface BarcodeCellProps {
  product: IProduct
  handlers: {
    onClickBarcode: (product: IProduct) => void
    onDoubleClickBarcode: (product: IProduct) => void
    onDeleteBarcode: (product: IProduct) => void
  }
  disabled?: boolean
}

export const BarcodeCell: FC<BarcodeCellProps> = React.memo(props => {
  const { classes: styles, cx } = useStyles()
  const { product, handlers, disabled } = props

  return (
    <Chip
      disabled={disabled}
      classes={{
        root: styles.barcodeChip,
        clickable: styles.barcodeChipHover,
        deletable: styles.barcodeChipHover,
        deleteIcon: styles.barcodeChipIcon,
      }}
      className={cx({ [styles.barcodeChipNoExists]: !product?.barCode })}
      size="small"
      label={product?.barCode ? trimBarcode(product?.barCode) : t(TranslationKey.BarCode)}
      onClick={() => handlers.onClickBarcode(product)}
      onDoubleClick={() => handlers.onDoubleClickBarcode(product)}
      onDelete={!product?.barCode ? undefined : () => handlers.onDeleteBarcode(product)}
    />
  )
})

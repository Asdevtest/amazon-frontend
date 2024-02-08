import { FC, memo } from 'react'

import { Chip } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { trimBarcode } from '@utils/text'
import { t } from '@utils/translations'

import { IProduct } from '@typings/product'

import { useStyles } from './hs-code-cell.style'

interface IHsCodeCellProps {
  product: IProduct
  handlers: {
    onClickHsCode: (product: IProduct) => void
    onDoubleClickHsCode: (product: IProduct) => void
    onDeleteHsCode: (product: IProduct) => void
  }
}

export const HsCodeCell: FC<IHsCodeCellProps> = memo(props => {
  const { classes: styles, cx } = useStyles()
  const { product, handlers } = props

  return (
    <Chip
      classes={{
        root: styles.barcodeChip,
        clickable: styles.barcodeChipHover,
        deletable: styles.barcodeChipHover,
        deleteIcon: styles.barcodeChipIcon,
      }}
      className={cx({ [styles.barcodeChipNoExists]: !product.hsCode })}
      size="small"
      label={product.hsCode ? trimBarcode(product.hsCode) : t(TranslationKey['HS code'])}
      onClick={() => handlers.onClickHsCode(product)}
      onDoubleClick={() => handlers.onDoubleClickHsCode(product)}
      onDelete={!product.hsCode ? undefined : () => handlers.onDeleteHsCode(product)}
    />
  )
})

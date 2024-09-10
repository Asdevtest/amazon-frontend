import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

import { useStyles } from './supplier-with-icons-cell.style'

interface SupplierWithIconsCellProps {
  supplierName: string
  orderCreatedAt: string
  supplierCreatedAt: string
  orderSupplierId: string
  supplierId: string
  supplierMultiplicity: boolean
  supplierAmountInBox: number
}

export const SupplierWithIconsCell: FC<SupplierWithIconsCellProps> = memo(props => {
  const {
    supplierName,
    orderCreatedAt,
    supplierCreatedAt,
    orderSupplierId,
    supplierId,
    supplierMultiplicity,
    supplierAmountInBox,
  } = props

  const { classes: styles, cx } = useStyles()

  const isNewSupplier = new Date(orderCreatedAt) < new Date(supplierCreatedAt)
  const isOrdered = orderSupplierId === supplierId
  const isMultiplicity = supplierMultiplicity && supplierAmountInBox

  return (
    <>
      <Text text={supplierName} />

      <div className={styles.icons}>
        {isNewSupplier && <p className={cx(styles.text, styles.uppercase)}>{t(TranslationKey.New)}</p>}

        {isOrdered && <p className={cx(styles.text, styles.uppercase)}>{t(TranslationKey.Ordered)}</p>}

        {isMultiplicity && <p className={styles.text}>{`${t(TranslationKey.Multplty)}:${supplierAmountInBox}`}</p>}
      </div>
    </>
  )
})

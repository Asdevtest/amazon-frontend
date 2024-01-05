import { FC, memo } from 'react'

import { useStyles } from './supplier-with-icons-cell.style'

import { MultilineTextCell } from '../data-grid-cells'

interface SupplierWithIconsCellProps {
  supplierName: string
  orderCreatedAt: Date
  supplierCreatedAt: Date
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

  const { classes: styles } = useStyles()

  const isNewSupplier = new Date(orderCreatedAt) < new Date(supplierCreatedAt)
  const isOrdered = orderSupplierId === supplierId
  const isMultiplicity = supplierMultiplicity && supplierAmountInBox

  return (
    <>
      <MultilineTextCell leftAlign oneLines text={supplierName} />

      <div className={styles.icons}>
        {isNewSupplier && <p className={styles.text}>NEW</p>}

        {isOrdered && <p className={styles.text}>ORDERED</p>}

        {isMultiplicity && <p className={styles.text}>{`Multiplicity: ${supplierAmountInBox}`}</p>}
      </div>
    </>
  )
})

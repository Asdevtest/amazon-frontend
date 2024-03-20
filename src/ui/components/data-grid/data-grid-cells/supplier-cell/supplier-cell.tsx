import { FC, memo } from 'react'

import { Link } from '@mui/material'

import { checkAndMakeAbsoluteUrl } from '@utils/text'

import { useStyles } from './supplier-cell.style'

interface SupplierCellProps {
  supplierName?: string
  supplierLink?: string
}

export const SupplierCell: FC<SupplierCellProps> = memo(props => {
  const { classes: styles } = useStyles()
  const { supplierName, supplierLink } = props

  return (
    <>
      {supplierName ? (
        <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(supplierLink)}>
          <p className={styles.noActiveLink}>{supplierName}</p>
        </Link>
      ) : (
        <p>-</p>
      )}
    </>
  )
})

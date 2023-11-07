import React, { FC } from 'react'

import { Link } from '@mui/material'

import { checkAndMakeAbsoluteUrl } from '@utils/text'

import { useDataGridCellStyles } from './active-barcode-cell.style'

interface ActiveBarcodeCellProps {
  barCode: string
}

export const ActiveBarcodeCell: FC<ActiveBarcodeCellProps> = React.memo(({ barCode }) => {
  const { classes: styles } = useDataGridCellStyles()

  return (
    <>
      {barCode ? (
        <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(barCode)}>
          <p className={styles.noActivebarCode}>{barCode}</p>
        </Link>
      ) : (
        <p className={styles.noActivebarCode}>{'-'}</p>
      )}
    </>
  )
})

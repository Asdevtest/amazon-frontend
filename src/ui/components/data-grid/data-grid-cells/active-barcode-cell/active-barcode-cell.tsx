import { FC, memo } from 'react'

import { Link } from '@mui/material'

import { checkAndMakeAbsoluteUrl } from '@utils/text'

import { useStyles } from './active-barcode-cell.style'

interface ActiveLinkCellProps {
  barCode: string
}

export const ActiveLinkCell: FC<ActiveLinkCellProps> = memo(({ barCode }) => {
  const { classes: styles } = useStyles()

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

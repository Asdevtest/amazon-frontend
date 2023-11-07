import React, { FC } from 'react'

import { Button } from '@components/shared/buttons/button'

import { useDataGridCellStyles } from './trash-cell.style'

interface TrashCellProps {
  tooltipText: string
  isFirstRow?: boolean
  onClick: () => void
}

export const TrashCell: FC<TrashCellProps> = React.memo(({ onClick, tooltipText, isFirstRow }) => {
  const { classes: styles } = useDataGridCellStyles()

  return (
    <Button tooltipInfoContent={isFirstRow ? tooltipText : ''} className={styles.trashWrapper}>
      <img className={styles.trashImg} src="/assets/icons/trash.svg" alt="" onClick={onClick} />
    </Button>
  )
})

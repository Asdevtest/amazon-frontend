import React, { FC } from 'react'

import { Button } from '@components/shared/buttons/button'

import { useStyles } from './normal-action-btn-cell.style'

interface NormalActionBtnCellProps {
  bTnText: string
  tooltipText: string
  onClickOkBtn: () => void
  disabled?: boolean
  isFirstRow?: boolean
}

export const NormalActionBtnCell: FC<NormalActionBtnCellProps> = React.memo(props => {
  const { classes: styles } = useStyles()
  const { onClickOkBtn, bTnText, tooltipText, disabled, isFirstRow } = props

  return (
    <Button
      disabled={disabled}
      tooltipInfoContent={isFirstRow ? tooltipText : ''}
      variant="contained"
      color="primary"
      className={styles.actionBtn}
      onClick={onClickOkBtn}
    >
      {bTnText}
    </Button>
  )
})

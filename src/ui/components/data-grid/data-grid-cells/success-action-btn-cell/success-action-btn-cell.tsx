import { FC, memo } from 'react'

import { Button } from '@components/shared/buttons/button'

import { useStyles } from './success-action-btn-cell.style'

interface SuccessActionBtnCellProps {
  onClickOkBtn: () => void
  bTnText: string
  tooltipText: string
  isFirstRow: boolean
}

export const SuccessActionBtnCell: FC<SuccessActionBtnCellProps> = memo(props => {
  const { classes: styles } = useStyles()
  const { onClickOkBtn, bTnText, tooltipText, isFirstRow } = props

  return (
    <Button
      success
      tooltipInfoContent={isFirstRow ? tooltipText : ''}
      className={styles.actionBtn}
      onClick={onClickOkBtn}
    >
      {bTnText}
    </Button>
  )
})

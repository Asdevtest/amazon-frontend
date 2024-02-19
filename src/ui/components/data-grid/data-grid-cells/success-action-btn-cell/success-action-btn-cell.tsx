import { FC, memo } from 'react'

import { Button } from '@components/shared/buttons/button'

import { ButtonType } from '@typings/types/button.type'

import { useStyles } from './success-action-btn-cell.style'

interface SuccessActionBtnCellProps {
  onClickOkBtn: () => void
  bTnText: string
  tooltipText: string
  isFirstRow: boolean
  fullWidthButton?: boolean
}

export const SuccessActionBtnCell: FC<SuccessActionBtnCellProps> = memo(props => {
  const { classes: styles, cx } = useStyles()
  const { onClickOkBtn, bTnText, tooltipText, isFirstRow, fullWidthButton } = props

  const buttonStyle = cx(styles.actionBtn, { [styles.fullWidthButton]: fullWidthButton })

  return (
    <Button
      type={ButtonType.SUCCESS}
      tooltipInfoContent={isFirstRow ? tooltipText : ''}
      className={buttonStyle}
      onClick={onClickOkBtn}
    >
      {bTnText}
    </Button>
  )
})

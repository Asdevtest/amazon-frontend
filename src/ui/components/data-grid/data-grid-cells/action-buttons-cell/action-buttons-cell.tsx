import { FC, memo } from 'react'

import { Button } from '@components/shared/buttons/button'

import { useStyles } from './action-buttons-cell.style'

interface ActionButtonsProps {
  onClickRepeatButton: () => void
  onClickOrderButton: () => void
  repeatButtonText: string
  warehouseOrdersButtonText: string
}

export const ActionButtons: FC<ActionButtonsProps> = memo(props => {
  const { onClickRepeatButton, onClickOrderButton, repeatButtonText, warehouseOrdersButtonText } = props

  const { classes: styles, cx } = useStyles()
  return (
    <div className={styles.wrapper}>
      <Button className={cx(styles.button, styles.repeatButton)} onClick={onClickRepeatButton}>
        {repeatButtonText}
      </Button>

      <Button className={styles.button} variant="outlined" onClick={onClickOrderButton}>
        {warehouseOrdersButtonText}
      </Button>
    </div>
  )
})

import { FC, memo } from 'react'

import { Button } from '@components/shared/buttons/button'

import { useStyles } from './action-buttons-cell.style'

interface ActionButtonsProps {
  onClickFirstButton: () => void
  onClickSecondButton: () => void
  firstButtonText: string
  secondButtonText: string
}

export const ActionButtons: FC<ActionButtonsProps> = memo(props => {
  const { onClickFirstButton, onClickSecondButton, firstButtonText, secondButtonText } = props

  const { classes: styles, cx } = useStyles()
  return (
    <div className={styles.wrapper}>
      <Button className={cx(styles.button, styles.repeatButton)} onClick={onClickFirstButton}>
        {firstButtonText}
      </Button>

      <Button className={styles.button} variant="outlined" onClick={onClickSecondButton}>
        {secondButtonText}
      </Button>
    </div>
  )
})

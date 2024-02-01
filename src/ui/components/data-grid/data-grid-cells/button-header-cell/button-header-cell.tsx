import { FC, memo } from 'react'

import { Button } from '@components/shared/buttons/button'

import { useStyles } from './button-header-cell.style'

interface ButtonHeaderCellProps {
  text: string
  icon: JSX.Element
  onOpenModal: () => void
}

export const ButtonHeaderCell: FC<ButtonHeaderCellProps> = memo(props => {
  const { text, icon, onOpenModal } = props

  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      <Button className={styles.button} onClick={onOpenModal}>
        {icon}
        <span>{text}</span>
      </Button>
    </div>
  )
})

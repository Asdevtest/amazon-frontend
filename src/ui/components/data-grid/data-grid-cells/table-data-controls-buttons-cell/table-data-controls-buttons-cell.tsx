import { FC, memo } from 'react'

import { Button } from '@components/shared/buttons/button'
import { CrossIcon, EditIcon } from '@components/shared/svg-icons'

import { useStyles } from './table-data-controls-buttons-cell.style'

interface TableDataControlsButtonsCellProps {
  disableButton?: boolean
  onClickEditButton: () => void
  onClickRemoveButton: () => void
}

export const TableDataControlsButtonsCell: FC<TableDataControlsButtonsCellProps> = memo(props => {
  const { classes: styles, cx } = useStyles()

  const { disableButton, onClickEditButton, onClickRemoveButton } = props

  return (
    <div className={styles.buttonsWrapper}>
      <Button disabled={disableButton} className={cx(styles.button, styles.editButton)} onClick={onClickEditButton}>
        <EditIcon />
      </Button>

      <Button disabled={disableButton} className={cx(styles.button, styles.removeButton)} onClick={onClickRemoveButton}>
        <CrossIcon />
      </Button>
    </div>
  )
})

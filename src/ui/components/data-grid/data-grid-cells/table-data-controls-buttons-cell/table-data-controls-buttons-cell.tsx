/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'

import { Button } from '@components/shared/buttons/button'
import { CrossIcon, EditOutlineIcon } from '@components/shared/svg-icons'

import { useStyles } from './table-data-controls-buttons-cell.style'

interface TableDataControlsButtonsCellProps {
  disableButton?: boolean
  onClickEditButton: () => void
  onClickRemoveButton: () => void
}

export const TableDataControlsButtonsCell: FC<TableDataControlsButtonsCellProps> = React.memo(props => {
  const { classes: styles, cx } = useStyles()

  const { disableButton, onClickEditButton, onClickRemoveButton } = props

  return (
    <div className={styles.buttonsWrapper}>
      <Button disabled={disableButton} className={cx(styles.button, styles.editButton)} onClick={onClickEditButton}>
        <EditOutlineIcon />
      </Button>

      <Button disabled={disableButton} className={cx(styles.button, styles.removeButton)} onClick={onClickRemoveButton}>
        <CrossIcon />
      </Button>
    </div>
  )
})

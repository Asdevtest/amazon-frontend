import { FC, memo } from 'react'

import { Button } from '@components/shared/buttons/button'
import { CrossIcon, EditIcon, ReturnArrowIcon, SaveIcon, SendArrowIcon } from '@components/shared/svg-icons'

import { useStyles } from './table-data-controls-buttons-cell.style'

interface TableDataControlsButtonsCellProps {
  disableButton?: boolean
  onClickSaveButton?: () => void
  onClickEditButton?: () => void
  onClickCancelButton?: () => void
  onClickSendButton?: () => void
  onClickReturnButton?: () => void
}

export const TableDataControlsButtonsCell: FC<TableDataControlsButtonsCellProps> = memo(props => {
  const {
    disableButton,
    onClickSaveButton,
    onClickEditButton,
    onClickCancelButton,
    onClickSendButton,
    onClickReturnButton,
  } = props

  const { classes: styles, cx } = useStyles()

  return (
    <div className={styles.buttonsWrapper}>
      {onClickSaveButton ? (
        <Button
          disabled={disableButton}
          className={cx(styles.button, styles.successButton)}
          onClick={onClickSaveButton}
        >
          <SaveIcon />
        </Button>
      ) : null}

      {onClickEditButton ? (
        <Button
          disabled={disableButton}
          className={cx(styles.button, styles.primaryButton)}
          onClick={onClickEditButton}
        >
          <EditIcon />
        </Button>
      ) : null}

      {onClickCancelButton ? (
        <Button
          disabled={disableButton}
          className={cx(styles.button, styles.errorButton)}
          onClick={onClickCancelButton}
        >
          <CrossIcon />
        </Button>
      ) : null}

      {onClickSendButton ? (
        <Button disabled={disableButton} className={cx(styles.button, styles.errorButton)} onClick={onClickSendButton}>
          <ReturnArrowIcon />
        </Button>
      ) : null}

      {onClickReturnButton ? (
        <Button
          disabled={disableButton}
          className={cx(styles.button, styles.successButton)}
          onClick={onClickReturnButton}
        >
          <SendArrowIcon />
        </Button>
      ) : null}
    </div>
  )
})

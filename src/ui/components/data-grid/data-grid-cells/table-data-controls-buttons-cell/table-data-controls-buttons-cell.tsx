import { FC, memo } from 'react'

import { Button } from '@components/shared/buttons/button'
import { CrossIcon, EditIcon, ReturnArrowIcon, SaveIcon, SendArrowIcon } from '@components/shared/svg-icons'

import { ButtonStyle } from '@typings/enums/button-style'

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

  const { classes: styles } = useStyles()

  return (
    <div className={styles.buttonsWrapper}>
      {onClickSaveButton ? (
        <Button iconButton styleType={ButtonStyle.SUCCESS} disabled={disableButton} onClick={onClickSaveButton}>
          <SaveIcon />
        </Button>
      ) : null}

      {onClickEditButton ? (
        <Button iconButton disabled={disableButton} onClick={onClickEditButton}>
          <EditIcon />
        </Button>
      ) : null}

      {onClickCancelButton ? (
        <Button iconButton styleType={ButtonStyle.DANGER} disabled={disableButton} onClick={onClickCancelButton}>
          <CrossIcon />
        </Button>
      ) : null}

      {onClickSendButton ? (
        <Button iconButton styleType={ButtonStyle.DANGER} disabled={disableButton} onClick={onClickSendButton}>
          <ReturnArrowIcon />
        </Button>
      ) : null}

      {onClickReturnButton ? (
        <Button iconButton styleType={ButtonStyle.SUCCESS} disabled={disableButton} onClick={onClickReturnButton}>
          <SendArrowIcon />
        </Button>
      ) : null}
    </div>
  )
})

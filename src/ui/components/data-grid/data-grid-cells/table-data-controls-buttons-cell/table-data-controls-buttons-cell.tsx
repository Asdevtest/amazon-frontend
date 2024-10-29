import { FC, memo } from 'react'

import { CustomButton } from '@components/shared/custom-button'
import { CrossIcon, EditIcon, ReturnArrowIcon, SaveIcon, SendArrowIcon } from '@components/shared/svg-icons'

import '@typings/enums/button-style'

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
        <CustomButton icon={<SaveIcon />} type="primary" disabled={disableButton} onClick={onClickSaveButton} />
      ) : null}

      {onClickEditButton ? (
        <CustomButton icon={<EditIcon />} disabled={disableButton} onClick={onClickEditButton} />
      ) : null}

      {onClickCancelButton ? (
        <CustomButton danger icon={<CrossIcon />} type="primary" disabled={disableButton} onClick={onClickCancelButton}>
          <CrossIcon />
        </CustomButton>
      ) : null}

      {onClickSendButton ? (
        <CustomButton
          danger
          icon={<ReturnArrowIcon />}
          type="primary"
          disabled={disableButton}
          onClick={onClickSendButton}
        />
      ) : null}

      {onClickReturnButton ? (
        <CustomButton icon={<SendArrowIcon />} type="primary" disabled={disableButton} onClick={onClickReturnButton} />
      ) : null}
    </div>
  )
})

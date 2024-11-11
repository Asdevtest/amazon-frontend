import { FC, memo } from 'react'
import { FaRegSave } from 'react-icons/fa'
import { FaArrowUpLong, FaDownLong } from 'react-icons/fa6'
import { MdOutlineClose, MdOutlineEdit } from 'react-icons/md'

import { CustomButton } from '@components/shared/custom-button'

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
        <CustomButton
          size="small"
          icon={<FaRegSave size={16} />}
          type="primary"
          disabled={disableButton}
          onClick={onClickSaveButton}
        />
      ) : null}

      {onClickEditButton ? (
        <CustomButton
          size="small"
          icon={<MdOutlineEdit size={16} />}
          disabled={disableButton}
          onClick={onClickEditButton}
        />
      ) : null}

      {onClickCancelButton ? (
        <CustomButton
          danger
          size="small"
          icon={<MdOutlineClose size={16} />}
          type="primary"
          disabled={disableButton}
          onClick={onClickCancelButton}
        />
      ) : null}

      {onClickSendButton ? (
        <CustomButton
          danger
          size="small"
          icon={<FaDownLong size={16} />}
          type="primary"
          disabled={disableButton}
          onClick={onClickSendButton}
        />
      ) : null}

      {onClickReturnButton ? (
        <CustomButton
          size="small"
          icon={<FaArrowUpLong size={16} />}
          type="primary"
          disabled={disableButton}
          onClick={onClickReturnButton}
        />
      ) : null}
    </div>
  )
})

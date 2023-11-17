/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { useDataGridCellStyles } from './edit-or-remove-icon-btns-cell.style'

interface EditOrRemoveIconBtnsCellProps {
  row: any
  handlers?: {
    onClickEditBtn: (row: any) => void
    onClickRemoveBtn: (row: any) => void
    onTriggerArchive: (row: any) => void
  }
  isSubUsersTable?: boolean
  disableActionBtn?: boolean
  tooltipFirstButton?: string
  isFirstRow?: boolean
  isArchive?: boolean
  isSave?: boolean
  tooltipArchiveButton?: string
}

export const EditOrRemoveIconBtnsCell: FC<EditOrRemoveIconBtnsCellProps> = React.memo(props => {
  const { classes: styles } = useDataGridCellStyles()
  const {
    row,
    handlers,
    isSubUsersTable,
    disableActionBtn,
    tooltipFirstButton,
    isFirstRow,
    isArchive,
    isSave,
    tooltipArchiveButton,
  } = props

  return (
    <div className={styles.editOrRemoveIconBtnsCell}>
      {!isSave && (
        <Button
          tooltipInfoContent={(isFirstRow && tooltipFirstButton) || undefined}
          disabled={disableActionBtn}
          className={styles.removeOrEditBtn}
          onClick={() => !!handlers && handlers.onClickEditBtn(row)}
        >
          {isSubUsersTable ? t(TranslationKey['Assign permissions']) : <EditOutlinedIcon />}
        </Button>
      )}

      {handlers?.onTriggerArchive && (
        <Button
          success={isArchive}
          tooltipInfoContent={(isFirstRow && tooltipArchiveButton && t(TranslationKey['Move to archive'])) || undefined}
          disabled={disableActionBtn}
          className={styles.removeOrEditBtn}
          onClick={() => !!handlers && handlers?.onTriggerArchive(row)}
        >
          <img src={isArchive ? '/assets/icons/arrow-up.svg' : '/assets/icons/arrow-down.svg'} />
        </Button>
      )}

      {isArchive || isArchive === undefined ? (
        <Button
          danger
          // tooltipInfoContent={isFirstRow && tooltipSecondButton}
          disabled={disableActionBtn}
          className={styles.removeOrEditBtn}
          onClick={() => {
            !!handlers && handlers.onClickRemoveBtn(row)
          }}
        >
          <DeleteOutlineOutlinedIcon />
        </Button>
      ) : null}
    </div>
  )
})

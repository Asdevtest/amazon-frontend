import { observer } from 'mobx-react'
import { FC, useCallback, useMemo } from 'react'
import { MdOutlineDelete } from 'react-icons/md'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { CustomButton } from '@components/shared/custom-button'
import { CustomTextarea } from '@components/shared/custom-textarea'

import { useStyles } from './result-cell.style'

import { checkCurrentPeriodValid } from '../../helpers/check-current-period-valid'
import { ChangeCommentCellValueType } from '../../report-modal.type'

interface ResultCellProps {
  row: GridRowModel
  onChangeCommentCellValue: ChangeCommentCellValueType
  onRemoveLaunch: (id: string) => void
}

export const ResultCell: FC<ResultCellProps> = observer(props => {
  const { row, onChangeCommentCellValue, onRemoveLaunch } = props

  const { classes: styles } = useStyles()

  const handleRemoveLaunch = useCallback(() => onRemoveLaunch(row._id), [onRemoveLaunch, row._id])

  const disabledResultField = useMemo(() => !checkCurrentPeriodValid(row?.dateTo), [row?.dateTo])

  return (
    <div className={styles.wrapper}>
      <CustomTextarea
        isCell
        allowClear
        disabled={disabledResultField}
        rows={4}
        maxLength={1024}
        value={row?.result}
        onChange={onChangeCommentCellValue(row._id, 'result')}
      />

      <CustomButton
        danger
        shape="circle"
        size="small"
        icon={<MdOutlineDelete size={16} />}
        confirmText="Are you sure you want to remove this launch?"
        onClick={handleRemoveLaunch}
      />
    </div>
  )
})

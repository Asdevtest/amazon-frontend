import { Button } from 'antd'
import isEqual from 'lodash.isequal'
import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { CustomTextarea } from '@components/shared/custom-textarea'
import { CrossIcon } from '@components/shared/svg-icons'

import { useStyles } from './result-cell.style'

import { ChangeCommentCellValueType } from '../../report-modal.type'

interface ResultCellProps {
  row: GridRowModel
  onChangeCommentCellValue: ChangeCommentCellValueType
  onRemoveLaunch: (id: string) => void
  editMode?: boolean
}

export const ResultCell: FC<ResultCellProps> = observer(props => {
  const { row, editMode, onChangeCommentCellValue, onRemoveLaunch } = props

  const { classes: styles } = useStyles()

  const currentDateRange = useMemo(() => [row?.dateTo, row?.dateFrom], [])
  const changedDateRange = useMemo(() => [row?.dateTo, row?.dateFrom], [row?.dateTo, row?.dateFrom])
  const disabledResultField = useMemo(
    () => !editMode || !row?.expired || !isEqual(currentDateRange, changedDateRange),
    [editMode, row?.expired, currentDateRange, changedDateRange],
  )

  return (
    <div className={styles.wrapper}>
      <CustomTextarea
        isCell
        allowClear
        disabled={disabledResultField}
        rows={2}
        maxLength={1024}
        placeholder="Enter"
        value={row?.result}
        onChange={onChangeCommentCellValue(row?._id, 'result')}
      />

      <Button
        danger
        shape="circle"
        size="small"
        disabled={!editMode}
        icon={<CrossIcon className={styles.icon} onClick={() => onRemoveLaunch(row?._id)} />}
      />
    </div>
  )
})

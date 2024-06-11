import isEqual from 'lodash.isequal'
import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { CustomButton } from '@components/shared/custom-button'
import { CustomTextarea } from '@components/shared/custom-textarea'
import { CrossIcon } from '@components/shared/svg-icons'

import { Launches } from '@typings/enums/launches'

import { useStyles } from './result-cell.style'

import { ChangeCommentCellValueType } from '../../report-modal.type'

interface ResultCellProps {
  row: GridRowModel
  onChangeCommentCellValue: ChangeCommentCellValueType
  onRemoveLaunch: (type: Launches) => void
}

export const ResultCell: FC<ResultCellProps> = observer(props => {
  const { row, onChangeCommentCellValue, onRemoveLaunch } = props

  const { classes: styles } = useStyles()

  const currentDateRange = useMemo(() => [row?.dateTo, row?.dateFrom], [])
  const changedDateRange = useMemo(() => [row?.dateTo, row?.dateFrom], [row?.dateTo, row?.dateFrom])
  const disabledResultField = useMemo(
    () => !row?.expired || !isEqual(currentDateRange, changedDateRange),
    [row?.expired, currentDateRange, changedDateRange],
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
        onChange={onChangeCommentCellValue(row.type, 'result')}
      />

      <CustomButton
        danger
        shape="circle"
        size="small"
        icon={<CrossIcon className={styles.icon} />}
        onClick={() => onRemoveLaunch(row.type)}
      />
    </div>
  )
})

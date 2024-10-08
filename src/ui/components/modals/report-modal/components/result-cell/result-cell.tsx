import { Popconfirm } from 'antd'
import isEqual from 'lodash.isequal'
import { observer } from 'mobx-react'
import { FC, useCallback, useMemo } from 'react'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomTextarea } from '@components/shared/custom-textarea'
import { CrossIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

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
  const handleRemoveLaunch = useCallback(() => onRemoveLaunch(row.type), [onRemoveLaunch, row.type])

  return (
    <div className={styles.wrapper}>
      <CustomTextarea
        isCell
        allowClear
        disabled={disabledResultField}
        rows={2}
        maxLength={1024}
        value={row?.result}
        onChange={onChangeCommentCellValue(row.type, 'result')}
      />

      <Popconfirm
        title={t(TranslationKey['Are you sure you want to remove this launch?'])}
        okText={t(TranslationKey.Yes)}
        cancelText={t(TranslationKey.No)}
        onConfirm={handleRemoveLaunch}
      >
        <CustomButton danger shape="circle" size="small" icon={<CrossIcon className={styles.icon} />} />
      </Popconfirm>
    </div>
  )
})

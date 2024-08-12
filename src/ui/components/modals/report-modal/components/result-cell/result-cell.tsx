import { Popconfirm } from 'antd'
import { observer } from 'mobx-react'
import { FC, useCallback, useMemo } from 'react'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomTextarea } from '@components/shared/custom-textarea'
import { CrossIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

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

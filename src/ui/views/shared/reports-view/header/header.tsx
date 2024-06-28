import { Dayjs } from 'dayjs'
import { FC, memo, useCallback } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { CustomRangeDatePicker } from '@components/shared/custom-range-date-picker'
import { CustomPlusIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './header.style'

interface HeaderProps {
  requestStatus: loadingStatus
  onChangeRangeDate: (dates: null | (Dayjs | null)[]) => void
  onSearchSubmit: (value: string) => void
  onToggleReportModalEditMode: (reportId?: string) => void
  subView?: boolean
}

export const Header: FC<HeaderProps> = memo(props => {
  const { requestStatus, onChangeRangeDate, onSearchSubmit, onToggleReportModalEditMode, subView = false } = props

  const { classes: styles } = useStyles()

  const handleToggleReportModalEditMode = useCallback(
    () => onToggleReportModalEditMode(undefined),
    [onToggleReportModalEditMode],
  )

  return (
    <div className={styles.header}>
      <CustomRangeDatePicker className={styles.datePicker} onChange={onChangeRangeDate} />

      {subView ? (
        <CustomInputSearch
          enterButton
          allowClear
          loading={requestStatus === loadingStatus.IS_LOADING}
          wrapperClassName={styles.searchInput}
          placeholder="Search by SKU, ASIN, Title, Launch type"
          onSearch={onSearchSubmit}
        />
      ) : null}

      <CustomButton type="primary" icon={<CustomPlusIcon />} onClick={handleToggleReportModalEditMode}>
        {t(TranslationKey['New report'])}
      </CustomButton>
    </div>
  )
})

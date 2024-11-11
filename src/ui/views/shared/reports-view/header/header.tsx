import { FC, memo, useCallback } from 'react'
import { FiPlus } from 'react-icons/fi'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { CustomRangeDatePicker } from '@components/shared/custom-range-date-picker'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './header.style'

import { RangeDateType } from '../reports-view-copy.types'

interface HeaderProps {
  requestStatus: loadingStatus
  dateRangeValue: RangeDateType
  onChangeRangeDate: (dates: RangeDateType) => void
  onSearchSubmit: (value: string) => void
  onToggleReportModalEditMode: (reportId?: string) => void
  subView?: boolean
}

export const Header: FC<HeaderProps> = memo(props => {
  const {
    requestStatus,
    dateRangeValue,
    onChangeRangeDate,
    onSearchSubmit,
    onToggleReportModalEditMode,
    subView = false,
  } = props

  const { classes: styles } = useStyles()

  const handleToggleReportModalEditMode = useCallback(
    () => onToggleReportModalEditMode(undefined),
    [onToggleReportModalEditMode],
  )

  return (
    <div className={styles.header}>
      <CustomRangeDatePicker
        size="large"
        value={dateRangeValue}
        className={styles.datePicker}
        onChange={onChangeRangeDate}
      />

      {subView ? (
        <CustomInputSearch
          enterButton
          allowClear
          size="large"
          loading={requestStatus === loadingStatus.IS_LOADING}
          wrapperClassName={styles.searchInput}
          placeholder="Search by SKU, ASIN, Title, Launch type"
          onSearch={onSearchSubmit}
        />
      ) : null}

      <CustomButton type="primary" size="large" icon={<FiPlus />} onClick={handleToggleReportModalEditMode}>
        {t(TranslationKey['New report'])}
      </CustomButton>
    </div>
  )
})

import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInputSearch } from '@components/shared/custom-input-search'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './header.style'

interface HeaderProps {
  requestStatus: string
  selectedRows: string[]
  onClickAddBtn: () => void
  updateShops: () => void
  onChangeUnserverSearchValue: (value: string) => void
}

export const Header: FC<HeaderProps> = memo(props => {
  const { classes: styles } = useStyles()

  const { selectedRows, requestStatus, onClickAddBtn, updateShops, onChangeUnserverSearchValue } = props

  const disableUpdateButton = !selectedRows.length || requestStatus === loadingStatus.IS_LOADING

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.buttonsWrapper}>
        <CustomButton type="primary" size="large" onClick={onClickAddBtn}>
          {t(TranslationKey['Add shop'])}
        </CustomButton>

        <CustomButton type="primary" size="large" disabled={disableUpdateButton} onClick={updateShops}>
          {t(TranslationKey.Update)}
        </CustomButton>
      </div>

      <CustomInputSearch
        enterButton
        allowClear
        size="large"
        placeholder="Search by SKU, ASIN, Title"
        onSearch={onChangeUnserverSearchValue}
      />

      <div />
    </div>
  )
})

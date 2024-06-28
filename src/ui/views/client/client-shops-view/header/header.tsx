import { ChangeEvent, FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './header.style'

interface HeaderProps {
  requestStatus: string
  unserverSearchValue: string
  selectedRows: string[]
  onClickAddBtn: () => void
  updateShops: () => void
  onChangeUnserverSearchValue: (value: ChangeEvent<HTMLInputElement>) => void
}

export const Header: FC<HeaderProps> = memo(props => {
  const { classes: styles } = useStyles()

  const { selectedRows, requestStatus, unserverSearchValue, onClickAddBtn, updateShops, onChangeUnserverSearchValue } =
    props

  const disableUpdateButton = !selectedRows.length || requestStatus === loadingStatus.IS_LOADING

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.buttonsWrapper}>
        <Button onClick={onClickAddBtn}>{t(TranslationKey['Add shop'])}</Button>

        <Button disabled={disableUpdateButton} onClick={updateShops}>
          {t(TranslationKey.Update)}
        </Button>
      </div>

      <SearchInput
        placeholder={`${t(TranslationKey['Search by'])} ${t(TranslationKey.Title)}`}
        value={unserverSearchValue}
        onChange={onChangeUnserverSearchValue}
      />

      <div />
    </div>
  )
})

import { t } from 'i18n-js'
import { memo } from 'react'
import { MdOutlineFilterAltOff } from 'react-icons/md'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'

import { ButtonStyle } from '@typings/enums/button-style'

import { useStyles } from './data-grid-reset-filter-button.style'

export const DataGridResetFilterButton = memo(props => {
  const { className, resetFiltersBtnSettings, ...restProps } = props

  const { classes: styles, cx } = useStyles()

  return (
    <div>
      <Button
        isTableButton
        className={cx(className, styles.button)}
        styleType={ButtonStyle.DEFAULT}
        onClick={resetFiltersBtnSettings.onClickResetFilters}
        {...restProps}
      >
        <div className={cx(className, styles.mainFilterBtnInsert)}>
          <MdOutlineFilterAltOff size={20} />

          <p className={styles.mainFilterBtnInsertText}>{t(TranslationKey['Reset filters'])}</p>
        </div>
      </Button>
    </div>
  )
})

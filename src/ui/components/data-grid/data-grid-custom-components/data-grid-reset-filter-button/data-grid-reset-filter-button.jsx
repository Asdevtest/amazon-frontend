import { t } from 'i18n-js'
import { memo } from 'react'
import { MdOutlineFilterAltOff } from 'react-icons/md'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import '@typings/enums/button-style'

import { useStyles } from './data-grid-reset-filter-button.style'

export const DataGridResetFilterButton = memo(props => {
  const { className, resetFiltersBtnSettings, ...restProps } = props

  const { classes: styles, cx } = useStyles()

  return (
    <CustomButton
      className={styles.resetButton}
      icon={<MdOutlineFilterAltOff size={16} />}
      onClick={resetFiltersBtnSettings.onClickResetFilters}
      {...restProps}
    >
      {t(TranslationKey['Reset filters'])}
    </CustomButton>
  )
})

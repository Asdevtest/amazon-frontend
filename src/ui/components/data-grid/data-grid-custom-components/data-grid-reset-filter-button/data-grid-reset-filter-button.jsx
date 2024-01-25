/* eslint-disable no-unused-vars */
import { t } from 'i18n-js'

import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined'
import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { useStyles } from './data-grid-reset-filter-button.style'

export const DataGridResetFilterButton = props => {
  const { classes: styles, cx } = useStyles()
  const { className, resetFiltersBtnSettings, ...other } = props

  return (
    <div>
      <Button
        // disabled={!resetFiltersBtnSettings.isSomeFilterOn}
        variant="text" /* variant="outlined" */
        className={cx(className, styles.mainFilterBtn)}
        onClick={resetFiltersBtnSettings.onClickResetFilters}
      >
        <div className={cx(className, styles.mainFilterBtnInsert)}>
          <FilterAltOffOutlinedIcon fontSize="small" />

          <Typography className={styles.mainFilterBtnInsertText}>{t(TranslationKey['Reset filters'])}</Typography>
        </div>
      </Button>
    </div>
  )
}

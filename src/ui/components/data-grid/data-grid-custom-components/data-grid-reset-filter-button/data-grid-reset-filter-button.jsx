/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import { t } from 'i18n-js'
import React, { useState } from 'react'

import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined'
import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { useClassNames } from './data-grid-reset-filter-button.style'

export const DataGridResetFilterButton = props => {
  const { classes: classNames } = useClassNames()
  const { className, resetFiltersBtnSettings, ...other } = props

  return (
    <div>
      <Button
        // disabled={!resetFiltersBtnSettings.isSomeFilterOn}
        variant="text" /* variant="outlined" */
        className={cx(className, classNames.mainFilterBtn)}
        onClick={resetFiltersBtnSettings.onClickResetFilters}
      >
        <div className={cx(className, classNames.mainFilterBtnInsert)}>
          <FilterAltOffOutlinedIcon fontSize="small" />

          <Typography className={classNames.mainFilterBtnInsertText}>{t(TranslationKey['Reset filters'])}</Typography>
        </div>
      </Button>
    </div>
  )
}

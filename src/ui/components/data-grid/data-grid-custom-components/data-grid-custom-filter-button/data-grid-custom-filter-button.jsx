/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import { t } from 'i18n-js'
import React, { useState } from 'react'

import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { Menu, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { useClassNames } from './data-grid-custom-filter-button.style'

export const DataGridCustomFilterButton = props => {
  const { classes: classNames } = useClassNames()
  const { className, ...other } = props

  const [menuAnchor, setMenuAnchor] = useState(null)

  const handleClick = event => {
    setMenuAnchor(event.currentTarget)
  }

  const handleClose = () => {
    setMenuAnchor(null)
  }

  return (
    <div>
      <Button variant="text" className={cx(className, classNames.mainFilterBtn)} onClick={handleClick}>
        <div className={cx(className, classNames.mainFilterBtnInsert)}>
          <FilterAltOutlinedIcon />

          <Typography className={classNames.mainFilterBtnInsertText}>{t(TranslationKey['My filter'])}</Typography>
        </div>
      </Button>

      <Menu
        keepMounted
        anchorEl={menuAnchor}
        autoFocus={false}
        open={Boolean(menuAnchor)}
        // classes={{paper: classNames.menu, list: classNames.list}}
        onClose={handleClose}
      >
        <div style={{ /* background: 'green', */ width: '2000px', height: 200 }}></div>
      </Menu>
    </div>
  )
}

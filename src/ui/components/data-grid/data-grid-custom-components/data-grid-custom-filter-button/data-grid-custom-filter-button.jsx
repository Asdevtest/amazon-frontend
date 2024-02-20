import { t } from 'i18n-js'
import { useState } from 'react'

import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { Menu, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { ButtonVariant } from '@typings/types/button.type'

import { useStyles } from './data-grid-custom-filter-button.style'

export const DataGridCustomFilterButton = props => {
  const { classes: styles, cx } = useStyles()
  const { className } = props

  const [menuAnchor, setMenuAnchor] = useState(null)

  const handleClick = event => {
    setMenuAnchor(event.currentTarget)
  }

  const handleClose = () => {
    setMenuAnchor(null)
  }

  return (
    <div>
      <Button variant={ButtonVariant.OUTLINED} className={cx(className, styles.mainFilterBtn)} onClick={handleClick}>
        <div className={cx(className, styles.mainFilterBtnInsert)}>
          <FilterAltOutlinedIcon />

          <Typography className={styles.mainFilterBtnInsertText}>{t(TranslationKey['My filter'])}</Typography>
        </div>
      </Button>

      {Boolean(menuAnchor) && (
        <Menu keepMounted anchorEl={menuAnchor} autoFocus={false} open={Boolean(menuAnchor)} onClose={handleClose}>
          <div style={{ width: '2000px', height: 200 }}></div>
        </Menu>
      )}
    </div>
  )
}

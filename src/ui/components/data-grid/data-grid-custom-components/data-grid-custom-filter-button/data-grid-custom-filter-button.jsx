import { t } from 'i18n-js'
import { useState } from 'react'
import { MdOutlineFilterAlt } from 'react-icons/md'

import { Menu } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

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
      <CustomButton variant="outlined" className={cx(className, styles.mainFilterBtn)} onClick={handleClick}>
        <div className={cx(className, styles.mainFilterBtnInsert)}>
          <MdOutlineFilterAlt size={18} />

          <p className={styles.mainFilterBtnInsertText}>{t(TranslationKey['My filter'])}</p>
        </div>
      </CustomButton>

      {Boolean(menuAnchor) && (
        <Menu keepMounted anchorEl={menuAnchor} autoFocus={false} open={Boolean(menuAnchor)} onClose={handleClose}>
          <div style={{ width: '2000px', height: 200 }}></div>
        </Menu>
      )}
    </div>
  )
}

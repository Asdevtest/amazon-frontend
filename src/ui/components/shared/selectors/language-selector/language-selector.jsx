import { useState } from 'react'

import { Typography } from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { languageOptions } from '@constants/translations/language-options'

import { SettingsModel } from '@models/settings-model'

import { setI18nConfig } from '@utils/translations'

import { useClassNames } from './language-selector.style'

export const LanguageSelector = ({ className }) => {
  const { classes: classNames } = useClassNames()

  const [anchorEl, setAnchorEl] = useState(false)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <div className={classNames.languageTagWrapper} onClick={handleClick}>
        <img src={`/assets/icons/${SettingsModel.languageTag}.svg`} className={className} />

        <Typography className={classNames.title}>{`${SettingsModel.languageTag.replace(/(^)[a-z]/g, x =>
          x.toUpperCase(),
        )}`}</Typography>
      </div>

      {Boolean(anchorEl) && (
        <Menu keepMounted id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          {languageOptions
            .filter(el => el.key !== SettingsModel.languageTag)
            .map(languageOption => (
              <MenuItem
                key={languageOption.key}
                style={{ cursor: 'pointer' }}
                className={classNames.option}
                onClick={() => {
                  SettingsModel.setLanguageTag(languageOption.key)
                  setI18nConfig()
                  handleClose()
                }}
              >
                <div className={classNames.languageOptionWrapper}>
                  <img src={`/assets/icons/${languageOption.key}.svg`} />
                  {languageOption.key.replace(/(^)[a-z]/g, x => x.toUpperCase())}
                </div>
              </MenuItem>
            ))}
        </Menu>
      )}
    </div>
  )
}

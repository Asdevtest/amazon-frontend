// ГОТОВЫЙ ВАРИАНТ С МОДАЛКОЙ, КОГДА ЯЗЫКОВ БУДЕТ БОЛЬШЕ
import {Typography} from '@mui/material'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import React, {useState} from 'react'

import {languageOptions} from '@constants/translations/language-options'

import {SettingsModel} from '@models/settings-model'

import {setI18nConfig} from '@utils/translations'

import {useClassNames} from './language-selector.style'

export const LanguageSelector = () => {
  const {classes: classNames} = useClassNames()

  const [anchorEl, setAnchorEl] = useState(false)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      {/* <Typography className={classNames.title} onClick={handleClick}>{`${t(TranslationKey.language)} (${
        SettingsModel.languageTag
      })`}</Typography> */}

      <Typography className={classNames.title} onClick={handleClick}>{`${SettingsModel.languageTag}`}</Typography>

      <div>
        <Menu keepMounted id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          {languageOptions
            .filter(el => el.key !== SettingsModel.languageTag)
            .map(languageOption => (
              <MenuItem
                key={languageOption.key}
                style={{cursor: 'pointer'}}
                className={classNames.option}
                onClick={() => {
                  SettingsModel.setLanguageTag(languageOption.key)
                  setI18nConfig()
                  handleClose()
                }}
              >
                {languageOption.key}
              </MenuItem>
            ))}
        </Menu>
      </div>
    </div>
  )
}

// import {cx} from '@emotion/css'  // ВЕРСИЯ ТОЛЬКО РУС И АНГЛ

// import React from 'react'

// import {LanguageKey} from '@constants/translations/language-key'

// import {SettingsModel} from '@models/settings-model'

// import {ToggleBtnGroup} from '@components/toggle-btn-group/toggle-btn-group'
// import {ToggleBtn} from '@components/toggle-btn-group/toggle-btn/toggle-btn'

// import {setI18nConfig} from '@utils/translations'

// import {useClassNames} from './language-selector.style'

// export const LanguageSelector = () => {
//   const handleChange = (event, newAlignment) => {
//     SettingsModel.setLanguageTag(newAlignment)
//     setI18nConfig()
//   }
//   const {classes: classNames} = useClassNames()

//   return (
//     <div>
//       <ToggleBtnGroup exclusive size="small" color="primary" value={SettingsModel.languageTag} onChange={handleChange}>
//         <ToggleBtn
//           disabled={SettingsModel.languageTag === LanguageKey.ru}
//           className={cx({[classNames.selectedBtn]: SettingsModel.languageTag === LanguageKey.ru})}
//           value={LanguageKey.ru}
//         >
//           {'Ru'}
//         </ToggleBtn>
//         <ToggleBtn
//           disabled={SettingsModel.languageTag === LanguageKey.en}
//           className={cx({[classNames.selectedBtn]: SettingsModel.languageTag === LanguageKey.en})}
//           value={LanguageKey.en}
//         >
//           {'En'}
//         </ToggleBtn>
//       </ToggleBtnGroup>
//     </div>
//   )
// }

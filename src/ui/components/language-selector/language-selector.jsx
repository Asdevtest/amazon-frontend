import {ToggleButton, ToggleButtonGroup} from '@mui/material'

import React from 'react'

import {LanguageKey} from '@constants/translations/language-key'

import {SettingsModel} from '@models/settings-model'

import {setI18nConfig} from '@utils/translations'

export const LanguageSelector = () => {
  const handleChange = (event, newAlignment) => {
    SettingsModel.setLanguageTag(newAlignment)
    setI18nConfig()
  }

  return (
    <div>
      <ToggleButtonGroup
        exclusive
        size="small"
        color="primary"
        value={SettingsModel.languageTag}
        onChange={handleChange}
      >
        <ToggleButton disabled={SettingsModel.languageTag === LanguageKey.ru} value={LanguageKey.ru}>
          {'Ru'}
        </ToggleButton>
        <ToggleButton disabled={SettingsModel.languageTag === LanguageKey.en} value={LanguageKey.en}>
          {'En'}
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}

// import React, {useState} from 'react'  // ГОТОВЫЙ ВАРИАНТ С МОДАЛКОЙ, КОГДА ЯЗЫКОВ БУДЕТ БОЛЬШЕ

// import {Typography} from '@material-ui/core'
// import Menu from '@material-ui/core/Menu'
// import MenuItem from '@material-ui/core/MenuItem'

// import {languageOptions} from '@constants/translations/language-options'
// import {TranslationKey} from '@constants/translations/translation-key'

// import {SettingsModel} from '@models/settings-model'

// import {setI18nConfig, t} from '@utils/translations'

// import {useClassNames} from './language-selector.style'

// export const LanguageSelector = () => {
//   const classNames = useClassNames()

//   const [anchorEl, setAnchorEl] = useState(false)

//   const handleClick = event => {
//     setAnchorEl(event.currentTarget)
//   }

//   const handleClose = () => {
//     setAnchorEl(null)
//   }

//   return (
//     <div>
//       <Typography className={classNames.title} onClick={handleClick}>{`${t(TranslationKey.language)} (${
//         SettingsModel.languageTag
//       })`}</Typography>

//       <div>
//         <Menu keepMounted id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
//           {languageOptions.map(languageOption => (
//             <MenuItem
//               key={languageOption.key}
//               style={{cursor: 'pointer'}}
//               onClick={() => {
//                 SettingsModel.setLanguageTag(languageOption.key)
//                 setI18nConfig()
//                 handleClose()
//               }}
//             >
//               {languageOption.label}
//             </MenuItem>
//           ))}
//         </Menu>
//       </div>
//     </div>
//   )
// }

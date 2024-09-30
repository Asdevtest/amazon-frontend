import { FC, memo } from 'react'
import { PiMoonLight, PiSunLight } from 'react-icons/pi'

import { SettingsModel } from '@models/settings-model'

import { CustomButton } from '@components/shared/custom-button'

import { UiTheme } from '@typings/enums/ui-theme'

import { useStyles } from './theme-select.style'

export const ThemeSelect: FC = memo(() => {
  const { classes: styles } = useStyles()

  const handleChangeUiTheme = () => {
    const selectedTheme = SettingsModel.uiTheme === UiTheme.light ? UiTheme.dark : UiTheme.light
    SettingsModel.setUiTheme(selectedTheme)
  }

  return (
    <CustomButton type="link" className={styles.root} onClick={handleChangeUiTheme}>
      {SettingsModel.uiTheme === UiTheme.light ? <PiSunLight size={24} /> : <PiMoonLight size={24} />}
    </CustomButton>
  )
})

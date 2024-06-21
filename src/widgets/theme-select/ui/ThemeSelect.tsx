import { FC, memo } from 'react'
import { PiMoonLight, PiSunLight } from 'react-icons/pi'

import { CustomButton } from '@components/shared/custom-button'

// TODO: import
import { Theme, useTheme } from '../../../app/providers/theme'

import classes from './ThemeSelect.module.scss'

export const ThemeSelect: FC = memo(() => {
  const { theme, onToggleTheme } = useTheme()

  return (
    <CustomButton type="link" className={classes.root} onClick={onToggleTheme}>
      {theme === Theme.LIGHT ? <PiSunLight className={classes.icon} /> : <PiMoonLight className={classes.icon} />}
    </CustomButton>
  )
})

import { withStyles } from 'tss-react/mui'

import { Typography } from '@mui/material'

import { styles } from './moderator-settings-view.style'

export const ModeratorSettingsViewRaw = props => {
  const { classes: classNames } = props

  return (
    <>
      <div>
        <Typography className={classNames.inProcess}>{'В разработке...'}</Typography>
      </div>
    </>
  )
}

export const ModeratorSettingsView = withStyles(ModeratorSettingsViewRaw, styles)

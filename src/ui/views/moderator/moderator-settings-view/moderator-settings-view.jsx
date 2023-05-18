import { Typography } from '@mui/material'

import { withStyles } from 'tss-react/mui'

import { MainContent } from '@components/layout/main-content'

import { styles } from './moderator-settings-view.style'

export const ModeratorSettingsViewRaw = props => {
  const { classes: classNames } = props

  return (
    <>
      <MainContent>
        <Typography className={classNames.inProcess}>{'В разработке...'}</Typography>
      </MainContent>
    </>
  )
}

export const ModeratorSettingsView = withStyles(ModeratorSettingsViewRaw, styles)

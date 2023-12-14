/* eslint-disable no-unused-vars */
import { withStyles } from 'tss-react/mui'

import { ToggleButtonGroup } from '@mui/material'

export const ToggleBtnGroup = withStyles(ToggleButtonGroup, theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.second,
    color: theme.palette.text.general,
    width: '58px',
    height: '28px',
    borderRadius: '4px',
    cursor: 'pointer',
  },

  '& > .MuiToggleButtonGroup-grouped:not(:last-of-type)': {
    borderTopRightRadius: '4px',
    borderBottomRightRadius: '4px',
  },

  '& > .MuiToggleButtonGroup-grouped:not(:first-of-type)': {
    borderTopLeftRadius: '4px',
    borderBottomLeftRadius: '4px',
  },
}))

export const ToggleBtnGroupFreelance = withStyles(ToggleButtonGroup, theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'fit-content',
    height: '100%',
    cursor: 'pointer',
  },
}))

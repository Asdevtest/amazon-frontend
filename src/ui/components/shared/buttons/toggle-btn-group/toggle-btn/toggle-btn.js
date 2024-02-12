import { withStyles } from 'tss-react/mui'

import { ToggleButton } from '@mui/material'

export const ToggleBtn = withStyles(ToggleButton, theme => ({
  selected: {
    color: 'white !important',
    backgroundColor: `${theme.palette.primary.main} !important`,
  },

  root: {
    color: theme.palette.text.general,

    border: 'none',
    borderRadius: '4px',
    width: '27px',
    height: '24px',
    fontFamily: "'Manrope, sans-serif'",
    cursor: 'pointer',

    '&:hover': {
      color: 'white !important',
      backgroundColor: `${theme.palette.primary.main} !important`,
    },
  },
}))

export const ToggleBtnFreelancer = withStyles(ToggleButton, () => ({
  disabled: {
    backgroundColor: `none !important`,
    border: 'none !important',
  },

  root: {
    border: 'none',
    width: '50px',
    height: '100%',
    cursor: 'pointer',
  },
}))

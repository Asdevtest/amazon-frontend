/* eslint-disable no-unused-vars */
import { withStyles } from 'tss-react/mui'

import { ToggleButton } from '@mui/material'

export const ToggleBtn = withStyles(ToggleButton, theme => ({
  selected: {
    color: 'white !important',
    backgroundColor: `${theme.palette.primary.main} !important`, // '#006CFF',
  },

  root: {
    color: theme.palette.text.general,

    border: 'none',
    borderRadius: '4px',
    width: '27px',
    height: '24px',
    fontFamily: "'Manrope, sans-serif'",
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',

    '&:hover': {
      color: 'white !important',
      backgroundColor: `${theme.palette.primary.main} !important`, // '#006CFF',
    },
  },
}))

export const ToggleBtnFreelancer = withStyles(ToggleButton, theme => ({
  disabled: {
    backgroundColor: `none !important`, // '#006CFF',
    border: 'none !important',
  },

  root: {
    border: 'none',
    width: '50px',
    height: '100%',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
  },
}))

// export const ToggleBtn = styled(ToggleButton)({
//   '&.Mui-selected, &.Mui-selected:hover': {
//     color: 'white',
//     backgroundColor: '#006CFF',
//   },

//   '&.MuiToggleButton-root': {
//     // backgroundColor: 'inherit',
//     border: 'none',
//     borderRadius: '4px',
//     width: '27px',
//     height: '24px',
//     fontFamily: "'Manrope, sans-serif'",
//     cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
//   },
// })

import {ToggleButton} from '@mui/material'

// import {styled} from '@mui/material/styles'
import {createStyles, withStyles} from '@material-ui/styles'

export const ToggleBtn = withStyles(theme =>
  createStyles({
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
  }),
)(ToggleButton)

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

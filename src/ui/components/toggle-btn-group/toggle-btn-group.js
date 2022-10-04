import {ToggleButtonGroup} from '@mui/material'

// import {styled} from '@mui/material/styles'
import {createStyles, withStyles} from '@material-ui/styles'

export const ToggleBtnGroup = withStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.palette.background.second,
      color: theme.palette.text.general,
      width: '58px',
      height: '28px',
      borderRadius: '4px',
      cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    },

    '& > .MuiToggleButtonGroup-grouped:not(:last-of-type)': {
      borderTopRightRadius: '4px',
      borderBottomRightRadius: '4px',
    },

    '& > .MuiToggleButtonGroup-grouped:not(:first-of-type)': {
      borderTopLeftRadius: '4px',
      borderBottomLeftRadius: '4px',
    },
  }),
)(ToggleButtonGroup)

// import {ToggleButtonGroup} from '@mui/material'
// import {styled} from '@mui/material/styles'

// export const ToggleBtnGroup = styled(ToggleButtonGroup)({
//   '&.MuiToggleButtonGroup-root': {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#EBEBEB',
//     width: '58px',
//     height: '28px',
//     borderRadius: '4px',
//     cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
//   },

//   '& > .MuiToggleButtonGroup-grouped:not(:last-of-type)': {
//     borderTopRightRadius: '4px',
//     borderBottomRightRadius: '4px',
//   },

//   '& > .MuiToggleButtonGroup-grouped:not(:first-of-type)': {
//     borderTopLeftRadius: '4px',
//     borderBottomLeftRadius: '4px',
//   },
// })

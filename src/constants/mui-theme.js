import {createMuiTheme} from '@material-ui/core'
import {grey} from '@material-ui/core/colors'

export const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#007bff',
    },
    text: {
      primary: '#3d5170',
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
      },
    },
    MuiPaper: {
      elevation1: {
        boxShadow: '0px 5px 19px 0px rgb(90 97 105 / 12%)',
      },
    },
    MuiTableCell: {
      root: {
        padding: '10px',
      },
      body: {
        color: grey[600],
      },
    },
  },
})

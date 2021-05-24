import {createMuiTheme} from '@material-ui/core'

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
    MuiTableCell: {
      root: {
        padding: '10px',
      },
    },
  },
})

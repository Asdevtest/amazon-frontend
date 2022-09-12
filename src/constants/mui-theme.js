import {createTheme} from '@material-ui/core'
import {grey} from '@material-ui/core/colors'

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#007bff',
    },
    text: {
      primary: '#3d5170',
    },
  },
  typography: {
    fontFamily: ['Manrope', 'sans-serif'],

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
<<<<<<< HEAD
    MuiTypography: {
      root: {
        // userSelect: 'none',
      },
    },
=======

>>>>>>> 17bbffb5 (3607 3601 3602)
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

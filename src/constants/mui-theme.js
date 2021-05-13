import {createMuiTheme} from '@material-ui/core'

export const muiTheme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root: {
        padding: '10px',
      },
    },
  },
})

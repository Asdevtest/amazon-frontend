import {createStyles} from '@material-ui/core'

export const styles = createStyles(theme => ({
  example: {
    color: theme.palette.primary,
  },
  balanceTitle: {
    fontSize: theme.spacing(9),
  },
  balanceFreeze: {
    fontSize: theme.spacing(5),
    color: 'orange',
  },

  tableWrapper: {
    marginTop: '24px',
    width: '100%',
    height: '100%',
  },

  redRow: {
    color: 'red',
  },

  greenRow: {
    color: 'green',
  },
}))

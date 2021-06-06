import {createStyles} from '@material-ui/core'

export const styles = createStyles(theme => ({
  button: {
    backgroundColor: theme.palette.error.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
      color: '#fff',
    },
    '&:disabled': {
      backgroundColor: theme.palette.error.light,
      color: '#fff',
    },
  },
}))

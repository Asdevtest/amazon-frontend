import {createStyles} from '@material-ui/core'

export const styles = createStyles(theme => ({
  button: {
    backgroundColor: theme.palette.success.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
    '&:disabled': {
      backgroundColor: theme.palette.success.light,
    },
  },
}))

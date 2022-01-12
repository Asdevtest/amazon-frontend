import {createStyles} from '@material-ui/core'

export const styles = createStyles(theme => ({
  button: {
    padding: '9px 28px',
    backgroundColor: theme.palette.success.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
    '&:disabled': {
      backgroundColor: theme.palette.disabled,
    },
  },
}))

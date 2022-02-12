import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    flexGrow: 1,
    overflow: 'auto',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
    },
    minHeight: '50vh',
  },
}))

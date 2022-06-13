import {makeStyles} from '@material-ui/core'

console.log('window', window.innerWidth)

export const useClassNames = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3.75),
    flexGrow: 1,
    // overflow: 'auto',

    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
    },
    minHeight: '50vh',
    overflowY: 'scroll',
  },
}))

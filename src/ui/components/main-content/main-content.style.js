import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(theme => ({
  root: {
    // padding: theme.spacing(3.75),
    padding: '10px 10px',
    // padding: '10px calc(20px - (100vw - 100% - 240px)) 10px 10px',

    flexGrow: 1,
    // overflow: 'auto',
    // marginRight: 20,
    // marginRight: 'calc(100vw - 100% - 230px)',

    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
    },
    minHeight: '50vh',
    overflowY: 'scroll',
    // boxSizing: 'border-box',
  },
}))

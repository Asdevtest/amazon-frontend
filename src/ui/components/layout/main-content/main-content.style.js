import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    padding: '10px 10px',
    // padding: '10px calc(20px - (100vw - 100% - 240px)) 10px 10px',

    flexGrow: 1,
    // overflow: 'auto',

    // marginRight: 'calc(-1*(100vw - 100% - 240px))',

    // position: 'relative',

    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
    },
    minHeight: '50vh',
    overflowY: 'scroll',

    backgroundColor: theme.palette.background.second,
  },

  '@media (max-width: 768px)': {
    root: {
      marginRight: 0,
    },
  },
}))

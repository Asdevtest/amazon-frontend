import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    padding: 10,
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
    },
    minHeight: '50vh',
    backgroundColor: theme.palette.background.second,
  },

  '@media (max-width: 768px)': {
    root: {
      marginRight: 0,
    },
  },
}))

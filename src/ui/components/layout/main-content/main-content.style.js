import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    padding: 10,
    flexGrow: 1,
    minHeight: '50vh',
    overflowY: 'auto',
    backgroundColor: theme.palette.background.second,

    [theme.breakpoints.down(768)]: {
      padding: theme.spacing(1),
      marginRight: 0,
    },
  },
}))

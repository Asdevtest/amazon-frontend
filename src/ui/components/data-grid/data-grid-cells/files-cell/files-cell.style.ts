import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    padding: '10px 0',
  },

  icon: {
    path: {
      fill: theme.palette.primary.main,
    },
  },
}))

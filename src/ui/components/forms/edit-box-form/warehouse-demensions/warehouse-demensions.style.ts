import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  standartText: {
    color: theme.palette.text.primary,
  },

  alertText: {
    color: 'red',
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  standartText: {
    color: theme.palette.text.general,
  },

  alertText: {
    color: 'red',
  },
}))

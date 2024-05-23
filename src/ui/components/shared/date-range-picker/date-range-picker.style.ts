import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  subheader: {
    padding: 20,
  },

  clearIcon: {
    width: '12px !important',
    height: '12px !important',
    color: theme.palette.primary.main,
  },
}))

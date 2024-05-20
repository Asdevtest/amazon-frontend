import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: '100%',
  },

  error: {
    color: theme.palette.text.red,
  },

  openPickerIcon: {
    width: '16px !important',
    height: '16px !important',
  },
}))

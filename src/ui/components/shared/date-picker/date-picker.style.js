import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    color: theme.palette.text.general,
    padding: '5px',
    width: '100%',
    border: 'none !important',
  },

  error: {
    color: theme.palette.text.red,
  },

  openPickerIcon: {
    width: '16px !important',
    height: '16px !important',
  },
}))

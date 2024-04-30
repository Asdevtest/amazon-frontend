import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  viewCart: {
    width: '20px !important',
    height: '20px !important',
    color: theme.palette.text.secondary,
  },

  viewCartSelected: {
    color: theme.palette.primary.main,
  },
}))

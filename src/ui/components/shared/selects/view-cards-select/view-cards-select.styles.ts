import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  viewCart: {
    width: '20px !important',
    height: '20px !important',
    color: theme.palette.text.second,
  },

  viewCartSelected: {
    color: theme.palette.primary.main,
  },
}))

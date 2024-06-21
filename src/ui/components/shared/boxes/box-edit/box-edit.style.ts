import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  flexContainer: {
    display: 'flex',
    alignItems: 'flex-end',
  },

  boxIcon: {
    width: 32,
    height: 32,
  },

  penIcon: {
    width: '16px !important',
    height: '16px !important',
    color: theme.palette.primary.main,
  },
}))

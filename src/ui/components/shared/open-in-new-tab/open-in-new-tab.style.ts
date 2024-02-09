import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  shareLinkIcon: {
    color: theme.palette.primary.main,
    width: '21px !important',
    height: '21px !important',
  },

  shareLinkText: {
    color: theme.palette.primary.main,
  },

  shareWrapper: {
    display: 'flex',
    gap: 10,

    cursor: 'pointer',
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  fullSizeIconWrapper: {
    height: '100%',
    width: '100%',
    padding: '0 7px',
  },

  shareLinkIcon: {
    color: theme.palette.primary.main,
    width: '20px !important',
    height: '20px !important',
    cursor: 'pointer',
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  tooltip: {
    background: theme.palette.primary.main,
  },

  arrow: {
    color: theme.palette.primary.main,
  },

  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,

    span: {
      width: 20,
      height: 20,
    },
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

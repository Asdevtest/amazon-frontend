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
    gap: 5,
  },

  shareLinkIcon: {
    color: theme.palette.primary.main,
    width: '21px !important',
    height: '21px !important',
    cursor: 'pointer',
  },

  productVariationsCellWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

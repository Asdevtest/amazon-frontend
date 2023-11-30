import { makeStyles } from 'tss-react/mui'

export const useDataGridCellStyles = makeStyles()(theme => ({
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
  },

  fullSizeIconWrapper: {
    height: '100%',
    width: '100%',
    padding: '0 7px',
  },

  shareLinkIcon: {
    color: theme.palette.primary.main,
    width: '21px !important',
    height: '21px !important',
    cursor: 'pointer',
  },
}))

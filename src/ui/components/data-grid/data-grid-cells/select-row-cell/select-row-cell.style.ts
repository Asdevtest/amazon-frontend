import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  selectRowCellWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    gap: '5px',
    paddingLeft: 5,
  },

  buttonsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    gap: '20px',
  },

  formedCell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 5,
  },

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
}))

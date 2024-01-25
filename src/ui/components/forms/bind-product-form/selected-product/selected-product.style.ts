import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 8px 0 15px',
  },

  text: {
    fontSize: '16px',
    fontWeight: 400,
    color: theme.palette.text.second,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  asin: {
    color: theme.palette.text.general,
  },

  removeButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 !important',
    height: '24px !important',
    width: '24px !important',
    minWidth: '24px !important',
  },

  removeIcon: {
    width: '11px !important',
    color: '#FFF',
  },
}))

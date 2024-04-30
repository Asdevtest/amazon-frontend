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
}))

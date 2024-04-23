import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  dimensions: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  isCell: {
    padding: '10px 0',
  },

  text: {
    fontSize: 14,
    lineHeight: '19px',
  },

  alert: {
    color: theme.palette.text.red,
    fontWeight: 600,
  },
}))

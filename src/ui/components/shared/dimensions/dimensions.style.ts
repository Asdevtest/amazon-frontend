import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: '100%',
    maxWidth: 235,
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  switcher: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },

  isCell: {
    padding: '10px 0',
  },

  text: {
    fontSize: 14,
    lineHeight: '19px',
  },

  textSecond: {
    color: theme.palette.text.secondary,
  },

  alert: {
    color: theme.palette.text.red,
    fontWeight: 600,
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  text: {
    marginLeft: 5,
    padding: '2px',
    fontSize: '14px',
  },

  label: {
    fontSize: 12,
    lineHeight: '16px',
    color: theme.palette.text.secondary,
  },
}))

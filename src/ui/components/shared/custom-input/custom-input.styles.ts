import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  label: {
    fontSize: 12,
    lineHeight: '16px',
    color: theme.palette.text.secondary,
  },
}))

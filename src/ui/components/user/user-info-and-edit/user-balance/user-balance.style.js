import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  buttons: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },

  tableWrapper: {
    display: 'flex',
    marginTop: '20px',
    height: '68vh',
    width: '100%',
  },

  redRow: {
    color: theme.palette.text.red,
  },

  greenRow: {
    color: theme.palette.text.green,
  },
}))

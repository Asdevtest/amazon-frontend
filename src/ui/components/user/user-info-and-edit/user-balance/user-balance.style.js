import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  mainWrapper: {
    width: '100%',
  },

  btnsWrapper: {
    display: 'flex',
    gap: 30,
    alignItems: 'center',
  },

  tableWrapper: {
    marginTop: '20px',
    height: '68vh',
  },

  cancelBtn: {
    color: theme.palette.text.general,
  },

  redRow: {
    color: 'red',
  },

  greenRow: {
    color: theme.palette.text.green,
  },

  button: {
    padding: '14px 40px',
  },

  depositBtn: {
    marginRight: 50,
  },
}))

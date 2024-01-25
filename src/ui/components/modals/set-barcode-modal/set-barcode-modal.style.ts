import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  modalWrapper: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  modalTitle: {
    fontSize: '18px',
    lineHeight: '25px',
    fontWeight: 600,
    color: theme.palette.text.general,
  },

  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },

  button: {
    width: 120,
    height: 40,
  },

  closeButton: {
    color: theme.palette.text.general,
  },
}))

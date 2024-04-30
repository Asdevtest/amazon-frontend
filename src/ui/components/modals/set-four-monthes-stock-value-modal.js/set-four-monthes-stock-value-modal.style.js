import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: '425px',
    padding: '0 40px',
  },
  modalTitle: {
    color: theme.palette.text.general,

    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '140%',
    marginBottom: '30px',
    textAlign: 'center',
  },

  saveBox: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  saveBtn: {
    width: '123px',
    height: '40px',
  },
  closeBtn: {
    width: '123px',
    height: '40px',
    color: theme.palette.text.general,
  },

  standartText: {
    color: theme.palette.text.general,
  },
  error: {
    color: 'red',
  },
  errorWrapper: {
    display: 'flex',
    justifyContent: 'end',
    marginTop: '-20px',
  },
}))

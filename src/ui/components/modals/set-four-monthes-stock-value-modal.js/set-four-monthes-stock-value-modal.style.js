import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: '425px',
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

import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  body: {
    padding: 5,
  },

  title: {
    marginBottom: 20,
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
    textAlign: 'center',
  },

  label: {
    marginBottom: 5,
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,
  },

  controlButton: {
    padding: '0 25px',
  },

  cancelButton: {
    color: theme.palette.text.general,
  },

  errorInput: {
    borderColor: theme.palette.text.red,
  },
}))

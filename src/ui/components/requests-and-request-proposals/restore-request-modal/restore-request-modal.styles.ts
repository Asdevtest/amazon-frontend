import { makeStyles } from 'tss-react/mui'

export const useRestoreRequestModalStyles = makeStyles()(theme => ({
  body: {
    width: '100%',
  },

  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 20,
  },

  label: {
    color: theme.palette.text.second,
    fontSize: 14,
  },

  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 20,
    width: '100%',

    '& div': {
      width: '100%',
    },
  },

  controlButton: {
    width: '100%',
    maxWidth: 'unset',
  },

  cancelButton: {
    color: theme.palette.text.general,
  },

  errorInput: {
    borderColor: theme.palette.text.red,
  },
}))

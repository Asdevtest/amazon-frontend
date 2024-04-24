import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  input: {
    width: '100%',
    height: 36,
    padding: 0,
    fontSize: 14,
    lineHeight: '19px',
    textAlign: 'center',
  },

  error: {
    border: `1px solid ${theme.palette.text.red} !important`,
  },

  icons: {
    display: 'flex',
    alignItems: 'center',
    gap: 3,
  },

  button: {
    width: 16,
    height: 16,
    opacity: 1,
    transition: '.3s ease',

    '&:hover': {
      transform: 'scale(1.1)',
    },

    '&:disabled': {
      opacity: 0.5,
    },
  },

  doneIcon: {
    marginRight: 10,
    width: '16px !important',
    height: '16px !important',
    color: theme.palette.text.green,
  },

  saveIcon: {
    width: '16px !important',
    height: '16px !important',
    color: theme.palette.primary.main,
  },

  clearIcon: {
    width: '16px !important',
    height: '16px !important',
    color: theme.palette.text.second,
  },
}))

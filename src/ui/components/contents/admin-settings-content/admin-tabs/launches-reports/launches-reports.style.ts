import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '20px',

    padding: '15px 20px 20px 20px',
    borderRadius: '20px',
    backgroundColor: theme.palette.background.general,
    boxShadow: theme.palette.boxShadow.paper,

    '> p': {
      fontSize: '16px',
      fontWeight: 700,
    },
  },

  inputWrapper: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',

    '> p': {
      fontSize: '14px',
      fontWeight: '600',
    },
  },

  selectAfter: {
    width: '80px',
  },

  input: {
    width: '200px',
  },
}))

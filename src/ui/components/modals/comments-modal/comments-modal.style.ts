import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  title: {
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
    color: theme.palette.text.general,
  },

  editorWrapper: {
    height: '200px !important',
    width: 600,
  },

  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  buttonSave: {
    minWidth: 170,
    padding: '8px 24px',
    fontWeight: 500,
    boxShadow: '0 0 5px 3px rgba(0, 0, 0, 0.17)',
    borderRadius: 24,
    opacity: 1,
    transition: '.3s ease-in-out',

    color: '#fff',
    background: '#1EB564',

    '&:hover': {
      opacity: 0.8,
    },

    '&:disabled': {
      opacity: 0.5,
    },

    '&:active': {
      boxShadow: 'none',
    },
  },
}))

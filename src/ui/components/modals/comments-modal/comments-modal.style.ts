import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  title: {
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
    color: theme.palette.text.general,
  },

  editorContainer: {
    marginBottom: '0 !important',
  },

  editor: {
    height: 170,
    width: 600,
    fontSize: 16,
    lineHeight: '19px',
  },

  editorReadOnly: {
    height: 152,
    padding: '0 !important',
    background: `${theme.palette.background.general} !important`,

    textarea: {
      padding: '0 !important',
      background: `${theme.palette.background.general} !important`,
    },
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
      cursor: 'auto',
    },

    '&:active': {
      boxShadow: 'none',
    },
  },
}))

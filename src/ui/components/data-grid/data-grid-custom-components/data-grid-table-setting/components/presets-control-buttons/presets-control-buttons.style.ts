import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  additionalButtonsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px',
  },

  buttonWrapper: {
    width: 'calc(50% - 5px)',
  },

  additionalButton: {
    width: '100%',
  },

  button: {
    width: 'calc(50% - 5px)',

    padding: '8px 0px',
    fontWeight: 500,
    boxShadow: '0 0 5px 3px rgba(0, 0, 0, 0.17)',
    borderRadius: 24,
    opacity: 1,
    transition: '.3s ease-in-out',

    '&:hover': {
      opacity: 0.8,
    },

    '&:disabled': {
      opacity: 0.5,
      cursor: 'unset',
    },

    '&:active': {
      boxShadow: 'none',
    },
  },

  danger: {
    color: '#912018',
    background: '#fee4e2',
  },

  success: {
    color: '#fff',
    background: '#1EB564',
  },
}))

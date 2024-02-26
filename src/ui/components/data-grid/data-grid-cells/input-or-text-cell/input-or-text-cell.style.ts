import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: '100%',
    padding: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    border: `1px solid ${theme.palette.input.customBorder}`,
    borderRadius: 6,
  },

  wrapperDisabled: {
    border: `none`,
  },

  wrapperError: {
    border: `1px solid ${theme.palette.text.red}`,
  },

  input: {
    width: 140,

    '&:disabled': {
      width: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },

  inputError: {
    width: '100%',
  },

  button: {
    width: 16,
    height: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    lineHeight: '12px',
    color: '#fff',
    background: theme.palette.text.red,
    boxShadow: '0 0 3px 3px rgba(0, 0, 0, 0.17)',
    borderRadius: '50%',
    opacity: 1,
    transition: '.3s ease-in-out',

    '&:hover': {
      opacity: 0.8,
    },
  },
}))

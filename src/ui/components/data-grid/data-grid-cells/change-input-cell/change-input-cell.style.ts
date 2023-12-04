import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  changeInput: {
    width: '100%',
    height: 36,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: '19px',
    padding: 0,
  },

  errorInputActive: {
    border: '1px solid red',
  },

  doneIcon: {
    color: theme.palette.text.green,
  },

  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },

  changeInputIcon: {
    color: theme.palette.primary.main,
    transition: '.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  clearIcon: {
    width: '20px !important',
    height: '20px !important',
    transition: '.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.1)',
    },
    color: theme.palette.text.second,
  },
}))

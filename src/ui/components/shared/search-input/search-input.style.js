import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  input: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: '300px',
    height: 36,
    position: 'relative',
    borderRadius: '41px',
  },

  inputAdornmentRoot: {
    height: '100%',
    maxHeight: 'unset',
    padding: '1px',
  },

  inputClass: {
    padding: '9px',

    '&::placeholder': {
      fontSize: 14,
      lineHeight: '19px',
    },
  },

  icon: {
    color: theme.palette.primary.main,
  },

  closeIcon: {
    color: theme.palette.text.second,
    cursor: 'pointer',
    transition: '.3s ease',

    '&: hover': {
      transform: 'scale(1.1)',
    },
  },

  searchWrapper: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
}))

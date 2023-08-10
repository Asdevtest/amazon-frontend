import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  input: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: '300px',
    height: 36,
    position: 'relative',
  },

  inputAdornmentRoot: {
    height: '100%',
    maxHeight: 'unset',
    padding: '1px',
  },

  btnWrapperStyle: {
    height: '100%',
  },

  inputClass: {
    [theme.breakpoints.down(768)]: {
      '&::placeholder': {
        fontSize: 14,
      },
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

  submit: {
    height: '100%',
    padding: '9px 20px 8px 20px',
    borderRadius: 4,
  },
}))

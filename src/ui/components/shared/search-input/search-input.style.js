import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  input: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: '300px',
    height: 36,
    position: 'relative',
  },

  inputClass: {
    paddingLeft: '15px !important',
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
    gap: 5,
    alignItems: 'center',
    height: '100%',
    flexGrow: 1,
  },

  submit: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderLeft: 'none',
    height: 36,
    padding: '6px',
    flexGrow: 1,
  },
}))

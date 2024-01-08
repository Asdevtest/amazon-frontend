import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  switch: {
    position: 'relative',
    display: 'inline-block',
    width: '100%',
    maxWidth: 36,
    height: 18,

    'input:checked + span': {
      background: theme.palette.primary.main,
    },

    'input:checked + span:before': {
      transform: 'translateX(18px)',
    },
  },

  input: {
    opacity: 0,
    width: 0,
    height: 0,
  },

  slider: {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme.palette.customSwitcher.switch,
    transition: '0.3s ease',
    borderRadius: 18,
    boxShadow: '0 0 1px 1px rgba(0, 0, 0, 0.17)',

    '&:before': {
      position: 'absolute',
      content: '""',
      height: 14,
      width: 14,
      left: 2,
      bottom: 2,
      background: '#fff',
      transition: '.3s ease',
      borderRadius: '50%',
    },
  },
}))

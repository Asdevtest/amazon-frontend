import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  arrivalDateWrapper: {
    display: 'flex',
  },

  doneIcon: {
    color: theme.palette.text.green,
  },

  arrivalDateIcon: {
    width: 15,
    height: 15,
  },

  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },

  iconWrapperArrivalDate: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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

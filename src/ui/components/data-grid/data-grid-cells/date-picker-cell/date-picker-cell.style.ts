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
    cursor: 'pointer',
  },

  clearIcon: {
    cursor: 'pointer',
    color: theme.palette.text.second,
  },
}))

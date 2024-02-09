import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    position: 'fixed',

    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  arrowWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    width: 40,
    height: 40,
    boxShadow: '0px 2px 40px 2px rgba(0, 0, 0, 0.1)',

    borderRadius: '50%',
  },

  arrowIconRoteta: {
    transform: 'rotateX(180deg)',
  },

  arrowIcon: {
    color: theme.palette.primary.main,
  },
}))

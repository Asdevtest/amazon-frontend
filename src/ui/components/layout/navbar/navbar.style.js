import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    position: 'relative',
    backgroundColor: theme.palette.background.general,
  },

  hideAndShowIconWrapper: {
    position: 'absolute',
    top: -50,
    left: 200,
    width: 40,
    height: 40,
    background: theme.palette.background.general,
    boxShadow: '0px 2px 40px 2px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    cursor: 'pointer',

    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },

  hideAndShowIcon: {
    left: 20,
  },

  arrowIcon: {
    marginLeft: 8,
    color: theme.palette.primary.main,
  },
}))

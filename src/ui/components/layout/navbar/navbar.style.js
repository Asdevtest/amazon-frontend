// import {makeStyles} from 'tss-react/mui'
import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    backgroundColor: theme.palette.background.general,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },

  root: {
    zIndex: 1200,
    width: '240px',
    position: 'relative',
  },

  moreWidth: {
    width: 245,
  },

  hideNavbar: {
    width: 70,
  },

  paper: {
    border: 'none',
  },

  positionStatic: {
    position: 'static',
  },
  logo: {
    marginTop: '15px',
    height: '100%',
    transform: 'scale(1.2)',
  },

  hideAndShowIconWrapper: {
    position: 'absolute',
    top: 20,
    left: 220,
    zIndex: 1200,
    width: '40px',
    height: '40px',
    // backgroundColor: '#d1d1d1a8', // старый цвет
    backgroundColor: theme.palette.background.genral,
    boxShadow: '0px 2px 40px 2px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    [theme.breakpoints.down(1282)]: {
      display: 'none',
    },
  },

  hideAndShowIcon: {
    top: 20,
    left: 50,
  },
  arrowIcon: {
    marginLeft: 8,
    color: theme.palette.primary.main,
  },
}))

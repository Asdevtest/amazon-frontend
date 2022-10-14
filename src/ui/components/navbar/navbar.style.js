// import {makeStyles} from 'tss-react/mui'
import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    backgroundColor: theme.palette.background.main,

    position: 'relative',

    height: '100vh',
  },

  root: {
    zIndex: 1200,
    width: '240px',
    position: 'relative',
  },

  hideNavbar: {
    width: '40px',
  },

  paper: {
    // boxShadow: `0px 1px 2px 0px rgba(225, 229, 235, 0.8),
    //             0px 13px 27px 0px rgba(90, 97, 105, 0.15)`,
    border: 'none',
  },
  positionStatic: {
    position: 'static',
  },
  logoWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: theme.spacing(7),
    flexShrink: 0,
    width: '240px',

    backgroundColor: 'inherit',
  },
  logo: {
    marginTop: '15px',
    height: '100%',
    transform: 'scale(1.2)',
  },

  iconWrapper: {
    minWidth: '0',
    margin: '16px 16px 16px 11px',
    color: 'rgba(189, 194, 209, 1)',
  },
  icon: {
    fontSize: theme.spacing(3),
  },

  hideAndShowIconWrapper: {
    position: 'absolute',
    top: 20,
    left: 220,
    zIndex: 1200,
    width: '40px',
    height: '40px',
    backgroundColor: '#d1d1d1a8',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    [theme.breakpoints.down(900)]: {
      display: 'none',
    },
  },
  hideAndShowIcon: {
    top: 20,
    left: 20,
  },
  arrowIcon: {
    marginLeft: 8,
  },

  categoriesWrapper: {
    backgroundColor: theme.palette.background.main,
  },
  feedBackButton: {
    position: 'absolute',
    bottom: '20px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
  },
  feedBackText: {
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
  },

  feedbackIcon: {
    width: '54px',
    height: '48px',
    color: `${theme.palette.text.general} !important`,
  },
}))

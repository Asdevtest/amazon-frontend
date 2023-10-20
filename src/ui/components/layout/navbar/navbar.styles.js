import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  navbar: {
    gridArea: 'navbar',
    display: 'grid',
    gridTemplateRows: '60px 1fr',
    backgroundColor: theme.palette.background.general,

    '&:hover #hideAndShowIcon': {
      display: 'flex !important',
    },

    [theme.breakpoints.down(1024)]: {
      gridTemplateRows: '1fr',
    },
  },

  logoWrapper: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    [theme.breakpoints.down(1024)]: {
      display: 'none',
    },
  },

  logoIcon: {
    width: '125px !important',
    height: '42px !important',
    color: theme.palette.text.general,

    'path:first-of-type': {
      fill: theme.palette.primary.main,
    },
  },

  logoIconShort: {
    width: '50px !important',
    height: '50px !important',
    color: theme.palette.text.general,

    'path:first-of-type': {
      fill: theme.palette.primary.main,
    },
  },

  hideAndShowIconWrapper: {
    position: 'absolute',
    zIndex: 100,
    top: 40,
    right: -20,
    width: 40,
    height: 40,
    background: theme.palette.background.general,
    boxShadow: theme.palette.boxShadow.paper,
    display: 'none',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: '0.3s ease-out',

    [theme.breakpoints.down(1024)]: {
      display: 'none',
    },
  },

  hideAndShowIcon: {
    [theme.breakpoints.down(1024)]: {
      display: 'none',
    },
  },

  arrowIcon: {
    height: '20px !important',
    marginLeft: 6,
    color: theme.palette.primary.main,
  },
}))

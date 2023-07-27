import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  navbar: {
    backgroundColor: theme.palette.background.general,
  },

  logoWrapper: {
    height: 60,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 20,

    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },

  logoWrapperShort: {
    justifyContent: 'center',
  },

  logoIcon: {
    width: '125px !important',
    height: '42px !important',
    color: theme.palette.text.general,
  },

  logoIconNotShow: {
    display: 'none !important',
  },

  hideAndShowIconWrapper: {
    width: 40,
    height: 40,
    background: theme.palette.background.general,
    boxShadow: theme.palette.boxShadow.paper,
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
    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },

  arrowIcon: {
    marginLeft: 8,
    color: theme.palette.primary.main,
  },
}))

import { makeStyles } from 'tss-react/mui'

export const useNavbarDrawerContentStyles = makeStyles()(theme => ({
  reverseMainSubWrapper: {
    justifyContent: 'flex-end',
  },

  mainSubWrapper: {
    backgroundColor: theme.palette.background.general,
    height: '100vh',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },

  logoWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: theme.spacing(7),
    flexShrink: 0,
    width: '240px',

    backgroundColor: 'inherit',

    [theme.breakpoints.down(1282)]: {
      display: 'none',
    },
  },

  logo: {
    marginTop: '15px',
    height: '100%',
    transform: 'scale(1.2)',
  },

  categoriesWrapper: {
    backgroundColor: theme.palette.background.general,
    height: '100%',
    overflow: 'auto',
  },

  bottomCategories: {
    justifySelf: 'flex-end',
    marginBottom: 20,
  },

  feedBackButton: {
    width: '100%',
    height: 46,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 15px',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      backgroundColor: 'rgba(0,123,255,0.3)',
      opacity: 0.7,
    },
  },

  shortFeedBackButton: {
    padding: 0,
    margin: '0 auto',
    width: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
    '&:hover': {
      backgroundColor: 'rgba(0,123,255,0.3)',
      opacity: 0.7,
    },
  },

  feedBackText: {
    fontSize: 13,
    lineHeight: '140%',
    color: theme.palette.text.general,
  },

  feedbackIcon: {
    width: '46px !important',
    height: '40px !important',
    // color: `${theme.palette.text.general} !important`,
    color: theme.palette.text.general,
  },

  appVersion: {
    color: theme.palette.primary.main,
    marginLeft: 15,
    display: 'inline-block',

    cursor: 'pointer',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },

  smallAppVersion: {
    fontWeight: 400,
    fontSize: 12,
    lineHeight: '16px',
    marginLeft: 8,
  },
}))

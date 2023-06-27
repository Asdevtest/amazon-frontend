import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  rightPanel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // flexDirection: 'column',

    // height: '100vh',
    // width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.general,
    padding: '48px 64px',
    [theme.breakpoints.down(768)]: {
      flexDirection: 'column',
      width: '100vw',
      padding: '0  20px 20px 20px',
    },
  },
  formWrapper: {
    justifySelf: 'center',

    minWidth: '300px',
    maxWidth: '600px',
    // flex: '1 1 300px',
    [theme.breakpoints.down(768)]: { width: '100%' },
  },
  formHeader: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  title: {
    color: theme.palette.primary.main,
    fontSize: '18px',
    fontWeight: '600',
    [theme.breakpoints.down(768)]: {
      fontSize: '16px',
      lineHeight: '22px',
    },
  },
  divider: {
    margin: '8px 0 16px',
    border: `1px solid ${theme.palette.input.customBorder}`,
  },
  redirect: {
    margin: '0 30px',
    fontSize: '14px',
    lineHeight: '19px',
    transition: '0.3s ease',
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',

    color: theme.palette.text.second,

    '&:hover': {
      color: theme.palette.primary.main,
      fontWeight: '500',
    },
    [theme.breakpoints.down(768)]: {
      margin: '0 10px',
    },
  },

  redirectWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  version: {
    alignSelf: 'flex-end',
    justifySelf: 'flex-end',
    transform: 'translate(150%, 0)',
    color: theme.palette.primary.main,
    [theme.breakpoints.down(768)]: { transform: 'none' },
  },
  selectorsWrapper: {
    width: '110px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  themeIcon: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    transition: '0.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
}))
